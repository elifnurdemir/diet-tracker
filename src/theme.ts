import type { ButtonProps } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const font = '"Cormorant Garamond", "Georgia", serif';

const RoyalVelvetDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5B2C6F",
      light: "#7D3C98",
      dark: "#3A1A53",
      contrastText: "#E6D0F0",
    },
    background: {
      default: "#2E1A3E",
      paper: "#3B2645",
    },
    text: {
      primary: "#E6D0F0",
      secondary: "#B497C7",
    },
  },
  typography: {
    fontFamily: font,
    h1: { fontWeight: 700, fontSize: "2.5rem" },
    h2: { fontWeight: 600, fontSize: "1.8rem" },
    body1: { fontWeight: 400, fontSize: "1.1rem" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#2E1A3E",
          color: "#E6D0F0",
          fontSmooth: "antialiased",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#3B2645",
          color: "#E6D0F0",
          borderBottom: "1px solid #59306E",
          boxShadow: "none",
          height: "64px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) => ({
          borderRadius: "12px",
          padding: "8px 20px",
          fontWeight: 600,
          textTransform: "none",
          transition: "background-color 0.3s ease",
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              backgroundColor: "#5B2C6F",
              color: "#E6D0F0",
              "&:hover": {
                backgroundColor: "#4A2164",
              },
            }),
          ...(ownerState.variant === "outlined" &&
            ownerState.color === "primary" && {
              borderColor: "#7D3C98",
              color: "#B497C7",
              "&:hover": {
                backgroundColor: "#3A1A53",
                borderColor: "#7D3C98",
                color: "#E6D0F0",
              },
            }),
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          backgroundColor: "#3B2645",
          boxShadow: "0 6px 12px rgba(91,44,111,0.6)",
        },
      },
    },
  },
});

const RoyalVelvetLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7D3C98",
      light: "#B388D8",
      dark: "#5B2C6F",
      contrastText: "#3B2645",
    },
    background: {
      default: "#F4F0FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#3B2645",
      secondary: "#7D6A9B",
    },
  },
  typography: {
    fontFamily: font,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F4F0FA",
          color: "#3B2645",
          fontSmooth: "antialiased",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#5B2C6F",
          borderBottom: "1px solid #B388D8",
          boxShadow: "none",
          height: "64px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) => ({
          borderRadius: "12px",
          padding: "8px 20px",
          fontWeight: 600,
          textTransform: "none",
          transition: "background-color 0.3s ease",
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              backgroundColor: "#7D3C98",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#5B2C6F",
              },
            }),
          ...(ownerState.variant === "outlined" &&
            ownerState.color === "primary" && {
              borderColor: "#B388D8",
              color: "#7D3C98",
              "&:hover": {
                backgroundColor: "#F4F0FA",
                borderColor: "#5B2C6F",
                color: "#5B2C6F",
              },
            }),
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 4px 8px rgba(125, 60, 152, 0.2)",
        },
      },
    },
  },
});

const RoyalVelvetDarkThemeWithResponsiveFonts =
  responsiveFontSizes(RoyalVelvetDarkTheme);
const RoyalVelvetLightThemeWithResponsiveFonts = responsiveFontSizes(
  RoyalVelvetLightTheme
);

export {
  RoyalVelvetDarkThemeWithResponsiveFonts,
  RoyalVelvetLightThemeWithResponsiveFonts,
};
