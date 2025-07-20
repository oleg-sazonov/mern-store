import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT_SERVER || 5000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/products", productRoutes); // Use product routes

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
