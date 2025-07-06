const express = require("express");
const createProductController = require("../../controllers/productController");
const router = express.Router();
 

router.post("/createproduct", createProductController)


module.exports = router;