// import models
const Food = require('../model/foodModel');

// others
const RegularErrorHandler = require('../util/RegularErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { ObjectId } = require('mongodb');

// export controllers

// ..Get All foods taken today by the user - authorized
exports.getAllFoodsToday = catchAsyncErrors(async (req, res, next) => {
   const userId = req.user.id;

   // Get the start and end of the current day
   const startOfDay = new Date();
   startOfDay.setHours(0, 0, 0, 0);

   const endOfDay = new Date();
   endOfDay.setHours(23, 59, 59, 999);

   const foods = await Food.find({
       createdBy: userId,
       createdAt: {
           $gte: startOfDay,
           $lte: endOfDay
       }
   });

   res.status(200).json({
       success: true,
       message: "Today's foods retrieved successfully",
       foods
   });
});


// ..Create Food Item - authorized user
exports.createFood = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    
   const { meal_name, calories_intake } = req.body;
   const createdBy = req.user.id; // Assuming req.id contains the authenticated user's ID

   const food = await Food.create({
       meal_name,
       calories_intake,
       createdBy
   });

   res.status(201).json({
       success: true,
       message: 'Food item created successfully',
       food
   });
});
