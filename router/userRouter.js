"use strict";

const express = require("express");
const userRouter = new express.Router();
const userController = require('../controller/userController');
const multer = require('multer');
//img path
// http://localhost:5000/uploads/1582645366303-apple-logo.png
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });


userRouter.post("/create", upload.single('img'), userController.createUser);
userRouter.post("/update", userController.updateUser);
userRouter.post("/login", userController.loginUser); 
userRouter.post("/getuserbyid", userController.getUserByID); 

userRouter.post("/admingetalluser", userController.getAllUserAdmin); 
userRouter.post("/adminmakeuseractive", userController.makeUserActive); 

userRouter.post("/upadateimage", upload.single('img'), userController.updateImage);



module.exports = userRouter;