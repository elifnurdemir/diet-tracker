import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ThemeProvider, type Theme } from "@mui/material/styles";
import { createAppTheme, type PageName, type ThemeMode } from "./theme";

// Akşam 20:00 - sabah 07:00 arası otomatik olarak koyu tema.
const getAutoMode = (): ThemeMode => {
  const hour = new Date().getHours();
  return hour >= 20 || hour < 7 ? "dark" : "light";
};

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
  const [mode, setMode] = useState<ThemeMode>(getAutoMode);
  // Kullanıcı tema düğmesine bir kez elle basınca, o oturum boyunca saat
  // bazlı otomatik geçiş devre dışı kalır — tercihi ezmez.
  const userOverrodeRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!userOverrodeRef.current) {
        setMode(getAutoMode());
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const theme = useMemo(() => createAppTheme(mode, pageName), [mode, pageName]);

  // A page only names itself (setTheme("water")) — the mode argument is
  // optional so navigating between pages never overrides the user's
  // light/dark choice. Only the explicit toggle in DrawerActions passes mode.
  const setTheme = (name: PageName, selectedMode?: ThemeMode) => {
    setPageName(name);
    if (selectedMode) {
      userOverrodeRef.current = true;
      setMode(selectedMode);
    }
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
