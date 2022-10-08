const express = require('express');
const router = express.Router();


// getting the userschema 
const User = require('../schema/userSchema');


router.post('/api/signup', async (req,res)=>{
    try{
        const {email,username,password} = req.body;
        const userExist = await User.findOne({email:email});
        if(userExist){
            res.status(203).json({message:"user exist. Please sign in to continue"});
        }else{
            const newUser = new User({email,password,username});
            let token = await newUser.generateToken();
            res.cookie('userToken',token,{httpOnly:true});
            await newUser.save();
            res.status(201).json({message:"registered successfully"})
        }
    }catch(err){
        res.status(500).json({error:"there is error and we are not getting req.body"});
        console.log(err)
    }

})




module.exports = router;