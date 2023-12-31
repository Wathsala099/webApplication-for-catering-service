
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');



var userSchema = mongoose.Schema({
    firstname: {
        type: String,
        max: 30,
        min: 5
    },
    lastname: {
        type: String,
        max: 30,
        min: 5
    },
    contact: {
        type: String,
        max: 12,
        min: 10
    },
    email: { 
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        max: 50,
        min: 5
    },
    img: {
        type: String,
        default: 'default-user-profile-image.png'
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        max: 50,
        min: 5
    },
    type: {
        type: String,
        default: 'user'
    },
    isfriend:{
        type:Boolean,
        default:false
    },

    isactive:{
        type:Boolean,
        default:true
    },

    created: {
        type: Number,
        default: Date.now
    },

});
userSchema.plugin(uniqueValidator);
var userSchemaModel = mongoose.model('users', userSchema);

module.exports = {
    userSchemaModel,
}