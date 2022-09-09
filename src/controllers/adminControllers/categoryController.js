const Category = require("../../models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    // const photo = req.file.path;

    let dataSave =  new Category({
      name: name,
    //   photo: photo,
    });
    let rel = await dataSave.save()

     if(!rel){
       res.status(500).json({
         message:"error , not valid"
       })
     }else{
      res.status(201).json({
        message:`create succecc ${rel.name}`,
        data:rel
      });
     }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllCategory = async (req, res) => {
  try {

    const getCategory =  Category;

   let get = await getCategory.find().then((doc) => {
      res.status(200).json({
        message: "Get All Data Categories",
        data: doc,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getCategoryById = async (req, res) => {
 try {
    let id = req.params.id

    console.log(id)
    let category = Category
    let ret = await  category.findById(id).populate("product")
        res.status(200).json({
          message: `get id ${id}`,
          data: ret,
        });
   

 } catch (error) {
     console.log(error)
 }
};

exports.searchCategory = async (req, res) => {
    try {
        let name = req.params.name
        let category = Category

        let rel = await category.find({name:{$regex:name, $options:'i'}}).populate("products")
       .then(doc=>{
           res.status(200).json({
               data:doc
           })
       })
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
   
    let newCategory = {
      name:req.body.name
    }
    console.log(categoryId);
    
    let category =  Category

       category.findByIdAndUpdate(
        categoryId,
        newCategory,
        (err, doc) => {
          if (!err) {
            res.status(200).json({
              message: "update",
              data: doc,
            });
          }
        }
      );
      
  } catch (error) {
    console.log(error)
  }
}

exports.deleteCategory = async(req,res) => {
 try {
   const id = req.params.id
   const category = Category
   
   await category.findByIdAndRemove(id)
   .then((result)=>{
     res.status(200).json({
       message:`success Delete data ${id}`,
       data: result
      })
      console.log(result)
     })
 } catch (error) {
     console.log(error)
 }
};

