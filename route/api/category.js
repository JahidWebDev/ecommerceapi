 const express = require("express");
const {categoryController, getAllCategory, getSingleCategoryController, updateSingleCategoryController, deleteCategoryController} = require("../../controllers/categoryController");
const router = express.Router();
 

router.post("/createcategory", categoryController)
router.get("/getallcategory", getAllCategory )
router.get("/getsinglecategory/:id", getSingleCategoryController )
router.patch("/updatesinglecategory/:id", updateSingleCategoryController);
router.delete("/deletecategory/:id", deleteCategoryController);

module.exports = router;
