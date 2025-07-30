import express from "express";
import path from "path";

export const setupStaticFiles = (app, NODE_ENV, __dirname) => {
    if (NODE_ENV === "production") {
        const staticPath = path.join(__dirname, "frontend", "dist");
        console.log("📦 Serving static files from:", staticPath);

        app.use(
            express.static(staticPath, {
                maxAge: "1d", // 1 day instead of 1 year for easier updates
                etag: true,
                lastModified: true,
                setHeaders: (res, filePath) => {
                    if (filePath.endsWith(".html")) {
                        res.setHeader(
                            "Cache-Control",
                            "no-cache, no-store, must-revalidate"
                        );
                    } else if (
                        filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)
                    ) {
                        res.setHeader("Cache-Control", "public, max-age=86400"); // 1 day
                    }
                },
            })
        );

        // Use middleware function instead of problematic "*" route
        app.use((req, res, next) => {
            // Only handle GET requests for non-API routes
            if (req.method === "GET" && !req.path.startsWith("/api/")) {
                const indexPath = path.resolve(
                    __dirname,
                    "frontend",
                    "dist",
                    "index.html"
                );

                console.log(`📄 Serving React app for: ${req.originalUrl}`);

                res.sendFile(indexPath, (err) => {
                    if (err) {
                        console.error(
                            "❌ Error serving index.html:",
                            err.message
                        );
                        res.status(500).json({
                            error: "Server Error",
                            message: "Unable to serve the application",
                        });
                    }
                });
            } else {
                next();
            }
        });
    } else {
        console.log("🔧 Development mode: Static file serving disabled");

        // Use middleware function instead of problematic "*" route
        app.use((req, res, next) => {
            // Only handle GET requests for non-API routes in development
            if (
                req.method === "GET" &&
                !req.path.startsWith("/api/") &&
                !req.path.startsWith("/health")
            ) {
                res.status(404).json({
                    error: "Not Found",
                    message:
                        "This route is only available in production. Use the frontend dev server.",
                    hint: "Run 'npm run dev' in the frontend directory",
                    path: req.originalUrl,
                });
            } else {
                next();
            }
        });
    }
};
