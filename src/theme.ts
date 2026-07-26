// theme.ts
import {
  createTheme,
  responsiveFontSizes,
  alpha,
  darken,
} from "@mui/material/styles";
import type { ButtonProps } from "@mui/material/Button";

// "Bulut Şekeri" — candy accents on a soft glass surface. Each page gets its
// own accent color; background/surface/ink stay the same across pages so
// navigating between pages doesn't reset the whole page's look, only its accent.
export const PAGE_ACCENTS = {
  home: { light: "#e0529b", dark: "#ee72b3" },
  water: { light: "#2a9bd6", dark: "#5cb8ea" },
  weight: { light: "#ff8a3d", dark: "#ffa564" },
  gym: { light: "#1fc491", dark: "#4fdcae" },
  meal: { light: "#7a4ae0", dark: "#9c78ef" },
} as const;

export type PageName = keyof typeof PAGE_ACCENTS;
export type ThemeMode = "light" | "dark";

const neutrals: Record<
  ThemeMode,
  {
    background: string;
    paper: string;
    textPrimary: string;
    textSecondary: string;
  }
> = {
  light: {
    background: "#fff2f8",
    paper: "#ffffff",
    textPrimary: "#241226",
    textSecondary: "#7c5e7f",
  },
  dark: {
    background: "#1a1130",
    paper: "#251a3f",
    textPrimary: "#f7edff",
    textSecondary: "#b6a3d6",
  },
};

// Quicksand first (loaded in index.html, casual + universally available),
// Segoe UI Rounded as a nicer stand-in on Windows, ui-rounded as a hint on
// browsers that support the generic family, plain sans-serif as the floor.
const baseFontFamily =
  '"Quicksand", "Segoe UI Rounded", ui-rounded, sans-serif';

export const createAppTheme = (mode: ThemeMode, page: PageName = "home") => {
  const accent = PAGE_ACCENTS[page][mode];
  const n = neutrals[mode];

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: accent, contrastText: "#ffffff" },
      secondary: { main: n.textSecondary },
      background: { default: n.background, paper: n.paper },
      text: { primary: n.textPrimary, secondary: n.textSecondary },
    },
    shape: { borderRadius: 16 },
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
            backgroundColor: n.background,
            color: n.textPrimary,
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({
            ownerState,
          }: {
            ownerState: Pick<ButtonProps, "variant" | "color">;
          }) => ({
            borderRadius: 999,
            padding: "9px 22px",
            fontWeight: 700,
            textTransform: "none",
            transition: "background-color 0.2s ease, transform 0.15s ease",
            ...(ownerState.variant === "contained" &&
              ownerState.color === "primary" && {
                backgroundColor: accent,
                color: "#ffffff",
                "&:hover": { backgroundColor: darken(accent, 0.12) },
              }),
            ...(ownerState.variant === "outlined" &&
              ownerState.color === "primary" && {
                borderColor: accent,
                color: accent,
                "&:hover": {
                  backgroundColor: alpha(accent, 0.1),
                  borderColor: accent,
                },
              }),
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            border: "none",
            backgroundColor: alpha(n.paper, 0.86),
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: `0 5px 0 ${alpha(accent, 0.55)}`,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 999, fontWeight: 700 },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
