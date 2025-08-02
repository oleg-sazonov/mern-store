import productRoutes from "./product.route.js";

export const setupRoutes = (app) => {
    // API routes
    app.use("/api/products", productRoutes);
    console.log("📋 API routes configured");
};
