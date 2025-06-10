import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppDrawer } from "./drawer/Drawer";

export const Layout = () => {
  const DrawerWidth = 240;

  return (
    <Box>
      <AppDrawer DrawerWidth={DrawerWidth} />
      <Box component="main" sx={{ ml: `${DrawerWidth}px` }}>
        <Outlet />
      </Box>
    </Box>
  );
};
