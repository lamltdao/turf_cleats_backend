const UserModel=require('../models/UserModel');
const express=require('express');
const router= express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

/* front end */
/*const access_token=window.localStorage.getItem('access_token');
        if(access_token){
            $('#login').hide();//chỉ làm k nhìn thấy, vx còn html
            $.ajax({
                url:'http://localhost:6789/api/auth/me',
                type:'GET',
                //headers:gửi req lên server
                headers:{
                    Authentication:access_token
                },
                success:function(data){
                if(data.success&&data.user){
                    $('#user').text(data.user.userName);
                    
                }

                },
                error:function(err){

                }
            })
        }
 */
router.get('/account',(req,res)=>{
    const token=req.query.access_token||req.headers.authentication;
    jwt.verify(token,'secretKey',(err,decoded)=>{
        if(err)res.status(err.code).json(err);
        else res.status(200).json(decoded);
    })
})

router.post('/login',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    if(username&&password){
        UserModel.findOne({username:username},(err,userFound)=>{
            if(err)res.status(err.code).json(err);
            else if(!userFound){
                console.log('User not found');
            }
            else{
                if(bcrypt.compareSync(password,userFound.password)){
                    const token=jwt.sign({id:userFound._id,username:username},'secretKey');
                    res.send(token);
                }
                else console.log('Wrong password');
                
            }
        })
    }
})

module.exports=AuthRouter;