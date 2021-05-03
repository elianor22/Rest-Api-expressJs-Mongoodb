const { check,body, validationResult } = require("express-validator");

exports.Validation = (req,res,next) =>{
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
  return res.status(400).json({
    status:false,
    message:errors.array()
  })
}
next()
}

exports.checkCategoryValidation = [
  check('name', 'Nama Category harus di isi').notEmpty(),
  // check('photo', 'Photo Category harus di isi').notEmpty()

]

exports.checkItemValidation = [
  check("name", "Nama harus di isi").not().notEmpty(),
  // check("description").notEmpty().isLength({min:10})
  // check("photo").notEmpty(),
];