import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT_SERVER || 5000;

app.get("/", (req, res) => {
    res.send("Server is running successfully!");
});

console.log(process.env.MONGODB_URI);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
