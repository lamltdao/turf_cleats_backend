const UserModel=require('../models/UserModel');
const express=require('express');
const router= express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


router.get('/account',(req,res)=>{
    const token=req.query.access_token||req.headers.authentication;
    jwt.verify(token,'secretKey',(err,decoded)=>{
        if(err)res.status(401).json(err);
        else res.status(200).json(decoded);
    })
})

router.post('/login',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    if(username&&password){
        UserModel.findOne({username:username},(err,userFound)=>{
            if(err)res.status(500).json(err);
            else if(!userFound){
                console.log('User not found');
            }
            else{
                if(bcrypt.compareSync(password,userFound.password)){
                    const token=jwt.sign({id:userFound._id,name:userFound.name,role:userFound.role},'secretKey');
                    res.send({token,id:userFound._id});
                }
                else console.log('Wrong password');
                
            }
        })
    }
})

module.exports=router;