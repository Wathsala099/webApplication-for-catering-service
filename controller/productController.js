"use strict";

const Joi = require('joi');
const passwordHash = require("password-hash");
const { productSchemaModel } = require('../models/productModel');

var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const { orderSchemaModel } = require('../models/orderModel');
const { feedbackSchemaModel } = require('../models/feedbackModel');



module.exports = {


    createProduct: async (req, res) => {
        const { title, desc, qty, price, category } = req.body;

        let img = null;
        if (req.file) {
            img = req.file.filename;
        }

        const productModel = productSchemaModel({
            qty: qty,
            title: title,
            desc: `${desc}`,
            price: price,
            img: img,
            category: category,
        });
        productModel.save(async err => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    error: true,
                    data: "err" + err,
                });
            } else {

                res.status(200).json({ error: false, data: productModel });
            }
        });
    },



    updateProduct: async (req, res) => {
        const {
            _id,
            qty,
            title,
            desc,
            price,
            img,
            category, } = req.body;

        let post_img = '';
        if (req.file) {
            post_img = req.file.filename;
        }

        if (post_img === '' || post_img == '') {
            await productSchemaModel.findByIdAndUpdate(_id, {
                qty: qty,
                title: title,
                desc: `${desc}`,
                price: price,
                category: category,
            }).exec((err) => {
                if (err) res.send({ error: true, data: 'err' + err });
                else res.send({ error: false, data: 'done' });
            });
        } else {
            await productSchemaModel.findByIdAndUpdate(_id, {
                qty: qty,
                title: title,
                desc: `${desc}`,
                price: price,
                img: post_img,
                category: category,
            }).exec((err) => {
                if (err) res.send({ error: true, data: 'err' + err });
                else res.send({ error: false, data: 'done' });
            });
        }
    },

    getAllProducts: async (req, res) => {
        const posts = await productSchemaModel.find({isactive: true});
        res.status(200).json({ error: false, data: posts });
    },

    getProductByCategory: async (req, res) => {
        const { value } = req.body;
        const posts = await productSchemaModel.find({ category: value, isactive: true  });
        res.status(200).json({ error: false, data: posts });
    },

    removeProduct: async (req, res) => {
        const { _id, status } = req.body;

        const prod = await productSchemaModel.findByIdAndUpdate(_id, { isactive: status });
        res.status(200).json({ error: false });
    },

    searchProducts: async (req, res) => {
        let results = {};

        try {
            const { page, searchvalue } = req.body;

            const searchPattern = new RegExp(searchvalue, 'i');

            const page_as_int = parseInt(page);
            const limit = parseInt('10');
            const startIndex = (page_as_int - 1) * limit;
            const endIndex = page_as_int * limit;


            var projectString = {
                "$project": {
                    "title": 1,
                    "desc": 1,
                    "img": 1,
                    "isactive": 1,
                    "price": 1,
                    "qty": 1,
                    "user_id": {
                        "firstname": "$user_id.firstname",
                        "lastname": "$user_id.lastname",
                        "_id": "$user_id._id",
                        "email": "$user_id.email",
                    },
                    "typology": 1,
                    "geometry": 1,
                    "category": 1,
                    "created": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                }
            };
            var limitString = { "$limit": limit };
            var skipString = { "$skip": startIndex };

            var sortString = { "$sort": { "createdAt": -1 } };


            var aggregateString = [
                {
                    $match: {
                        $or: [
                            { title: searchPattern },
                            { desc: searchPattern },
                            { category: searchPattern }
                        ]
                    }
                },
                limitString,
                skipString,
                sortString,
                projectString,
            ];

            productSchemaModel.aggregate(aggregateString).then(async function (products) {

                if (products.length === 0) {
                    results.error = true;
                    results.data = 'No products ';
                    res.send(results);
                } else {
                    if (startIndex > 0) {
                        results.previous = {
                            page: page_as_int - 1,
                            limit: limit
                        };
                    }

                    res.send({ error: false, data: products });
                }
            });
        } catch (error) {
            console.error(error);
            results.error = true;
            results.data = 'No products ';
            res.send(results);
        }
    },

    addOrder: async (req, res) => {
        const { user_id, product_list, address, date, city, card_name, card_number, total_amount } = req.body;

        try {
            const orderModel = orderSchemaModel({
                user_id: user_id,
                product_list: product_list,
                address: address,
                date: date,
                city: city,
                card_name: card_name,
                card_number: card_number,
                total_amount: total_amount,
            });
            orderModel.save(async err => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: true,
                        data: "err" + err,
                    });
                } else {
                    product_list.forEach(async (element) => {
                        await productSchemaModel.findByIdAndUpdate(element._id, { qty: element.stock_qty }).exec((err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });
                }
            });
        } catch (err) {
            console.log("error", err);
            res.send({ error: true, data: 'err' + err });
        } finally {
            res.status(200).json({ error: false, data: {} });
        }
    },

    getOrdersUser: async (req, res) => {
        const { user_id } = req.body;

        orderSchemaModel
            .find({ user_id: user_id })
            // .populate('product_list')
            .populate('user_id')
            .exec()
            .then((foundCart) => {
                res.status(200).json({
                    error: false,
                    data: foundCart
                });
            })
            .catch((error) => {
                res.status(200).json({
                    error: true,
                    data: 'error'
                });
            });
    },



    updateOrderStatus: async (req, res) => {
        let order_id = req.body.order_id;
        let status = req.body.status;

        await orderSchemaModel.findByIdAndUpdate(order_id, { status: status }).exec((err) => {
            if (err) res.send({ error: true, data: 'err' + err });
            else res.send({ error: false, data: 'done' });
        });
    },

    updateOrderDeliveredStatus: async (req, res) => {
        let order_id = req.body.order_id;
        let deliver_status = req.body.deliver_status;

        await orderSchemaModel.findByIdAndUpdate(order_id, { deliver_status: deliver_status }).exec((err) => {
            if (err) res.send({ error: true, data: 'err' + err });
            else res.send({ error: false, data: 'done' });
        });
    },


    getAllOrders: async (req, res) => {
        const posts = await orderSchemaModel.find().populate('user_id');
        res.status(200).json({ error: false, data: posts });
    },


    createfeedback: async (req, res) => {
        const { product_id, feedback, rating, user_id } = req.body;

        const feedbackModel = feedbackSchemaModel({
            product_id: product_id,
            feedback: feedback,
            rating: rating,
            user_id: user_id
        });

        feedbackModel.save(async err => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: err,
                });
            } else {
                res.status(200).json({
                    error: false,
                    data: feedbackModel
                });
            }
        });
    },

    allFeedbacks: async (req, res) => {
        const { product_id } = req.body;
        const feedback = await feedbackSchemaModel.find({ product_id: product_id }).populate('user_id');
        if (!feedback) {
            res.status(500).json({ error: true, data: "no feedback found !" });
        } else {
            res.status(200).json({ error: false, data: feedback });
        }
    },
};


