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
      background: { default: "#e5e5e5", paper: "#03071E" },
      text: { primary: "#DC2F02", secondary: "#272726ff" },
    },
    typography: sharedTypography,
  })
);
const WhiteLightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: { main: "#4d4545ff" },
      secondary: { main: "#514b4bff" },
      background: { default: "#fcf0f0ff", paper: "#fff0f0ff" },
      text: { primary: "#0f1b16ff", secondary: "#7c777aff" },
    },
    typography: sharedTypography,
  })
);

const WhiteDarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#141313ff" },
      secondary: { main: "#655d5dff" },
      background: { default: "#a8a8a8ff", paper: "#3c3c3cff" },
      text: { primary: "#dadadaff", secondary: "#ffffffff" },
    },
    typography: sharedTypography,
  })
);
const GreenLightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: { main: "#284214ff" },
      secondary: { main: "#81C784" },
      background: { default: "#f7fff6ff", paper: "#a1edc7ff" },
      text: { primary: "#0f1b16ff", secondary: "#0d0a0cff" },
    },
    typography: sharedTypography,
  })
);

const GreenDarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#9abb9cff" },
      secondary: { main: "#046009ff" },
      background: { default: "#1B1F1B", paper: "#2c441aff" },
      text: { primary: "#a4b58fff", secondary: "#e0fac7ff" },
    },
    typography: sharedTypography,
  })
);
const OrangeLightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: { main: "#f38e29ff" },
      secondary: { main: "#8d662aff" },
      background: { default: "#f9fae1ff", paper: "#ffebc6ff" },
      text: { primary: "#6e4c0d", secondary: "#372d29ff" },
    },
    typography: sharedTypography,
  })
);

const OrangeDarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#ffca0bff" },
      secondary: { main: "#FFAB40" },
      background: { default: "#2C1B0F", paper: "#4E342E" },
      text: { primary: "#e4d4bdff", secondary: "#FFCCBC" },
    },
    typography: sharedTypography,
  })
);
const PinkLightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: { main: "#3f0a1cff" },
      secondary: { main: "#f7c0d1ff" },
      background: { default: "#f8f0f2ff", paper: "#f5d2daff" },
      text: { primary: "#61115bff", secondary: "#9f4896ff" },
    },
    typography: sharedTypography,
  })
);

const PinkDarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#f04e84ff" },
      secondary: { main: "#f7e2faff" },
      background: { default: "#2b1c2fff", paper: "#4A148C" },
      text: { primary: "#F8BBD0", secondary: "#8c2671ff" },
    },
    typography: sharedTypography,
  })
);

type ThemeName =
  | "royalVelvet"
  | "blue"
  | "red"
  | "green"
  | "orange"
  | "pink"
  | "white";

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
      case "white":
        return mode === "light" ? WhiteLightTheme : WhiteDarkTheme;
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
