"use strict";
const Joi = require("joi");

const { postSchemaModel } = require("../models/postModel");
const { likeSchemaModel } = require("../models/likesModel");
const { userSchemaModel } = require("../models/userModel");
const { notificationSchemaModel } = require("../models/notificationModel");



module.exports = {
    createLike: async(req, res) => {
        const { user_id, post_id} = req.body;


        const likeModel = new likeSchemaModel({
            user_id: user_id,
            post_id: post_id
        });
        await likeModel.save(async err => {
            if (err) {
                res.status(500).json({
                    error: true,
                    data: "err" + err
                });
            } else {
                let postData = await postSchemaModel.findById(post_id);

                var sharingUser= await userSchemaModel.findOne({_id:user_id});

                postData.likes = ++postData.likes;
                postData.usersLiked.push(user_id);

                await postData.save();

                const notiModel = notificationSchemaModel({
                    user_id:postData.user_id,
                    notification: sharingUser.firstname+ " Liked Your Post"
                });
                await notiModel.save();

                res.status(200).json({ error: false, data: "done" });
            }
        });
    },

    deleteLike: async(req, res) => {
        const { error } = createLikeValidation(req.body);

        if (!error) {
            const { user_id, post_id } = req.body;

            //   const likeModel = new likeSchemaModel({user_id: user_id, post_id: post_id});
            await likeSchemaModel
                .find({ user_id: user_id, post_id: post_id })
                .remove();
            let postData = await postSchemaModel.findById(post_id);

            postData.likes = --postData.likes;
            postData.usersLiked.remove(user_id);
            await postData.save();

            

            res.status(200).json({ error: false, data: "done" });
        } else {
            let detail = error.details[0].message;
            res.send({ error: true, data: detail });
        }
    },

};

function createLikeValidation(like) {
    const schema = Joi.object().keys({
        post_id: Joi.string().required(),
        user_id: Joi.string().required()
    });
    return Joi.validate(like, schema);
}
