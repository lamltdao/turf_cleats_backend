const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res) => {
    const token = req.query.access_token || req.headers.authentication;
    jwt.verify(token, "secretKey", (err, decoded) => {
      if (err) res.status(401).json(err);
      else res.status(200).json(decoded);
    });
  },
  login: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      UserModel.findOne({ username: username }, (err, userFound) => {
        if (err) res.status(500).json(err);
        else if (!userFound) {
          res.status(404).json("User not found");
        } else {
          if (bcrypt.compareSync(password, userFound.password)) {
            const token = jwt.sign(
              { id: userFound._id, name: userFound.name, role: userFound.role },
              "secretKey"
            );
            res.send({ token, id: userFound._id });
          } else {
            res.status(401).json("Wrong password");
          }
        }
      });
    }
  },
};
