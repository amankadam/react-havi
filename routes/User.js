const express=require('express');
const userRouter=express.Router();
const passport=require('passport');
const passportConfig=require('../passport');
const JWT=require('jsonwebtoken');
const User=require('../models/User');
const Post=require('../models/Post');

const signToken=id=>{
  return JWT.sign({
    iss:"AmanKadam",
    sub:id
  },"AmanKadam",{expiresIn:86400000});
}

userRouter.post('/register',(req,res)=>{
  const {firstName,lastName,gender,password,email,dateOfBirth}=req.body;
  User.findOne({email},(e,user)=>{

    if(e) res.status(500).json({msg:'Error'});
    if(user)
    res.status(400).json({msg:'User already Registered.'});
    else {
      const newUser=new User({email,password,firstName,lastName,dateOfBirth,gender});
      newUser.save(e=>{

        if(e) res.status(500).json({msg:'Error'});
        else res.status(201).json({msg:'Registered Successfully'});

      });
    }
  })
});

userRouter.post('/login',passport.authenticate('local',{session:false}),(req,res)=>{

    if(req.isAuthenticated()){
    const {_id,email} =req.user;
    const token=signToken(_id);
    res.cookie('access_token',token,{httpOnly:true,sameSite:true});
    res.status(200).json({isAuthenticated:true,user:{email}});

  }
});
userRouter.get('/logout',passport.authenticate('jwt',{session:false}),(req,res)=>{

res.clearCookie('access_token');
res.json({user:{firstName:"",lastName:"",email:""},success:true});
});

userRouter.post('/post',passport.authenticate('jwt',{session:false}),(req,res)=>{
const post=new Post(req.body);
post.save(e=>{
  if(e) res.status(500).json({msg:'Error'});
   else{
     req.user.posts.push(post);
     req.user.save(e=>{
        if(e) res.status(500).json({msg:'Error'});
        else {
          res.status(200).json({msg:'Successfull'});
        }
     });
   }
}
)
});
userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {email} = req.user;
    res.status(200).json({isAuthenticated : true, user : {email}});
});

userRouter.get('/posts',passport.authenticate('jwt',{session:false}),(req,res)=>{

User.findById({_id:req.user._id}).populate('posts').exec((e,d)=>{

    if(e) res.status(500).json({msg:'Error'});
    else {
      res.status(200).json({posts:d.posts,isAuthenticated:true});
    }
});
});


userRouter.get('/admin',passport.authenticate('local',{session:false}),(req,res)=>{
User.find({}).exec((e,d)=>{

    if(e) res.status(500).json({msg:'Error'});
    else {
      res.status(200).json({posts:d,isAuthenticated:true});
    }
});
});

module.exports=userRouter;
