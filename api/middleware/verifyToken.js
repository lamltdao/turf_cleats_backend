const UserModel=require('../models/UserModel');
const jwt=require('jsonwebtoken');

const verifyToken =(req,res,next)=>{
  const token = req.query.access_token || req.headers.authentication;
  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) res.status(401).json(err);
    else res.status(200).json(decoded);
  });
}

module.exports=isAdmin;