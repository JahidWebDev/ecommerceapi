const express = require("express");
const createProductController = require("../../controllers/productController");
const multer  = require('multer')
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.originalname.split(".")[1]}`)
  }
})

const uploads = multer({ storage: storage })


router.post("/createproduct", uploads.single('images'), createProductController);



module.exports = router;