const express = require("express");
const registratioController = require("../../controllers/registrationControllers");
const otpController = require("../../controllers/otpController");
const router = express.Router();

router.post("/registration", 
  registratioController
);
router.post("/otpverify", 
  otpController
);

module.exports = router;