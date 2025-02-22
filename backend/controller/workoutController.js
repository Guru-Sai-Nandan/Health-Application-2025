// Import models
const Workout = require('../model/workoutModel');

// Others
const RegularErrorHandler = require('../util/RegularErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Export controllers

// ..Get Workouts by Current Date - authorized
exports.getWorkoutsByCurrentDate = catchAsyncErrors(async (req, res, next) => {
   const userId = req.user.id;

   // Get the start and end of the current day
   const startOfDay = new Date();
   startOfDay.setHours(0, 0, 0, 0);

   const endOfDay = new Date();
   endOfDay.setHours(23, 59, 59, 999);

   const workouts = await Workout.find({
       createdBy: userId,
       createdAt: {
           $gte: startOfDay,
           $lte: endOfDay
       }
   });

   res.status(200).json({
       success: true,
       message: "Today's workouts retrieved successfully",
       workouts
   });
});


// ..Create Workout - authorized user
exports.createWorkout = catchAsyncErrors(async (req, res, next) => {
   // Destructure all fields except createdBy and createdAt
   const { workout_name, calories_burnt, heart_rate, duration, body_temp } = req.body;
   
   // Add createdBy as authenticated user ID
   const createdBy = req.user.id;

   const workout = await Workout.create({
       workout_name,
       calories_burnt,
       heart_rate,
       duration,
       body_temp,
       createdBy
   });

   res.status(201).json({
       success: true,
       message: 'Workout created successfully',
       workout
   });
});
