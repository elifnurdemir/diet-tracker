import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppDrawer } from "./drawer/Drawer";

export const Layout = () => {
  const DrawerWidth = 260;

  return (
    <Box>
      <AppDrawer DrawerWidth={DrawerWidth} />
      <Box
        component="main"
        sx={{
          ml: `${DrawerWidth}px`,
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
