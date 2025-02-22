// import model
const User = require("../model/userModel");

// others
const RegularErrorHandler = require("../util/RegularErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require('../util/jwtToken');
// const sendEmail = require('../util/sendEmail.js');
// const crypto = require('crypto');
const cloudinary = require('cloudinary');


// export controllers

// register a user
exports.registerUser = catchAsyncErrors(async (req, res, next)=>{
   const {username, email, password, sex, height, weight, age} = req.body;

   const name = username;
   const gender = sex;
   const user1 = await User.create({
      name,
      email,
      password,
      gender, 
      height,
      weight,
      age
   });
   
   const user = await User.findOne({ email });
   sendToken(user, 201, "User created successfully", res);
});

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
   const {username, password} = req.body;
   console.log(username, password);
   // statusCode-400 bad request
   if(!username)
      return next(new RegularErrorHandler("Please enter an username", 400));
   if(!password)
      return next(new RegularErrorHandler("Please enter the password", 400));

   let user = await User.findOne({ name: username }).select("+password");
   console.log(user);
   // statusCode-401 unauthorized request
   if(!user)
      return next(new RegularErrorHandler("Invalid email or password", 401));
   
   const Matched = await user.comparePassword(password);
   console.log(password, Matched);
   if(!Matched) 
      return next(new RegularErrorHandler("Invalid email or password", 401));
      
   user = await User.findOne({ name: username });
   
   sendToken(user, 200, "User logged-in successfully", res);
})

// logout user
exports.logout = catchAsyncErrors( async (req, res, next) => {
   res.cookie("token",null,{
      expires: new Date(Date.now()),
      httpOnly: true
   });
   res.status(200).json({
      success: true,
      message: `Logged Out successfully`
   });
})


// get user his own details
exports.getUserDetails = catchAsyncErrors( async(req, res, next) => {
   const user = await User.findById(req.user.id);
   res.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      user
   })
})


// ..get single user
exports.getSingleUser = catchAsyncErrors( async(req, res, next) => {
   const user = await User.findById(req.params.id);
   if(!user)
      return next(new RegularErrorHandler(`User does not exist with id ${req.params.id}`)); 
   res.status(200).json({
      success: true,
      message: "User info retrieved successfully",
      user
   })
})

// ..get users with name
// exports.getUsers = catchAsyncErrors( async(req, res, next) => {
//    const search= req.query.name? {
//       name:{
//          $regex: req.query.name,
//          $options: 'i'
//       },
//       _id: {
//          $nin: [req.user.id]
//       },
//       role: {
//          $ne: `customer`
//       }
//    }:{}
//    const user = await User.find(search, {'name':1, 'location':1, 'dealsClosed':1, 'avatar':1});

//    if(user.length === 0)
//       return next(new RegularErrorHandler(`No other users found with name ${req.query.name}`)); 

//    res.status(200).json({
//       success: true,
//       message: "Users retrieved successfully",
//       user
//    })
// })

