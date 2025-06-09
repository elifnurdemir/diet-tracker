import { createContext } from "react";

type ColorModeContextType = {
  mode: string;
  toggleMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);
