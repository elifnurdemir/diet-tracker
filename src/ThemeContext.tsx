import React, { createContext, useContext, useState } from "react";
import {
  ThemeProvider,
  responsiveFontSizes,
  createTheme,
} from "@mui/material/styles";
import { DarkTheme, LightTheme } from "./theme";

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
      background: { default: "#ede7e3", paper: "#3a506b" },
      text: { primary: "#b2f7ef", secondary: "#000000ff" },
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
      background: { default: "#09122C", paper: "#0F4C75" },
      text: { primary: "#BBE1FA", secondary: "#F6F8D5" },
    },
    typography: sharedTypography,
  })
);
const RedLightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: { main: "#f3ffb9" },
      secondary: { main: "#ffffffff" },
      background: { default: "#FAF0E6", paper: "#c42021" },
      text: { primary: "#f3ffb9", secondary: "#000000ff" },
    },
    typography: sharedTypography,
  })
);

const RedDarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#333" },
      secondary: { main: "#333" },
      background: { default: "#333", paper: "#03071E" },
      text: { primary: "#DC2F02", secondary: "#F6F8D5" },
    },
    typography: sharedTypography,
  })
);
const GreenLightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: { main: "#4CAF50" },
      secondary: { main: "#81C784" },
      background: { default: "#fefae0", paper: "#344e41" },
      text: { primary: "#96c5b0", secondary: "#34252f" },
    },
    typography: sharedTypography,
  })
);

const GreenDarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#81C784" },
      secondary: { main: "#388E3C" },
      background: { default: "#1B1F1B", paper: "#2E7D32" },
      text: { primary: "#DCEDC8", secondary: "#A5D6A7" },
    },
    typography: sharedTypography,
  })
);
const OrangeLightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: { main: "#682a92" },
      secondary: { main: "#FFCC80" },
      background: { default: "#ffffe0", paper: "#fff599" },
      text: { primary: "#6e4c0d", secondary: "#6D4C41" },
    },
    typography: sharedTypography,
  })
);

const OrangeDarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#FFCC80" },
      secondary: { main: "#FFAB40" },
      background: { default: "#2C1B0F", paper: "#4E342E" },
      text: { primary: "#FFE0B2", secondary: "#FFCCBC" },
    },
    typography: sharedTypography,
  })
);
const PinkLightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: { main: "#EC407A" },
      secondary: { main: "#F8BBD0" },
      background: { default: "#FFF0F5", paper: "#ffb3c6" },
      text: { primary: "#ff0a54", secondary: "#4A148C" },
    },
    typography: sharedTypography,
  })
);

const PinkDarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#F48FB1" },
      secondary: { main: "#CE93D8" },
      background: { default: "#2A1B2E", paper: "#4A148C" },
      text: { primary: "#F8BBD0", secondary: "#F3E5F5" },
    },
    typography: sharedTypography,
  })
);

type ThemeName = "royalVelvet" | "blue" | "red" | "green" | "orange" | "pink";

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
    switch (name) {
      case "royalVelvet":
        return mode === "light" ? LightTheme : DarkTheme;
      case "blue":
        return mode === "light" ? BlueLightTheme : BlueDarkTheme;
      case "red":
        return mode === "light" ? RedLightTheme : RedDarkTheme;
      case "green":
        return mode === "light" ? GreenLightTheme : GreenDarkTheme;
      case "orange":
        return mode === "light" ? OrangeLightTheme : OrangeDarkTheme;
      case "pink":
        return mode === "light" ? PinkLightTheme : PinkDarkTheme;
      default:
        return LightTheme;
    }
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
