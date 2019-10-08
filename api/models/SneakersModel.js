const mongoose=require('mongoose');
const model=mongoose.model;
const Schema=mongoose.Schema;

const commentSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
        content: { type: String, required: true },
        
    },
    { timestamps: { createdAt: "createdAt" } }
);
const commentModel=model('Comment',commentSchema);

const SneakersSchema=new Schema({
    name:{
        type:String
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:'Brand'
    },
    price:{
        type:Number
    },
    size:[{
        type: String,
        enum:['8','8.5','9','9.5','10','10.5','11','11.5','12']
    }],
    image:String,
    comment:{
        type:[commentSchema],
        default:[]
    }
});
const sneakersModel=model('Sneakers',SneakersSchema);
module.exports={
    commentModel,sneakersModel
}