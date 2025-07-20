import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = process.env.PORT_SERVER || 5000;

app.get("/", (req, res) => {
    res.send("Server is running successfully!");
});

app.post("/api/products", async (req, res) => {
    const product = req.body; // User input for product creation

    if (!product.name || !product.price || !product.image) {
        return res
            .status(400)
            .json({ success: false, message: "Please provide all fields." });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        console.error("Error saving product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
