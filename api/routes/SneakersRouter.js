const SneakersModel=require('../models/SneakersModel');
const express=require('express');
const router= express.Router();

router.post('/',(req,res)=>{
    SneakersModel.create(req.body,(err,sneakersCreated)=>{
        if(err)res.status(500).json(err);
        else {
            res.status(201).json(sneakersCreated);
        }
    })
})

router.get('/',(req,res)=>{
    SneakersModel.find({},(err,sneakersFound)=>{
        if(err)res.status(500).json(err);
        else {
            res.status(200).json(sneakersFound);
        }
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id;
    SneakersModel.findById(id,(err,sneakersFound)=>{
        if(err)res.status(500).json(err);
        else if(!sneakersFound){
            res.status(404).json('Sneakers Not Found');
        }
        else {
            res.status(200).json(sneakersFound);
        }
    })
})

router.put('/:id',(req,res)=>{
    const id=req.params.id;
    SneakersModel.findByIdAndUpdate(id,req.body,{new:true},(err,sneakersUpdated)=>{
        if(err)res.status(500).json(err);
        else if(!sneakersUpdated){
            res.status(404).json('Sneakers Not Found');
        }
        else {
            res.status(200).json(sneakersUpdated);
        }
    })
})

router.delete('/:id',(req,res)=>{
    SneakersModel.findByIdAndDelete(id,(err,sneakersDeleted)=>{
        if(err)res.status(500).json(err);
        else if(!sneakersDeleted){
            res.status(404).json('Sneakers Not Found');
        }
        else{
            res.status(204).json('Sneakers Successfully Deleted');
        }
    })
})

module.exports=router;