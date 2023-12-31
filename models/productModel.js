"use strict";

const mongoose = require('mongoose');
const Joi = require('joi');


var productSchema = mongoose.Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: '0'
    },
    qty: {
        type: String,
        default: '0'
    },
    img: {
        type: String,
        default: null
    },
    isactive: {
        type: Boolean,
        default: true
    },
    created: {
        type: Number,
        default: Date.now
    },
}, {
    timestamps: true
});
var productSchemaModel = mongoose.model('product', productSchema);
module.exports = {
    productSchemaModel,
}