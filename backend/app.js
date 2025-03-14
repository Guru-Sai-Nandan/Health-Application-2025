const express = require('express');
const app = express();

// cors is used for intercommunication between urls
const cors = require('cors');
app.use(cors({
   origin: ["http://localhost:3000", "http://localhost:3004", "*", process.env.FRONTEND], 
   credentials: true
}));

const ErrorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


// use middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({useTempFiles: true}));



// ... Route imports
const food= require('./route/foodRoute');
const user= require('./route/userRoute');
const workout= require('./route/workoutRoute');

// ... implementation

// .. setting head path + route
app.use('/api/v1',food);
app.use('/api/v1',user);
app.use('/api/v1',workout);

// use error handler middleware
app.use(ErrorMiddleware); 

module.exports = app;