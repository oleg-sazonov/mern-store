import express from "express";
import {
    createProduct,
    deletedProduct,
    getAllProducts,
    updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts); // Fetch all products
router.post("/", createProduct); // Create a new product
router.patch("/:id", updateProduct); // Update a product by ID
router.delete("/:id", deletedProduct); // Delete a product by ID

export default router;
