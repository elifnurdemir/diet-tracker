// theme.ts
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
const baseFontFamily = '"Quicksand", Georgia, sans-serif';
const colorPalette = {
  dark: {
    primaryMain: "#353535",
    primaryContrastText: "#495057",
    backgroundDefault: "#343a40",
    textPrimary: "#ffffffff",
  },
  light: {
    primaryMain: "#8367c7",
    primaryContrastText: "#ffffffff",
    backgroundDefault: "#edf6f9",
    textPrimary: "#22223b",
  },
};
const createAppTheme = (mode: "dark" | "light") => {
  const colors = mode === "dark" ? colorPalette.dark : colorPalette.light;

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primaryMain,
        contrastText: colors.primaryContrastText,
      },
      background: {
        default: colors.backgroundDefault,
      },
      text: {
        primary: colors.textPrimary,
      },
    },
    typography: {
      fontFamily: baseFontFamily,
      h1: { fontWeight: 700, fontSize: "3rem" },
      h2: { fontWeight: 400, fontSize: "1rem" },
      body1: { fontWeight: 600, fontSize: "1rem" },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: colors.backgroundDefault,
            color: colors.textPrimary,
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }: { ownerState: any }) => ({
            borderRadius: 8,
            padding: "8px 20px",
            fontWeight: 600,
            textTransform: "none",
            transition: "background-color 0.3s ease",
            ...(ownerState.variant === "contained" &&
              ownerState.color === "primary" && {
                backgroundColor: colors.primaryMain,
                color: colors.primaryContrastText,
                "&:hover": {
                  backgroundColor: mode === "dark" ? "#FCA311" : "#8367c7",
                },
              }),
            ...(ownerState.variant === "outlined" &&
              ownerState.color === "primary" && {
                borderColor: mode === "dark" ? "#FCA311" : "#8367c7",
                color: mode === "dark" ? "#FCA311" : colors.primaryMain,
                "&:hover": {
                  backgroundColor: mode === "dark" ? "#FCA311" : "#8367c7",
                  borderColor: mode === "dark" ? "#FCA311" : "#8367c7",
                  color: colors.primaryContrastText,
                },
              }),
          }),
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};

const DarkTheme = createAppTheme("dark");
const LightTheme = createAppTheme("light");

export { createAppTheme, DarkTheme, LightTheme };
