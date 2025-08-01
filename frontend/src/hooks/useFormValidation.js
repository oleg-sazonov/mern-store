import { useState, useCallback, useEffect } from "react";
import {
    validateProduct,
    validateSingleField,
    createDebouncedValidator,
    sanitizeProductData,
} from "@/utils/validation";
import { toaster } from "@/components/ui/toaster";

export const useFormValidation = (
    initialData = { name: "", price: "", image: "" },
    options = {}
) => {
    const {
        enableRealTimeValidation = true,
        validationDelay = 300,
        sanitizeOnChange = true,
        showToastOnError = true,
    } = options;

    const [formData, setFormData] = useState(() =>
        sanitizeProductData(initialData)
    );
    const [errors, setErrors] = useState({ name: "", price: "", image: "" });
    const [isValidating, setIsValidating] = useState(false);
    const [touchedFields, setTouchedFields] = useState({});

    // Create debounced validator for real-time validation
    const debouncedValidator = useCallback(
        () => createDebouncedValidator(validationDelay),
        [validationDelay]
    );

    // Cleanup debounced validator on unmount
    useEffect(() => {
        const validator = debouncedValidator();
        return () => validator.cleanup?.();
    }, [debouncedValidator]);

    // Full form validation
    const validateForm = useCallback(async () => {
        setIsValidating(true);

        try {
            const {
                isValid,
                errors: validationErrors,
                sanitizedData,
            } = await validateProduct(formData);

            setErrors(validationErrors);

            if (!isValid && showToastOnError) {
                // Show specific error messages instead of generic one
                const errorMessages = Object.values(validationErrors)
                    .filter((error) => error)
                    .slice(0, 2); // Show max 2 errors to avoid overwhelming user

                toaster.create({
                    title: "Validation Error",
                    description:
                        errorMessages.length > 0
                            ? errorMessages.join(". ")
                            : "Please fix the errors and try again",
                    type: "error",
                    status: "error",
                    duration: 4000,
                    closable: true,
                });
            }

            return { isValid, sanitizedData };
        } catch (error) {
            console.error("Form validation error:", error);
            return { isValid: false, sanitizedData: formData };
        } finally {
            setIsValidating(false);
        }
    }, [formData, showToastOnError]);

    // Single field validation with debouncing
    const validateField = useCallback(
        async (fieldName, value) => {
            if (!enableRealTimeValidation || !touchedFields[fieldName]) {
                return;
            }

            try {
                const { isValid, error } = await validateSingleField(
                    fieldName,
                    value,
                    formData
                );

                setErrors((prev) => ({
                    ...prev,
                    [fieldName]: isValid ? "" : error,
                }));
            } catch (error) {
                console.error(
                    `Field validation error for ${fieldName}:`,
                    error
                );
            }
        },
        [formData, enableRealTimeValidation, touchedFields]
    );

    // Enhanced input change handler
    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;

            // Update form data
            setFormData((prev) => {
                const newData = { ...prev, [name]: value };
                return sanitizeOnChange
                    ? sanitizeProductData(newData)
                    : newData;
            });

            // Mark field as touched
            setTouchedFields((prev) => ({ ...prev, [name]: true }));

            // Clear immediate error when user starts typing
            if (errors[name]) {
                setErrors((prev) => ({ ...prev, [name]: "" }));
            }

            // Debounced real-time validation
            if (enableRealTimeValidation) {
                const validator = debouncedValidator();
                validator(name, value, formData, (result) => {
                    if (!result.isValid && touchedFields[name]) {
                        setErrors((prev) => ({
                            ...prev,
                            [name]: result.error,
                        }));
                    }
                });
            }
        },
        [
            errors,
            formData,
            enableRealTimeValidation,
            sanitizeOnChange,
            touchedFields,
            debouncedValidator,
        ]
    );

    // Enhanced field blur handler for immediate validation
    const handleFieldBlur = useCallback(
        async (e) => {
            const { name, value } = e.target;

            // Mark field as touched
            setTouchedFields((prev) => ({ ...prev, [name]: true }));

            // Immediate validation on blur
            await validateField(name, value);
        },
        [validateField]
    );

    // Reset form with optional new data
    const resetForm = useCallback(
        (newData = { name: "", price: "", image: "" }) => {
            const sanitizedData = sanitizeProductData(newData);
            setFormData(sanitizedData);
            setErrors({ name: "", price: "", image: "" });
            setTouchedFields({});
            setIsValidating(false);
        },
        []
    );

    // Clear all errors
    const clearErrors = useCallback(() => {
        setErrors({ name: "", price: "", image: "" });
    }, []);

    // Clear error for specific field
    const clearFieldError = useCallback((fieldName) => {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }, []);

    // Set specific field value with validation
    const setFieldValue = useCallback(
        async (fieldName, value) => {
            setFormData((prev) => {
                const newData = { ...prev, [fieldName]: value };
                return sanitizeOnChange
                    ? sanitizeProductData(newData)
                    : newData;
            });

            setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));

            if (enableRealTimeValidation) {
                await validateField(fieldName, value);
            }
        },
        [sanitizeOnChange, enableRealTimeValidation, validateField]
    );

    // Get validation state for a specific field
    const getFieldState = useCallback(
        (fieldName) => ({
            value: formData[fieldName] || "",
            error: errors[fieldName] || "",
            hasError: !!errors[fieldName],
            isTouched: !!touchedFields[fieldName],
            isValid: !errors[fieldName] && touchedFields[fieldName],
        }),
        [formData, errors, touchedFields]
    );

    // Check if form has any errors
    const hasErrors = Object.values(errors).some((error) => error);

    // Check if form is completely valid (no errors and all fields touched)
    const isFormValid =
        !hasErrors && Object.keys(formData).every((key) => touchedFields[key]);

    return {
        // Form state
        formData,
        errors,
        isValidating,
        touchedFields,
        hasErrors,
        isFormValid,

        // Form actions
        validateForm,
        validateField,
        handleInputChange,
        handleFieldBlur,
        resetForm,
        clearErrors,
        clearFieldError,
        setFieldValue,
        setFormData,

        // Field utilities
        getFieldState,
    };
};
