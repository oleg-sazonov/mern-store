import * as yup from "yup";

export const productSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required("Product name is required")
        .min(2, "Product name must be at least 2 characters")
        .max(100, "Product name must be less than 100 characters"),
    price: yup
        .number()
        .typeError("Price must be a valid number")
        .required("Product price is required")
        .positive("Price must be greater than 0")
        .max(999999, "Price must be less than 1,000,000"),
    image: yup
        .string()
        .trim()
        .required("Product image URL is required")
        .url("Please enter a valid URL")
        .matches(/^https?:\/\//, "URL must start with http:// or https://"),
});

export const validateProduct = async (product) => {
    try {
        // Transform string price to number for validation
        const transformedProduct = {
            ...product,
            price: parseFloat(product.price),
        };

        await productSchema.validate(transformedProduct, { abortEarly: false });
        return { isValid: true, errors: {} };
    } catch (error) {
        const errors = {
            name: "",
            price: "",
            image: "",
        };

        error.inner.forEach((err) => {
            // eslint-disable-next-line no-prototype-builtins
            if (err.path && errors.hasOwnProperty(err.path)) {
                errors[err.path] = err.message;
            }
        });

        return { isValid: false, errors };
    }
};

export const sanitizeProductData = (product) => {
    return {
        name: product.name?.trim() || "",
        price: parseFloat(product.price) || 0,
        image: product.image?.trim() || "",
    };
};

// Keep the manual URL validation as fallback
export const isValidURL = (string) => {
    try {
        const url = new URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
};
