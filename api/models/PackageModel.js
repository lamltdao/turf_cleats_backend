const mongoose=require('mongoose');
const model=mongoose.model;
const Schema=mongoose.Schema;

const PackageSchema=new Schema({
    cart:[{
    sneakersId:{
            type:Schema.Types.ObjectId,
            ref:'Sneakers'
    },
    quantity:Number,
    size:Number,
    name:String,
    price:Number
    }],
    address:String,
    totalPrice:Number,
    stripeToken:String
});

module.exports=model('Package',PackageSchema);