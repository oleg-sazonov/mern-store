import { Box, Input, Text } from "@chakra-ui/react";
import { useInputStyles } from "@/hooks/useInputStyles";

const ValidatedInput = ({
    error,
    w = "full",
    showErrorIcon = true,
    onBlur,
    type,
    ...inputProps
}) => {
    const { colors, getInputProps } = useInputStyles();

    const handleBlur = (e) => {
        // Call parent onBlur handler if provided
        onBlur?.(e);
        // Call original onBlur if provided
        inputProps.onBlur?.(e);
    };

    // Handle display value for number inputs
    const getDisplayValue = () => {
        const { value } = inputProps;

        // For number inputs, don't show "0" - show empty string instead
        if (type === "number" && (value === 0 || value === "0")) {
            return "";
        }

        return value;
    };

    return (
        <Box w={w}>
            <Input
                {...getInputProps(!!error)}
                {...inputProps}
                type={type}
                value={getDisplayValue()} // Use processed display value
                onBlur={handleBlur}
            />
            {error && (
                <Text
                    color={colors.errorTextColor}
                    fontSize="sm"
                    mt={1}
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    {showErrorIcon && ""}
                    {error}
                </Text>
            )}
        </Box>
    );
};

export default ValidatedInput;
