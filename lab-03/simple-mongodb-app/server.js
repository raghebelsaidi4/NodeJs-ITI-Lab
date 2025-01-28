const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const Product = require("./models/Products");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/ecommerce", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Route: Serve the home page
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Route: List all products
app.get("/listproducts", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching products.");
    }
});

// Route: Insert a new product
app.post("/insert", async (req, res) => {
    const { Name, Price, Quantity, ImgURL } = req.body;

    if (!Name || !Price || !Quantity || !ImgURL) {
        return res.status(400).send("All fields are required.");
    }

    try {
        const newProduct = new Product({ Name, Price, Quantity, ImgURL });
        await newProduct.save();
        res.status(200).send("Product inserted successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting product.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
