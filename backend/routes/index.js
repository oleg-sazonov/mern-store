import productRoutes from "./product.route.js";

export const setupRoutes = (app, { generalLimiter, apiLimiter }) => {
    // Apply general rate limiting
    app.use(generalLimiter);

    // Health check endpoint
    app.get("/health", (req, res) => {
        res.status(200).json({
            status: "OK",
            timestamp: new Date().toISOString(),
            uptime: Math.floor(process.uptime()),
            environment: process.env.NODE_ENV || "development",
            version: "1.0.0",
        });
    });

    // API routes
    app.use("/api/products", apiLimiter, productRoutes);
    console.log("📋 API routes configured");
};
