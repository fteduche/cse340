// Needed Resources 
const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const baseController = require('../controllers/baseController');
const utilities = require("../utilities/"); // Added require for utilities

// Route to build inventory by classification view 
router.get(
    "/type/:classificationId",
    utilities.handleErrors(invController.buildByClassificationId) // Task 2: Applied error handler
);

// Route to build inventory detail view (Task 1)
router.get(
    "/detail/:invId",
    utilities.handleErrors(invController.buildByInvId) // Task 2: Applied error handler
);

// Route to trigger intentional 500 error (Task 3)
router.get(
    "/broken",
    utilities.handleErrors(invController.triggerError)
);

// Base route (home)
router.get("/", baseController.buildHome); // Should ideally be wrapped too, but keeping baseController structure simple if it doesn't do DB calls

module.exports = router;