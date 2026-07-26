import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, type Theme } from "@mui/material/styles";
import { createAppTheme, type PageName, type ThemeMode } from "./theme";

type ThemeContextType = {
  currentTheme: Theme;
  currentThemeName: PageName;
  currentMode: ThemeMode;
  setTheme: (pageName: PageName, mode?: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: createAppTheme("light", "home"),
  currentThemeName: "home",
  currentMode: "light",
  setTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pageName, setPageName] = useState<PageName>("home");
  const [mode, setMode] = useState<ThemeMode>("light");

  const theme = useMemo(() => createAppTheme(mode, pageName), [mode, pageName]);

  // A page only names itself (setTheme("water")) — the mode argument is
  // optional so navigating between pages never overrides the user's
  // light/dark choice. Only the explicit toggle in DrawerActions passes mode.
  const setTheme = (name: PageName, selectedMode?: ThemeMode) => {
    setPageName(name);
    if (selectedMode) setMode(selectedMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: theme,
        currentThemeName: pageName,
        currentMode: mode,
        setTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
