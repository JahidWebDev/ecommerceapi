 const express = require("express");
const {categoryController, getAllCategory, getSingleCategoryController} = require("../../controllers/categoryController");
const router = express.Router();
 

router.post("/createcategory", categoryController)
router.get("/getallcategory", getAllCategory )
router.get("/getsinglecategory/:id", getSingleCategoryController )
module.exports = router;
