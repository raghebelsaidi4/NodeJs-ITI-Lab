// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    ImgURL: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
