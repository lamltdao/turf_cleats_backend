if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const jwt=require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
  const token = req.query.access_token || req.headers.authentication;
  jwt.verify(token, process.env.BCRYPT_SECRET_KEY, (err, decoded) => {
    if (err) res.status(401).json(err);
    else {
      res.decoded = decoded
      next()
    }
  });
}

module.exports= verifyToken;