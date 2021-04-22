const express = require("express");
const router = express.Router();
const PackageController = require("../controllers/PackageController");

router.post("/charge", PackageController.makePayment);
router.get("/", PackageController.getAllPackages);
router.get("/:id", PackageController.getPackageById);
router.put("/:id", PackageController.updatePackageById);
router.delete("/:id", PackageController.deletePackageById);

module.exports = router;
