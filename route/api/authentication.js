const express = require("express");
const registratioController = require("../../controllers/registrationControllers");
const router = express.Router();

router.post("/registration", 
  registratioController
);

module.exports = router;