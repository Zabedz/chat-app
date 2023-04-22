import { extendTheme, SystemStyleObject } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: "Poppins, sans-serif",
        body: "Poppins, sans-serif",
    },
    components: {
        Button: {
            variants: {
                primary: (props: { colorMode: "light" | "dark" }): SystemStyleObject => ({
                    backgroundColor: props.colorMode === "light" ? "blue.500" : "blue.300",
                    color: "white",
                    _hover: {
                        backgroundColor: props.colorMode === "light" ? "blue.600" : "blue.400",
                    },
                }),
            },
        },
    },
});

export default theme;
