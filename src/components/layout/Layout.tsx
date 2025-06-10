import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppDrawer } from "./drawer/Drawer";

export const Layout = () => {
  const DrawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <AppDrawer DrawerWidth={DrawerWidth} />
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
};
