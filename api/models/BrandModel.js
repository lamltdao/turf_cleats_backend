const mongoose=require('mongoose');
const model=mongoose.model;
const Schema=mongoose.Schema;

const BrandSchema=new Schema({
    name:String
});

module.exports=model('Brand',BrandSchema);