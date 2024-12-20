const express = require('express');
const router=express.Router();

import {Group,User} from '../models/Schema';

router.post('/:userId/create',async (req,res)=>{
    const {userId} = req.params;
    const {name,password} = req.body;
    try{
        const group = new Group({name,password,users:[userId]});
        await group.save();
        res.send(group);
    }catch(err){
        res.status(411).json({message:err.message});
    }
})
router.get('/:groupId',async (req,res)=>{
    const {groupId} = req.params;
    try{
        const group = await Group.findById(groupId);
        if(group){
            res.send(group);
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
})
router.get('/all',async(req,res)=>{
    try{
        const groups = await Group.find();
        res.send(groups);
    }catch(err){
        res.send({message:err.message});
    }
})
router.get('/:groupId/users',async(req,res)=>{
    const {groupId} = req.params;
    try{
        const group= await Group.findById(groupId);
        if(!group){
            res.status(404).json({message:"Group not found"});
        }
        const users = await User.find({_id:{$in:group.users}});
        res.send(users);
    }catch(err){
        res.status(411).json({message:err.message});
    }
})