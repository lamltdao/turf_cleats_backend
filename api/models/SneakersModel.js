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
    size:[{
        type: String,
        enum:['8','8.5','9','9.5','10','10.5','11','11.5','12']
    }],
    image:String
});

module.exports=model('Sneakers',SneakersSchema);