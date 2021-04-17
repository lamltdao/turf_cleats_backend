const BrandModel=require('../models/BrandModel');

module.exports = {
  getAllBrands: (req,res)=>{
    BrandModel.find({},(err,brandFound)=>{
        if(err)res.status(500).json(err);
        else {
            res.status(200).json(brandFound);
        }
    })
  },
  createNewBrand: (req,res)=>{
    BrandModel.create(req.body,(err,brandCreated)=>{
        if(err)res.status(500).json(err);
        else {
            res.status(201).json(brandCreated);
        }
    })
  },
  getBrandById: (req,res)=>{
    const id=req.params.id;
    BrandModel.findById(id,(err,brandFound)=>{
        if(err)res.status(500).json(err);
        else if(!brandFound){
            res.status(404).json('Brand Not Found');
        }
        else {
            res.status(200).json(brandFound);
        }
    })
  },
  updateBrandById: (req,res)=>{
    const id=req.params.id;
    BrandModel.findByIdAndUpdate(id,req.body,{new:true},(err,brandUpdated)=>{
        if(err)res.status(500).json(err);
        else if(!brandUpdated){
            res.status(404).json('Brand Not Found');
        }
        else {
            res.status(200).json(brandUpdated);
        }
    })
  },
  deleteBrandById: (req,res)=>{
    BrandModel.findByIdAndDelete(id,(err,brandDeleted)=>{
        if(err)res.status(500).json(err);
        else if(!brandDeleted){
            res.status(404).json('Brand Not Found');
        }
        else{
            res.status(204).json('Brand Successfully Deleted');
        }
    })
}
}