const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const uploadSingle = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");

const uploadMultiple = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).array("images", 5);

module.exports = { uploadSingle, uploadMultiple };
