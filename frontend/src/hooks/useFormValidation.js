import { useState, useCallback } from "react";
import { validateProduct } from "@/utils/validation";
import { toaster } from "@/components/ui/toaster";

export const useFormValidation = (
    initialData = { name: "", price: "", image: "" }
) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({ name: "", price: "", image: "" });

    const validateForm = useCallback(async () => {
        const { isValid, errors: validationErrors } = await validateProduct(
            formData
        );
        setErrors(validationErrors);

        if (!isValid) {
            toaster.create({
                title: "Validation Error",
                description: "Please fix the errors below",
                type: "error",
                status: "error",
                duration: 4000,
                closable: true,
            });
        }

        return isValid;
    }, [formData]);

    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));

            // Clear error when user starts typing
            if (errors[name]) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
        },
        [errors]
    );

    const resetForm = useCallback(
        (newData = { name: "", price: "", image: "" }) => {
            setFormData(newData);
            setErrors({ name: "", price: "", image: "" });
        },
        []
    );

    const clearErrors = useCallback(() => {
        setErrors({ name: "", price: "", image: "" });
    }, []);

    return {
        formData,
        errors,
        setFormData,
        validateForm,
        handleInputChange,
        resetForm,
        clearErrors,
    };
};
