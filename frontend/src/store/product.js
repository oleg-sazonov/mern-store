import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (
            !newProduct ||
            !newProduct.name ||
            !newProduct.price ||
            !newProduct.image
        ) {
            return { success: false, message: "Please fill in all fields" };
        }
        const res = await fetch(`${API_URL}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        if (res.ok) {
            set((state) => ({
                products: [...state.products, data.product],
            }));
            return { success: true, message: "Product created successfully" };
        } else {
            return {
                success: false,
                message: data.message || "Failed to create product",
            };
        }
    },
}));
