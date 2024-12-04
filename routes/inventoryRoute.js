const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Route for building inventory by classification
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route for building inventory detail by inventory ID
router.get("/detail/:inventoryId", invController.buildByInventoryId);

module.exports = router;


















