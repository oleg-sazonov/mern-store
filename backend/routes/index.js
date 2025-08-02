import productRoutes from "./product.route.js";

export const setupRoutes = (app) => {
    // Health check route (before API routes)
    app.get("/health", (req, res) => {
        res.status(200).json({
            status: "OK",
            message: "MERN Store API is running",
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || "development",
        });
    });

    // API routes
    app.use("/api/products", productRoutes);

    console.log("📋 API routes configured");
    console.log("   📍 GET    /health");
    console.log("   📍 GET    /api/products");
    console.log("   📍 POST   /api/products");
    console.log("   📍 PATCH  /api/products/:id");
    console.log("   📍 DELETE /api/products/:id");
};
