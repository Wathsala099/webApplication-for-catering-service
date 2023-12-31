"use strict";

const express = require("express");
const productRouter = new express.Router();
const productController = require('../controller/productController');
const multer = require('multer');
//img path
// http://localhost:5000/uploads/users_profile_img/1582645366303-apple-logo.png
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

productRouter.post("/create", upload.single('img'), productController.createProduct);
productRouter.post("/update", upload.single('img'), productController.updateProduct);
productRouter.post("/getproducts", productController.getAllProducts);
productRouter.post("/getProductByCategory", productController.getProductByCategory);
productRouter.post("/search", productController.searchProducts);
productRouter.post("/remove", productController.removeProduct);

productRouter.post("/addOrder", productController.addOrder);
productRouter.post("/getOrdersUser", productController.getOrdersUser);
productRouter.post("/getAllOrders", productController.getAllOrders);

productRouter.post("/updateOrderStatus", productController.updateOrderStatus);
productRouter.post("/updateOrderDeliveredStatus", productController.updateOrderDeliveredStatus);

productRouter.post("/feedback", productController.createfeedback);
productRouter.post("/allFeedback", productController.allFeedbacks);

module.exports = productRouter;