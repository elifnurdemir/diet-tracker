import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { DarkTheme, LightTheme } from "./theme";
import { responsiveFontSizes, createTheme } from "@mui/material/styles";
const sharedTypography = {
  fontFamily: '"Quicksand", sans-serif',
  h1: { fontWeight: 700, fontSize: "3rem" },
  h2: { fontWeight: 600, fontSize: "1rem" },
  body1: { fontWeight: 600, fontSize: "1rem" },
};

const BlueLightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: { main: "#3FC1C0" },
      secondary: { main: "#5e6472" },
      background: {
        default: "#EEEEEE",
        paper: "#3fc1c0",
      },
      text: {
        primary: "#ffffffff",
        secondary: "#000000ff",
      },
    },
    typography: sharedTypography,
  })
);

const BlueDarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#F6F8D5" },
      secondary: { main: "#4F959D" },
      background: {
        default: "#09122C",
        paper: "#0F4C75",
      },
      text: {
        primary: "#BBE1FA",
        secondary: "#F6F8D5",
      },
    },
  })
);

const RedLightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: { main: "#0C005A" },
      background: { default: "#E0E0E0" },
      text: { primary: "#FF4D00" },
    },
  })
);

const RedDarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#333" }, //text
      secondary: { main: "#333" },
      background: {
        default: "#333", // bg
        paper: "#03071E", // drawer
      },
      text: {
        primary: "#DC2F02", // titles
        secondary: "#F6F8D5",
      },
    },
  })
);

type ThemeName = "royalVelvet" | "blue" | "red";
type Mode = "light" | "dark";

type ThemeContextType = {
  currentTheme: any;
  currentThemeName: ThemeName;
  currentMode: Mode;
  setTheme: (themeName: ThemeName, mode?: Mode) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: LightTheme,
  currentThemeName: "royalVelvet",
  currentMode: "light",
  setTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<ThemeName>("royalVelvet");
  const [mode, setMode] = useState<Mode>("light");

  const getTheme = (name: ThemeName, mode: Mode) => {
    if (name === "royalVelvet")
      return mode === "light" ? LightTheme : DarkTheme;
    if (name === "blue")
      return mode === "light" ? BlueLightTheme : BlueDarkTheme;
    if (name === "red") return mode === "light" ? RedLightTheme : RedDarkTheme;
    return LightTheme; // default fallback
  };

  const theme = getTheme(themeName, mode);

  const setTheme = (name: ThemeName, selectedMode: Mode = "light") => {
    setThemeName(name);
    setMode(selectedMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: theme,
        currentThemeName: themeName,
        currentMode: mode,
        setTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
