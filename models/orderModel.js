"use strict";

const mongoose = require('mongoose');
const Joi = require('joi');

var orderSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    product_list: [{
        type: Object,
        default: [],
    }],
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    card_name: {
        type: String,
        default: ''
    },
    card_number: {
        type: String,
        default: ''
    },
    total_amount: {
        type: String,
        default: '0'
    },
    status: {
        type: String,
        default: 'pending'
    },
    deliver_status: {
        type: String,
        default: 'Preparing'
    },
    date: {
        type: String,
        default: ''
    },
    created: {
        type: Number,
        default: Date.now
    },
}, {
    timestamps: true
});
var orderSchemaModel = mongoose.model('order', orderSchema);
module.exports = {
    orderSchemaModel,
}