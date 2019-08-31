const mongoose=require('mongoose');
const model=mongoose.model;
const Schema=mongoose.Schema;

const SneakersSchema=new Schema({
    name:{
        type:String
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:'Brand'
    },
    prize:{
        type:Number
    },
    size:[Number],
    image:String
});

module.exports=model('Sneakers',SneakersSchema);