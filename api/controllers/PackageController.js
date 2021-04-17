const PackageModel = require("../models/PackageModel");

module.exports = {
  createNewPackage: (req, res) => {
    PackageModel.create(req.body, (err, packageCreated) => {
      if (err) res.status(500).json(err);
      else res.status(201).json(packageCreated);
    });
  },
  getAllPackages: (req, res) => {
    PackageModel.find({}, (err, pakageFound) => {
      if (err) res.status(500).json(err);
      else {
        res.status(200).json(pakageFound);
      }
    });
  },
  getPackageById: (req, res) => {
    const id = req.params.id;
    PackageModel.findById(id, (err, packageFound) => {
      if (err) res.status(500).json(err);
      else if (!packageFound) {
        res.status(404).json("Package Not Found");
      } else {
        res.status(200).json(packageFound);
      }
    });
  },
  updatePackageById: (req, res) => {
    const id = req.params.id;
    PackageModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
      (err, packageUpdated) => {
        if (err) res.status(500).json(err);
        else if (!packageUpdated) {
          res.status(404).json("Package Not Found");
        } else {
          res.status(200).json(packageUpdated);
        }
      }
    );
  },
  deletePackageById: (req, res) => {
    PackageModel.findByIdAndDelete(id, (err, packageDeleted) => {
      if (err) res.status(500).json(err);
      else if (!packageDeleted) {
        res.status(404).json("Package Not Found");
      } else res.status(204).json("Package Successfully Deleted");
    });
  }
}