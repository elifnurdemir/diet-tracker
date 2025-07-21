import { Box } from "@mui/material";
import { useEffect } from "react";
import { useThemeContext } from "../../../ThemeContext";

export const Home = () => {
  const { setTheme } = useThemeContext();

  useEffect(() => {
    setTheme("pink");
  }, []);
  return <Box>Home</Box>;
};
