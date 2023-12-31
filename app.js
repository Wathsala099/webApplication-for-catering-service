"use strict";

const cors = require('cors');
const helmet = require('helmet'); // helmet morgan body-parser mongoose
const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter');


const dotenv = require('dotenv');
const app = express();
dotenv.config();

// adding Helmet to enhance your API's security
app.use(helmet());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use(express.json());
//
//to send data from post man and any front end
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true, parameterLimit: 1000000 }));

// public place for img
app.use('/uploads', express.static('uploads'));

// parse an HTML body into a string
app.use(bodyParser.json());



// for local
// const mongoUrlLocal = 'mongodb://localhost:27017/cinneztaSpicies'
// const mongoUrlLocal = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

const mongoUrlLocal = 'mongodb+srv://admin:admin@cinnetzadb.cul4ykx.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoUrlLocal, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => { console.log('connected to data base'); });


// static end point for user api
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);




module.exports = app;