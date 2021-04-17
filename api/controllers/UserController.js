const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

module.exports = {
  signUp: (req, res) => {
    const hashPassword = bcrypt.hashSync(req.body.password, 12);
    req.body.password = hashPassword;

    UserModel.create(req.body, (err, userCreated) => {
        if (err) res.status(500).json(err);
        else {
            res.status(201).json(userCreated);
        }
    })
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    UserModel.findById(id, (err, userFound) => {
        if (err) res.status(500).json(err);
        else if (!userFound) {
            res.status(404).json('User Not Found');
        }
        else {
            res.status(200).json(userFound);
        }
    })
  },
  updateUserById: (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true },
        (err, userUpdated) => {
            if (err) res.status(500).json(err);
            else if (!userUpdated) {
                res.status(404).json('User Not Found');
            }
            else {
                res.status(200).json(userUpdated);
            }
        });
  },
  deleteUserById: (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id, (err, userDeleted) => {
        if (err) res.status(500).json(err);
        else if (!userDeleted) {
            res.status(404).json('User Not Found');
        }
        else res.status(204).json('User Successfully Deleted');
    });
  },
  getAllUser: (req, res) => {
    UserModel.find({}, (err, userFound) => {
        if (err) res.status(500).json(err);
        else {
            res.status(200).json(userFound);
        }
    })
  }
}