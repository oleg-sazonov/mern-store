import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Add parameter validation middleware
const validateProductId = (req, res, next) => {
    const { id } = req.params;

    // Check if id parameter exists and is not empty
    if (!id || id.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Product ID is required",
        });
    }

    // Check if id is a valid MongoDB ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID format",
        });
    }

    next();
};

// ✅ Routes with proper parameter validation
router.get("/", getAllProducts); // Fetch all products
router.post("/", createProduct); // Create a new product
router.patch("/:id", validateProductId, updateProduct); // Update a product by ID
router.delete("/:id", validateProductId, deleteProduct); // Delete a product by ID

export default router;
