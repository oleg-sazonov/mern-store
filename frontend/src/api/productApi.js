const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const productApi = {
    // Get all products
    getAllProducts: async () => {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to fetch products");
        }

        return data;
    },

    // Create product
    createProduct: async (newProduct) => {
        if (!newProduct?.name || !newProduct?.price || !newProduct?.image) {
            throw new Error("Please fill in all fields");
        }

        const res = await fetch(`${API_URL}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to create product");
        }

        return data;
    },

    // Update product
    updateProduct: async (id, updateData) => {
        const res = await fetch(`${API_URL}/api/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to update product");
        }

        return data;
    },

    // Delete product
    deleteProduct: async (id) => {
        const res = await fetch(`${API_URL}/api/products/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to delete product");
        }

        return data;
    },
};
