export const notFoundHandler = (req, res, next) => {
    // Handle API routes that weren't matched
    if (req.path.startsWith("/api/")) {
        console.log(`🔍 API 404: ${req.method} ${req.originalUrl}`);
        return res.status(404).json({
            success: false,
            error: "API Not Found",
            message: `API endpoint '${req.originalUrl}' not found`,
            path: req.originalUrl,
            method: req.method,
            availableEndpoints: [
                "GET /api/products - Get all products",
                "POST /api/products - Create new product",
                "PATCH /api/products/:id - Update product",
                "DELETE /api/products/:id - Delete product",
                "GET /health - Health check",
            ],
        });
    }

    // For non-API routes in production, let them fall through to React app
    if (process.env.NODE_ENV === "production") {
        return next();
    }

    // In development, show 404 for non-API routes
    res.status(404).json({
        success: false,
        message: `Route '${req.originalUrl}' not found`,
        path: req.originalUrl,
        method: req.method,
    });
};

export const globalErrorHandler = (err, req, res, next) => {
    console.error("💥 Global error:", err.message);

    const NODE_ENV = process.env.NODE_ENV || "development";

    if (NODE_ENV === "development") {
        console.error("Stack trace:", err.stack);
        return res.status(err.status || 500).json({
            error: err.name || "Error",
            message: err.message,
            stack: err.stack,
            path: req.originalUrl,
        });
    }

    res.status(err.status || 500).json({
        error: "Internal Server Error",
        message: "Something went wrong!",
        path: req.originalUrl,
    });
};
