import { ThemeProvider } from "@mui/material/styles";
import React, {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  PimpishPeachyDarkThemeWithResponsiveFonts as DarkTheme,
  PimpishPeachyThemeWithResponsiveFonts as LightTheme,
} from "../theme";
import { ColorModeContext } from "../context/ColorModeContext";

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage ?? systemPreference
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const toggleColorMode = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const colorModeValue = useMemo(
    () => ({
      toggleMode: toggleColorMode,
      mode,
    }),
    [mode, toggleColorMode]
  );

  return (
    <ColorModeContext.Provider value={colorModeValue}>
      <ThemeProvider theme={mode === "light" ? LightTheme : DarkTheme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
