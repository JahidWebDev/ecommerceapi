const express = require("express");
const router = express.Router();
const apiRoute = require("./api");  // api folder import
const baseUrl = `${process.env.BASE_URL}`
router.use(baseUrl, apiRoute);  // Mount API routes under /api/v1

module.exports = router;
     