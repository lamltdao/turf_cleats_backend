const SneakersModel=require('../models/SneakersModel').sneakersModel;
const CommentModel=require('../models/SneakersModel').commentModel;

module.exports = {
  getAllSneakers: (req,res)=>{
    SneakersModel.find({})
        .populate('brand')
        .then(sneakersFound=>{
            res.status(200).json(sneakersFound);
        })
        .catch(err=>{res.status(500).json(err)})
  },
  createNewSneakers: (req,res)=>{
    SneakersModel.create(req.body,(err,sneakersCreated)=>{
        if(err)res.status(500).json(err);
        else {
            res.status(201).json(sneakersCreated);
        }
    })
  },
  getSneakersById: (req,res)=>{
    const { id } = req.params;
    SneakersModel.findById(id,(err,sneakersFound)=>{
        if(err)res.status(500).json(err);
        else if(!sneakersFound){
            res.status(404).json('Sneakers Not Found');
        }
        else {
            res.status(200).json(sneakersFound);
        }
    })
  },
  updateSneakersById: (req,res)=>{
    const { id } = req.params;
    SneakersModel.findByIdAndUpdate(id,req.body,{new:true},(err,sneakersUpdated)=>{
        if(err)res.status(500).json(err);
        else if(!sneakersUpdated){
            res.status(404).json('Sneakers Not Found');
        }
        else {
            res.status(200).json(sneakersUpdated);
        }
    })
  },
  deleteSneakersById: (req,res)=>{
    const { id } = req.params;
    SneakersModel.findByIdAndDelete(id,(err,sneakersDeleted)=>{
        if(err)res.status(500).json(err);
        else if(!sneakersDeleted){
            res.status(404).json('Sneakers Not Found');
        }
        else{
            res.status(204).json('Sneakers Successfully Deleted');
        }
    })
  },
  addComment: (req,res)=>{
    const { id } = req.params;
    const { id: userId } = req.decoded;

    SneakersModel.findById(id,(err,sneakersFound)=>{
        if(err) res.status(500).json(err);
        else if(!sneakersFound){
            res.status(404).json('Sneakers Not Found');
        }
        else {
            const { content } = req.body;
            CommentModel.create({content, user: userId},(err,commentCreated)=>{
                if(err)res.status(500).json(err);
                else {
                   sneakersFound['comment'].push(commentCreated);
                   sneakersFound.save((err) =>{
                       if(err){res.send('Cannot save')}
                   });
                   res.status(201).json(commentCreated);
                }              
            })
        }
    })
  },
  getComment: (req,res)=>{
    const { id } = req.params;
    SneakersModel
    .findById(id)
    .populate('comment.user')
    .exec((err,sneakersWithCommentsPopulated)=>{
        if(err)res.status(500).json(err);
        else if(!sneakersWithCommentsPopulated){
            res.status(404).json('Sneakers Not Found')
        }
        else{
        res.status(200).json(sneakersWithCommentsPopulated);
        }
    })
  }
}