"use strict";

const mongoose = require('mongoose');
const Joi = require('joi');

var cartSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    qty: {
        type: String,
        default: '0'
    },
    status: {
        type: String,
        default: '0'
    },
    created: {
        type: Number,
        default: Date.now
    },
}, {
    timestamps: true
});
var cartSchemaModel = mongoose.model('cart', cartSchema);
module.exports = {
    cartSchemaModel,
}