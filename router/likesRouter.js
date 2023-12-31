"use strict";

const express = require("express");
const likesRouter = new express.Router();
const likesController = require('../controller/likeController');

const multer = require('multer');
//img path
// http://localhost:5000/uploads/users_profile_img/1582645366303-apple-logo.png
const storage = multer.diskStorage({
    destination: 'uploads/users_profile_img',
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });


likesRouter.post("/create", likesController.createLike);
likesRouter.post("/delete", likesController.deleteLike); 


module.exports = likesRouter;