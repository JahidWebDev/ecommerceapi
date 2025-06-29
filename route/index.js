const express = require("express");
const router = express.Router();
const apiRoute = require("./api");  
const baseUrl = `${process.env.BASE_URL}`
router.use(baseUrl, apiRoute);  


module.exports = router;
     