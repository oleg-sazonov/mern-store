import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { useColorMode } from "./ui/color-mode";
import { IoMoonSharp, IoSunnySharp } from "react-icons/io5";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <Text
                    fontSize={{ base: "2xl", sm: "3xl" }}
                    textTransform={"uppercase"}
                    textAlign={{ base: "center", sm: "left" }}
                    bgGradient={"to-r"}
                    gradientFrom={"blue.400"}
                    gradientTo={"purple.500"}
                    bgClip={"text"}
                    fontWeight={"bold"}
                >
                    <Link to="/">Product Store</Link>
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to="/create">
                        <Button
                            bg={"gray.200"}
                            color={"gray.800"}
                            _hover={{
                                bg: "gray.300",
                            }}
                            _dark={{
                                bg: "gray.700",
                                color: "gray.100",
                                _hover: {
                                    bg: "gray.600",
                                },
                            }}
                        >
                            <FaPlusSquare fontSize={"20px"} />
                        </Button>
                    </Link>
                    <Button
                        onClick={toggleColorMode}
                        bg={"gray.200"}
                        color={"gray.800"}
                        _hover={{
                            bg: "gray.300",
                        }}
                        _dark={{
                            bg: "gray.700",
                            color: "gray.100",
                            _hover: {
                                bg: "gray.600",
                            },
                        }}
                    >
                        {colorMode === "light" ? (
                            <IoMoonSharp />
                        ) : (
                            <IoSunnySharp size={"20px"} />
                        )}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;
