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
            if (
                req.method === "GET" &&
                !req.path.startsWith("/api/") &&
                !req.path.startsWith("/health")
            ) {
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

        // In development, let React Router handle all non-API routes
        app.use((req, res, next) => {
            // Only handle GET requests for non-API routes in development
            if (
                req.method === "GET" &&
                !req.path.startsWith("/api/") &&
                !req.path.startsWith("/health")
            ) {
                // ✅ Let React Router handle this - don't send JSON response
                console.log(
                    `🔄 Development: Letting frontend handle route: ${req.originalUrl}`
                );

                // Return simple HTML that tells browser to use frontend dev server
                res.status(404).send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Development Mode</title>
                        <style>
                            body { 
                                font-family: Arial, sans-serif; 
                                text-align: center; 
                                padding: 50px; 
                                background: #f5f5f5; 
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background: white;
                                padding: 30px;
                                border-radius: 10px;
                                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                            }
                            .code { 
                                background: #f0f0f0; 
                                padding: 10px; 
                                border-radius: 5px; 
                                font-family: monospace; 
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>🔧 Development Mode</h1>
                            <p>This route is handled by the frontend dev server.</p>
                            <div class="code">
                                <strong>Frontend:</strong> http://localhost:5173${req.originalUrl}
                            </div>
                            <p>Make sure your frontend dev server is running:</p>
                            <div class="code">cd frontend && npm run dev</div>
                        </div>
                    </body>
                    </html>
                `);
            } else {
                next();
            }
        });
    }
};
