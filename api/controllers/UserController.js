if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = {
  login: (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    if (username && password) {
      UserModel.findOne({ username }, (err, userFound) => {
        if (err) res.status(500).json(err);
        else if (!userFound) {
          res.status(404).json("User not found");
        } else {
          if (bcrypt.compareSync(password, userFound.password)) {
            const token = jwt.sign(
              { id: userFound._id, role: userFound.role },
              process.env.BCRYPT_SECRET_KEY
            );
            res.send(token);
          } else {
            res.status(401).json("Wrong password");
          }
        }
      });
    }
  },
  signUp: (req, res) => {
    const { name, username, phone_number } = req.body;
    const hashPassword = bcrypt.hashSync(req.body.password, 12);
    UserModel.create({ name, username, phone_number, password: hashPassword }, (err, userCreated) => {
        if (err) res.status(500).json(err);
        else {
            res.status(201).json(userCreated);
        }
    })
  },
  getAccountByToken: (req, res) => {
    const { id } = req.decoded;
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
  updateAccountByToken: (req, res) => {
    const { id } = req.decoded;
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