const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
   workout_name : {
      type: String,
      required: [true,"Please enter workout Name"],
      // required: true,
      trim: true
   },
   calories_burnt : {
      type: Number,
      default: 120
   },
   heart_rate: {
      type: Number,
      default: 72
   },
   duration : {
      type: Number,
      default: 5
   },
   body_temp: { // total no.of times equipped / hired / used / downloaded 
      type: Number,
      default: 37
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

module.exports = mongoose.model('Workout', workoutSchema);