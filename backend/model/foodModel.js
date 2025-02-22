const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
   meal_name : {
      type: String,
      required: [true,"Please enter meal name"]
   },
   calories_intake: {
      type: Number, 
      required: [true,"Please enter calories"],
      default: 120
   },
   createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
   },
   createdAt : {
      type:Date,
      default: Date.now
   }
});

module.exports = mongoose.model('Food', foodSchema);