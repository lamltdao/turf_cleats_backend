const UserModel=require('../models/UserModel');
const express=require('express');
const router= express.Router();
const bcrypt=require('bcrypt');

router.post('/',(req,res)=>{
    const hashPassword=bcrypt.hashSync(req.body.password,12);
    req.body.password=hashPassword;

    UserModel.create(req.body,(err,userCreated)=>{
        if(err)res.status(err.code).json(err);
        else {
            res.status(201).json(userCreated);
        }
    })
})

router.get('/',(req,res)=>{
    UserModel.find({},(err,userFound)=>{
        if(err)res.status(err.code).json(err);
        else {
            res.status(200).json(userFound);
        }
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findById(id,(err,userFound)=>{
        if(err)res.status(err.code).json(err);
        else if(!userFound){
            res.status(404).json('User Not Found');
        }
        else {
            res.status(200).json(userFound);
        }
    })
})

router.put('/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate(
        id,
        req.body,
        {new:true},
        (err,userUpdated)=>{
            if(err)res.status(err.code).json(err);
            else if(!userUpdated){
                res.status(404).json('User Not Found');
            }
            else {
                res.status(200).json(userUpdated);
            }
    });
})

router.delete('/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete(id,(err,userDeleted)=>{
        if(err)res.status(err.code).json(err);
        else if(!userDeleted){
             res.status(404).json('User Not Found');
        }
        else res.status(204).json('User Successfully Deleted');
    });
});

module.exports= router;
