const UserModel=require('../models/UserModel');
const jwt=require('jsonwebtoken');

const isAdmin=(req,res,next)=>{
        const access_token=req.query.access_token||req.headers.authentication;
        if(access_token){
            jwt.verify(access_token,'secretKey',(err,decoded)=>{
                if(err)res.status(401).json(err);
                else {
                    const username=decoded.username;
                    UserModel.findOne({username:username},(err,userFound)=>{
                        if(err)res.status(500).json(err);
                        else if(!userFound){
                            res.status(404).json('User Not Found');
                        }
                        else{
                            if(userFound&&userFound.role=='admin'){
                                next();
                            }
                            else{
                                res.status(403).json('Forbidden. You are not the admin');
                            }
                        }
                    })
                }
            })
        }   
        else{
            res.status(401).json('No token provided');
        }
    }

module.exports=isAdmin;