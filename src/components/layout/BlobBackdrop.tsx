import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Soft blurred color blobs behind the page content — tinted with whatever
// page's accent is currently active, so it re-colors itself on navigation.
const BLOBS = [
  { top: "-10%", left: "-8%", size: 340 },
  { bottom: "-14%", right: "-10%", size: 380 },
  { top: "30%", left: "58%", size: 220 },
];

export const BlobBackdrop = () => {
  const theme = useTheme();
  const accent = theme.palette.primary.main;

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {BLOBS.map((blob, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            width: blob.size,
            height: blob.size,
            borderRadius: "50%",
            backgroundColor: accent,
            opacity: theme.palette.mode === "dark" ? 0.3 : 0.22,
            filter: "blur(70px)",
            transition: "background-color 0.3s ease",
          }}
        />
      ))}
    </Box>
  );
};
