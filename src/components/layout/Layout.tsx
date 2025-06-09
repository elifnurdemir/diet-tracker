import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppDrawer } from "./drawer/Drawer";

export const Layout = () => {
  return (
    <Box>
      <AppDrawer />
      <Outlet />
    </Box>
  );
};
