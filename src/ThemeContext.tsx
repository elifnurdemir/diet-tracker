import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  RoyalVelvetLightThemeWithResponsiveFonts,
  RoyalVelvetDarkThemeWithResponsiveFonts,
} from "./theme";
import { responsiveFontSizes, createTheme } from "@mui/material/styles";

const BlueLightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: { main: "#74BDD3" },
      secondary: { main: "#A6D9E7" },
      background: {
        default: "#EAF4FB",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#2D3A3A",
        secondary: "#5F7775",
      },
    },
  })
);

const BlueDarkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#F6F8D5" }, // canlı su mavisi
      secondary: { main: "#4F959D" }, // açık su buğusu
      background: {
        default: "#09122C", // en koyu arka plan
        paper: "#0F4C75", // kart/diyalog arka planı
      },
      text: {
        primary: "#BBE1FA", // okunabilir açık mavi
        secondary: "#F6F8D5", // detay vurgular
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
      primary: { main: "#0C005A" },
      background: { default: "#222831" },
      text: { primary: "#FF5200" },
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
  currentTheme: RoyalVelvetLightThemeWithResponsiveFonts,
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
      return mode === "light"
        ? RoyalVelvetLightThemeWithResponsiveFonts
        : RoyalVelvetDarkThemeWithResponsiveFonts;
    if (name === "blue")
      return mode === "light" ? BlueLightTheme : BlueDarkTheme;
    if (name === "red") return mode === "light" ? RedLightTheme : RedDarkTheme;
    return RoyalVelvetLightThemeWithResponsiveFonts;
  };

  const theme = getTheme(themeName, mode);

  const setTheme = (
    name: ThemeName,
    selectedMode: Mode = theme.palette.mode
  ) => {
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
