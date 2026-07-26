import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppDrawer } from "./drawer/Drawer";
import { BlobBackdrop } from "./BlobBackdrop";

export const Layout = () => {
  const DrawerWidth = 280;

  return (
    <Box>
      <AppDrawer DrawerWidth={DrawerWidth} />
      <Box
        component="main"
        sx={{
          ml: `${DrawerWidth}px`,
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <BlobBackdrop />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
