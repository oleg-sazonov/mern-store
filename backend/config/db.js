import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const dbURI =
            process.env.MONGODB_URI || "mongodb://localhost:27017/products";

        const conn = await mongoose.connect(dbURI);

        console.log("MongoDB connected successfully to:", conn.connection.host);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // 1 indicates an error occurred, 0 indicates success
    }
};
