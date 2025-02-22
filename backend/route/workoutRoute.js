const express= require('express');
const router = express.Router();

// controllers
const { getWorkoutsByCurrentDate, createWorkout} = require('../controller/workoutController');
// const { acceptBidReq, createLotBid, makePayment } = require('../controller/HybridController');

// auth
const { isAuthenticatedUser } = require('../middleware/isAuth');

// user
router.route('/my-workouts').get(isAuthenticatedUser, getWorkoutsByCurrentDate);
router.route('/create-workout').post(isAuthenticatedUser, createWorkout);
// router.route('/agent/buy').post(isAuthenticatedUser, makePayment);

module.exports= router;