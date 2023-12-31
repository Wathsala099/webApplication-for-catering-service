
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Joi = require('joi');


var feedbackSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    feedback: {
        type: String
    },
    rating: {
        type: Number,
        default: 0
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    created: {
        type: Number,
        default: Date.now
    },
});
feedbackSchema.plugin(uniqueValidator);
var feedbackSchemaModel = mongoose.model('feedback', feedbackSchema);

module.exports = {
    feedbackSchemaModel,
}