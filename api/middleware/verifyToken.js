if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const jwt=require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
  const authHeader = req.headers['authorization'] // 'Bearer' + token
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
  jwt.verify(token, process.env.BCRYPT_SECRET_KEY, (err, decoded) => {
    if (err) res.status(401).json(err);
    else {
      req.decoded = decoded
      next()
    }
  });
}

module.exports= verifyToken;