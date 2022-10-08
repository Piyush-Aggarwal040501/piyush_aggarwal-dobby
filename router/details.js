const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// getting the userschema 
const User = require('../schema/userSchema');




router.post('/api/userDetails', async (req,res)=>{
    try{
        console.log("details");
        let token = req.cookies.userToken
        if(!token){
            res.status(401).json({data:"not regestered"});
        }else{
            const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
            let userInfo = await User.findOne({_id:verifyToken._id,token:token});
            res.status(200).json({data:userInfo});
        }    
    }catch(err){
        res.status(500).json({data:"there is error and we are not getting try block"});
        console.log(err)
    }

})




module.exports = router;