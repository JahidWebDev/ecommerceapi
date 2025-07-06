const express = require("express");
const router = express.Router();
const authRoute = require("./authentication")
const categoryRoute = require("./category")
const subCategoryRoute = require("./subCategory")
const productRoute = require("./product")



router.use("/authentication", authRoute) 
router.use("/category", categoryRoute) 
router.use("/subcategory", subCategoryRoute) 
router.use("/product",productRoute ) 
module.exports = router;
