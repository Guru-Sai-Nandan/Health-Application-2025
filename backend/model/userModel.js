const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
   name:{
      type: String,
      required: [true,"Please enter user name"],
      maxLength: [30,"user name must be at most 30 characters"],
      minLength: [4,"user name must be at least 4 characters"]
   },
   email:{
      type: String,
      required: [true,"Please enter user email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"]
   },
   password:{
      type: String,
      required: [true,"Please enter user password"],
      minLength: [8,"user password must be atleast 8 characters"],
      select: false
   },
   // phoneNumber:{
   //    type: Number,
   //    required: [true,"Please enter user mobile number"],
   //    unique: true,
   //    length: [10,"user ph.no. must be 10 characters"],
   // },
   avatar:{
      type: {
         public_id:{
            type: String,
            // required: true
         },
         url:{
            type: String,
            // required: true
         }
      },
      default: {}
   },
   
   createdAt:{
      type:Date,
      default: Date.now
   },
   gender:{
      type: Number,
      required: [true,"Please enter gender"],
      default: 0
   },
   height:{
      type: Number,
      required: [true,"Please enter height"],
      default: 165
   },
   weight:{
      type: Number,
      required: [true,"Please enter weight"],
      default: 60
   },
   age:{
      type: Number,
      required: [true,"Please enter age"],
      age: 25
   },

   resetPasswordToken: String,
   resetPasswordExpire: Date,
}, { minimize: false })

// hash password
userSchema.pre('save', async function(next){
   if(!this.isModified("password")) 
      {next();}
   
   this.password = await bcrypt.hash(this.password, 10);
})

// JWT token
userSchema.methods.getJWTToken = function(){
   return jwt.sign(
         {id:this._id},
         process.env.JWT_SECRET,
         {expiresIn: process.env.JWT_EXPIRE}
      )
}

// verify password
userSchema.methods.comparePassword = async function(enteredPassword)
   { return await bcrypt.compare(enteredPassword, this.password); }
   
// generating password reset token
userSchema.methods.getResetPasswordToken = function () {
   // Generating token
   const resetToken = crypto.randomBytes(20).toString("hex");
   // Hashing and adding resetPasswordToken to userSchema
   this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest("hex");
   this.resetPasswordExpire= Date.now()+ 15*60*1000;
   
   return resetToken;
}


module.exports = mongoose.model("User", userSchema);