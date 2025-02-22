const express= require('express');
const router = express.Router();

// controllers
const { getAllFoodsToday, createFood } = require('../controller/foodController');

// auth
const { isAuthenticatedUser } = require('../middleware/isAuth');

// user
router.route('/foodsToday').get(isAuthenticatedUser, getAllFoodsToday);
router.route('/create-food').post(isAuthenticatedUser, createFood);

module.exports= router;