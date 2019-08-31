const mongoose=require('mongoose');
const model=mongoose.model;
const Schema=mongoose.Schema;

const PackageSchema=new Schema({
    package:[{
        sneakers:{
            type:Schema.Types.ObjectId,
            ref:'Sneakers'
        },
        quantity:Number
    }]
});

module.exports=model('Package',PackageSchema);