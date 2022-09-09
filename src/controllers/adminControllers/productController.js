const Product = require("../../models/productModel");
const Category = require("../../models/categoryModel");
const { validationResult } = require("express-validator");

const path = require("path");
const fs = require("fs");
const { json } = require("express");

exports.createProduct = async (req, res) => {
  try {
    const { name, category, description, rating, price, isFeatured } = req.body;

    console.log(req.get("host"));
    const basePath = `${req.protocol}://${req.get("host")}`;

    if (!category) {
      return res.status(400).send("invalid category");
    }
    // check images
    if (!req.files) {
      return res.status(400).json({
        message: "gambar harus di upload",
      });
    }
    const image = req.files;

    let images = [];
    console.log(basePath);

    image.forEach((v) => {
      images.push(`${basePath}/public/images/${v.filename}`);
      console.log(v);
    });

    console.log(images);
    // get collection category
    const categories = await Category.findById(category);

    // create new items
    const item = new Product({
      name,
      category,
      description,
      rating,
      price,
      isFeatured,
      images: images,
    });

    // save item
    let saveItem = await item.save();

    // save itemsId to category
    categories.products.push({ _id: item._id });
    categories.save(); //save category
    res.status(200).json({
      message: "create Items",
      data: saveItem,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.getAllProductSpesific = async (req, res) => {
  const product = await Product.find().select(
    "name category price images isFeatured "
  );
 
  if (!product) {
    res.status(400).send("error");
  }
  res.status(200).json(product);
};

exports.getAllProducts = async (req, res) => {
  try {
    const product = Product;

    let rel = await product
      .find()
      .populate({ path: "category", select: "name" });

    res.status(200).json({
      message: "get All items",
      data: rel,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = Product;

    let rel = await product
      .findById(id)
      .populate({ path: "category", select: "name" });

    res.status(200).json({
      message: "get All items",
      data: rel,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProductCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments((count) => count);

    console.log(basePath);

    if (!productCount) {
      return res.status(400).send("no one product");
    }
    res.status(200).json({
      productCount: productCount,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProductFeatured = async (req, res) => {
  try {
    const limits = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+limits);

    if (!products) {
      res.status(400).send("no one product");
    }
    res.status(200).json({
      productCount: products,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProductsByName = async (req, res) => {
  try {
    const name = req.params.name;
    const product = Product;

    let search = await product
      .find({ name: { $regex: name, $options: "i" } })
      .populate({ path: "category", select: "name" });

    res.status(200).json({
      message: `get product ${name}`,
      data: search,
    });
  } catch (error) {
    res.status(400).send("error can't get data", err);
  }
};

exports.filterProductsByCategories = async (req, res) => {
  try {
    let fitler = {};
    if (req.query.categories) {
      filter = { categories: req.query.categories.split(",") };
    }
    const item = await Items.find(fitler).populate("categories");
    res.status(200).json({ item });
  } catch (error) {}
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, category, description, rating, price, isFeatured } = req.body;

    const id = req.params.id;
    const product = await Product.findById(id);
    const categories = await Category.findById(category);

    const image = req.files;
    const images = [];
    image.forEach((value) => {
      images.push(value.path);
    });

    if (req.files.length > 0) {
      product.name = name;
      product.category = category;
      product.description = description;
      product.rating = rating;
      product.price = price;
      product.isFeatured = isFeatured;
      product.photo = images;

      await product.save();
      console.log(product);
      // save itemsId to category
      categories.products.addToSet({ _id: product._id });
      categories.save(); //save category
      res.status(200).json({
        message: "create product",
        data: product,
      });
    } else {
      product.name = name;
      product.category = category;
      product.description = description;
      product.rating = rating;
      product.price = price;
      product.isFeatured = isFeatured;

      await product.save();
      // save itemsId to category
      categories.products.addToSet({ _id: product._id });
      categories.save(); //save category
      res.status(200).json({
        message: "create product",
        data: product,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).send("Error", error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // let productId = ''
    // let categoryId = ''

    const product = await Product.findByIdAndRemove(id).then((result) => {
      // get product id
      let productId = result._id;

      // get categoryId
      let categoryId = result.category;

      console.log(result.images);
      // get filePath for images
      result.images.forEach((value) => {
        removeImages(value);
      });

      // get Category id and remove product from category
      console.log(productId);
      console.log(categoryId);
      const category = Category.findByIdAndUpdate(categoryId, {
        $pull: {
          products: productId,
        },
      }).then((doc) => {
        return product;
      });

      res.status(200).send("delete success");
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const removeImages = async (filePath) => {
  try {
    // console.log("Direktori", __dirname);
    filePath = path.join(__dirname, "../../", filePath);
    // console.log(filePath);
    fs.unlink(filePath, (err) => console.log(err));
  } catch (error) {}
};
