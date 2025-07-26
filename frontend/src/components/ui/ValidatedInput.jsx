import { Box, Input, Text } from "@chakra-ui/react";
import { useInputStyles } from "@/hooks/useInputStyles";

const ValidatedInput = ({ error, w = "full", ...inputProps }) => {
    const { colors, getInputProps } = useInputStyles();

    return (
        <Box w={w}>
            <Input {...getInputProps(!!error)} {...inputProps} />
            {error && (
                <Text color={colors.errorTextColor} fontSize="sm" mt={1}>
                    {error}
                </Text>
            )}
        </Box>
    );
};

export default ValidatedInput;
