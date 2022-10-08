const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



// for products
const UserSchema = new mongoose.Schema({ 
    email:{type:String},
    username:{type:String},
    password:{type:String},
    token:{type:String},
    images:[{
        name:{type:String},
        image:{type:String}
    }],
})


// hashing password 
UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})

// generating token 
UserSchema.methods.generateToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.token = token;
        await this.save();
        return token
    }catch(err){
        console.log(err);
    }
}


const User = mongoose.model('USER',UserSchema);

module.exports = User;
