const express = require("express");
const subCategoryController = require("../../controllers/subCategoryController");

const router = express.Router();

router.post("/creatsubcategory", subCategoryController);

module.exports = router;
