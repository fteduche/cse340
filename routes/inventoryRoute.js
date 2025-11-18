// Needed Resources 
const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const baseController = require('../controllers/baseController');

// Route to build inventory by classification view 
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/", baseController.buildHome);

module.exports = router;