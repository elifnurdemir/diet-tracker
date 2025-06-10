import type { ButtonProps } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Özel renk paleti tipi genişletme
declare module "@mui/material/styles" {
  interface Palette {
    customBackground: {
      box: string;
    };
    highlightedRow: {
      main: string;
    };
  }

  interface PaletteOptions {
    customBackground?: {
      box: string;
    };
    highlightedRow?: {
      main: string;
    };
  }
}

const PimpishPeachyTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f48fb1", // pempiş
      light: "#ffc1e3", // yumuşacık pembe
      dark: "#bf5f82",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffd180", // şeftaliş turuncu
      light: "#ffe8b2",
      dark: "#caa94d",
    },
    background: {
      default: "#fff0f5", // lavanta pembesi
      paper: "#ffffff",
    },
    text: {
      primary: "#4a2c2a", // tatlı koyu kahve
      secondary: "#7b5e57",
    },
    customBackground: {
      box: "#fff3f8", // açık pembe kutucuklar
    },
    highlightedRow: {
      main: "#ffe4e1", // pastel pembe vurgulu satır
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Caveat", cursive',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#fff0f5",
          color: "#4a2c2a",
        },
        "main.MuiBox-root": {
          backgroundColor: "#fff3f8",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#4a2c2a",
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "default",
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#ffc1e3",
          color: "#4a2c2a",
          height: "64px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) => ({
          borderRadius: "30px",
          textTransform: "none",
          fontWeight: "bold",
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              backgroundColor: "#f48fb1",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#ec407a",
              },
            }),
        }),
      },
    },
  },
});
const PimpishPeachyDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f48fb1", // şeker pembe
      light: "#ffbcd6",
      dark: "#ad5d7c",
      contrastText: "#1e1e1e",
    },
    secondary: {
      main: "#ffb74d", // yumuşak şeftali turuncusu
      light: "#ffe082",
      dark: "#c88719",
    },
    background: {
      default: "#1e1e2f", // gece pembesi
      paper: "#2c2c3a", // kartlar için
    },
    text: {
      primary: "#ffe4f2", // pastel açık pembe
      secondary: "#f8bbd0", // daha açık detay yazılar
    },
    customBackground: {
      box: "#2c2233", // morumsu tatlı kutucuk
    },
    highlightedRow: {
      main: "#3d2c3e", // koyu lavanta vurgulu
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Caveat", cursive',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#1e1e2f",
          color: "#ffe4f2",
        },
        "main.MuiBox-root": {
          backgroundColor: "#2c2233",
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "default",
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#2c2c3a",
          color: "#ffe4f2",
          height: "64px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffe4f2",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) => ({
          borderRadius: "30px",
          textTransform: "none",
          fontWeight: "bold",
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              backgroundColor: "#f48fb1",
              color: "#1e1e1e",
              "&:hover": {
                backgroundColor: "#ec407a",
              },
            }),
        }),
      },
    },
  },
});

const PimpishPeachyThemeWithResponsiveFonts =
  responsiveFontSizes(PimpishPeachyTheme);
const PimpishPeachyDarkThemeWithResponsiveFonts = responsiveFontSizes(
  PimpishPeachyDarkTheme
);
export {
  PimpishPeachyThemeWithResponsiveFonts,
  PimpishPeachyDarkThemeWithResponsiveFonts,
};
