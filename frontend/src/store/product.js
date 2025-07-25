import { create } from "zustand";
import { productApi } from "@/api/productApi";

export const useProductStore = create((set, get) => ({
    // State
    products: [],
    loading: false,
    error: null,

    // Basic setters
    setProducts: (products) => set({ products }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    // Actions - these are already stable references in Zustand
    fetchProducts: async () => {
        // Prevent multiple simultaneous fetches
        const { loading } = get();
        if (loading) return { success: false, message: "Already loading" };

        set({ loading: true, error: null });
        try {
            const data = await productApi.getAllProducts();
            set({ products: data.products, loading: false });
            return { success: true, data: data.products };
        } catch (error) {
            set({ error: error.message, loading: false });
            return { success: false, message: error.message };
        }
    },

    createProduct: async (newProduct) => {
        set({ loading: true, error: null });
        try {
            const data = await productApi.createProduct(newProduct);
            set((state) => ({
                products: [...state.products, data.product],
                loading: false,
            }));
            return { success: true, message: "Product created successfully" };
        } catch (error) {
            set({ error: error.message, loading: false });
            return { success: false, message: error.message };
        }
    },

    updateProduct: async (id, updateData) => {
        set({ loading: true, error: null });
        try {
            const data = await productApi.updateProduct(id, updateData);
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === id ? data.product : product
                ),
                loading: false,
            }));
            return { success: true, message: "Product updated successfully" };
        } catch (error) {
            set({ error: error.message, loading: false });
            return { success: false, message: error.message };
        }
    },

    deleteProduct: async (id) => {
        set({ loading: true, error: null });
        try {
            await productApi.deleteProduct(id);
            // Update UI immediately without reloading page
            set((state) => ({
                products: state.products.filter(
                    (product) => product._id !== id
                ),
                loading: false,
            }));
            return { success: true, message: "Product deleted successfully" };
        } catch (error) {
            set({ error: error.message, loading: false });
            return { success: false, message: error.message };
        }
    },

    // Helper methods
    clearError: () => set({ error: null }),
    getProductById: (id) => {
        const { products } = get();
        return products.find((product) => product._id === id);
    },
}));
