"use strict";

const Joi = require('joi');
const passwordHash = require("password-hash");
const { userSchemaModel } = require('../models/userModel');

var nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');



module.exports = {



    createUser: async (req, res) => {
        const { firstname, lastname, email, password, type, contact } = req.body;

        const user = await userSchemaModel.findOne({
            email: req.body.email
        });

        if (user) return res.send({
            error: true,
            data: {}
        });

        passwordHash.generate

        const userModel = userSchemaModel({
            firstname: firstname,
            lastname: lastname,
            email: email,
            contact: contact,
            password: passwordHash.generate(password),
            type: type
        });

        userModel.save(async err => {
            if (err) {
                res.status(200).json({
                    error: true,
                    data: {},
                });
            } else {
                res.status(200).json({
                    error: false,
                    data: userModel
                });
            }
        });
    },
    //

    updateUser: async (req, res) => {
        const { _id, firstname, lastname, email, type, contact } = req.body;

        await userSchemaModel.findByIdAndUpdate(_id, {
            firstname: firstname,
            lastname: lastname,
            email: email,
            contact: contact,
            type: type
        }).exec((err) => {
            if (err) res.send({ error: true, data: 'err' + err });
            else res.send({ error: false, data: 'done' });
        });
    },


    loginUser: async (req, res) => {

        const { email, password } = req.body;

        const user = await userSchemaModel.findOne({ email: email });
        if (!user) {
            res
                .status(500)
                .json({ error: true, data: {} });
        } else {
            const isPasswordMatch = await passwordHash.verify(
                password,
                user.password
            );

            if (!isPasswordMatch) {
                res.status(500).json({ error: true, data: {} });
            } else {
                res.status(200).json({ error: false, data: user });
            }
        }

    },

    getUserByID: async (req, res) => {

        const { user_id, target_id } = req.body;

        const user = await userSchemaModel.findOne({ _id: target_id });
        if (!user) {
            res
                .status(500)
                .json({ error: true, data: {} });
        } else {


            user.isfriend = false;
            res.status(200).json({ error: false, data: user });

        }

    },

    update_password: async (req, res) => {

        const { error } = updatePasswordValidation(req.body)
        if (!error) {
            let user_id = req.body.user_id;
            let old_password = req.body.old_password;
            let new_password = req.body.new_password;
            const user = await userSchemaModel.findOne({ _id: user_id });

            const isPasswordMatch = await passwordHash.verify(
                old_password,
                user.password
            );

            if (!isPasswordMatch) {
                res.status(500).json({ error: true, data: "password not match !" });
            } else {
                const hashedPassword = await passwordHash.generate(new_password);
                user.password = hashedPassword;
                user.save();
                res.status(200).json({ error: false, data: 'done' });
            }
        } else {
            let detail = error.details[0].message;
            res.send({ error: true, data: detail });
        }

    },


    getAllUserAdmin: async (req, res) => {
        const posts = await userSchemaModel.find({ type: { $ne: "admin" } });
        res.status(200).json({ error: false, data: posts });
    },

    makeUserActive: async (req, res) => {
        const { user_id, active } = req.body;

        const user = await userSchemaModel.findByIdAndUpdate(user_id, { isactive: active });
        res.status(200).json({ error: false });
    },

    updateImage: async (req, res) => {
        let user_id = req.body.user_id;
        let name = req.file.filename;

        await userSchemaModel.findByIdAndUpdate(user_id, { img: name }).exec((err) => {
            if (err) res.send({ error: true, data: 'err' + err });
            else res.send({ error: false, img: name });
        });

    },


};


