const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');





// getting the productSchema 
const User = require('../schema/userSchema');

// for getting image multer is used
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
})
  
// .single is used that we have single file of name   img 
const upload = multer({ storage: storage }).single('img');


router.post('/api/addImage',upload,async (req,res)=>{
    try{
        console.log(req.file)
        let {email,name} = req.body;
       
        let img = req.file.filename;
        let data = {name:name,image:img};

        await User.findOneAndUpdate({email:email},{$push:{images:data}});
        res.status(200).json({added:"Image added successfully"});

    }catch(err){
        fs.unlink(req.file.path,(err)=>{
            console.log(err);
            return;
        });
        res.status(500).json({error:"there is error and we are not getting req.body"});
        console.log(err)
    }

})


module.exports = router;



