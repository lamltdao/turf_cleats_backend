const mongoose=require('mongoose');
const model=mongoose.model;
const Schema=mongoose.Schema;

const UserSchema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    phone_number:{
        type:String,
        required:true,
        unique:true
    },
});
module.exports=model('Users',UserSchema);