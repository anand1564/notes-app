
const express = require('express');
const {User} = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const router = express.Router();


router.post('/signup', async(req,res)=>{
  const {name,email,password} = req.body;
  try{
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({name,email,password:hashedPassword});
    await user.save();
    const token = jwt.sign({id:user._id},"NotesUploadApp",{expiresIn:'7d'});
    res.status(201).json({
      message:'User created successfully',
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email
      }
    })
  }catch(err){
    console.error(err);
    res.status(500).json({error:'Internal server error'});
  }
})

router.post('/login', async(req,res)=>{
  const {email,password}  =req.body;
  if(!email || !password){
    return res.status(400).json({error:'Please fill all the fields'});
  }
  try{
    const existingUser = await User.findOne({where:{email}});
    if(!existingUser){
      return res.status(400).json({error:'Invalid credentials'});
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordValid){
      return res.status(400).json({error:'Invalid credentials'});
    }
    const token = jwt.sign({id:existingUser._id},"NotesUploadApp",{expiresIn:'7d'});
    res.status(200).json({
      message:'Login successful',
      token,
      user:{
        id:existingUser._id,
        name:existingUser.name,
        email:existingUser.email
      }
    });
  }catch(err){
    console.error(err);
    res.status(500).json({error:'Internal server error'});
  }
})

module.exports=router;