const express = require("express");
const {deleteSubCategoryControllers, subCategoryController, getAllSubCategories }= require("../../controllers/subCategoryController");
const router = express.Router();


router.post("/createsubcategory", subCategoryController);
router.get("/getallsubcategory", getAllSubCategories);
router.delete("/deletesubcategory:id",deleteSubCategoryControllers);

module.exports = router;

