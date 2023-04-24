import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      position="fixed"
      bottom="1rem"
      left="1rem"
      icon={<SwitchIcon />}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={toggleColorMode}
      colorScheme={isDark ? "blue" : "orange"}
    />
  );
};

export default ColorModeSwitcher;
