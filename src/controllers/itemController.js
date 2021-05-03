const Items = require("../models/itemModel");
const Category = require("../models/categoryModel");
const { validationResult } = require("express-validator");

const path = require("path");
const fs = require("fs");
const { json } = require("express");

exports.createItem = async (req, res) => {
  try {
    const { name, categoryId, description, rating, price, category } = req.body;

    // check images
    if (!req.files) {
      return res.status(400).json({
        message: "gambar harus di upload",
      });
    }
    const photos = req.files;

    let photo = [];

    photos.forEach((v) => {
      photo.push(v.path);
    });

    // get collection category
    const categories = await Category.findById(categoryId);

    // create new items
    const item = new Items({
      name,
      categories: {
        categoryId,
        category,
      },
      description,
      rating,
      price,
      photo: photo,
    });

    // save item
    let saveItem = await item.save();

    // save itemsId to category
    categories.itemsId.push({ _id: item._id });
    categories.save(); //save category
    res.status(200).json({
      message: "create Items",
      data: saveItem,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = Items;

    let rel = await items.find();

    res.status(200).json({
      message: "get All items",
      data: rel,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getItemsByName = async (req, res) => {
  try {
    const name = req.params.name;
    const items = Items;

    let search = await items.find({ name: { $regex: name, $options: "i" } });
    res.status(200).json({
      message: `get items ${name}`,
      data: search,
    });
  } catch (error) {
    res.status(400).send("error can't get data", err);
  }
};

exports.updateItems = async(req, res,next) =>{
  try {
     const {
       name,
       categoryId,
       description,
       rating,
       price,
       category,
     } = req.body;

    const id = req.params.id;
    const items = await Items.findById(id)
    const categories = await Category.findById(categoryId);

    console.log(items._id)
    console.log(req.files)
    if(req.files.length > 0){

    }else{
      let item = new Items({
        name,
        categories: {
          categoryId,
          category,
        },
        description,
        rating,
        price,
      });
      // let saveItem = await item.save();
      console.log(item)
      // save itemsId to category
      // categories.itemsId.push({ _id: item._id });
      // categories.save(); //save category
      // res.status(200).json({
      //   message: "create Items",
      //   data: saveItem,
      // });
    }
  } catch (error) {
    console.log("error", error);
  }
}

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Items;
    item
      .findById(id)
      .then(async (result) => {
        // get filePath for images
        result.photo.forEach((value) => {
          this.removeImages(value);
        });

        const itemId = result._id;
        const { categoryId } = result.categories;
        console.log(categoryId);

        const category = await Category;
        category
          .findByIdAndUpdate(categoryId, {
            $pull: {
              itemsId: itemId,
            },
          })
          .then((result) => {
            res.status(200).json({
              message: "delete itemsId in category success",
              data: result,
            });
          });

        return item.findByIdAndRemove(id);
      })
      .then((doc) => {
        res.status(200).json({
          message: `Delete success`,
          data: doc,
        });
      });
  } catch (error) {
    res.status(400).send("error" + error);
  }
};

exports.removeImages = async (filePath) => {
  try {
    console.log("Direktori", __dirname);
    filePath = path.join(__dirname, "../../", filePath);
    console.log(filePath);
    fs.unlink(filePath, (err) => console.log(err));
  } catch (error) {}
};
