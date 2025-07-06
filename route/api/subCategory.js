const express = require("express");
const subCategoryController = require("../../controllers/subCategoryController");
const router = express.Router();


router.post("/createsubcategory", subCategoryController);

module.exports = router;

