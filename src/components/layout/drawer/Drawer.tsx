import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { DrawerProfile } from "./components/DrawerProfile";
import { DrawerActions } from "./components/DrawerActions";
import {
  WaterDrop,
  Home,
  FitnessCenter,
  RamenDining,
  MonitorWeight,
} from "@mui/icons-material";

const menuItems = [
  { label: "Anasayfa", icon: <Home />, to: "/" },
  { label: "Su İçme Takibi", icon: <WaterDrop />, to: "/water" },
  { label: "Egzersiz Takibi", icon: <FitnessCenter />, to: "/gym" },
  { label: "Öğün Takibi", icon: <RamenDining />, to: "/meal" },
  { label: "Kilo Takibi", icon: <MonitorWeight />, to: "/weight" },
];

type AppDrawerProps = {
  DrawerWidth: number;
};

export const AppDrawer = ({ DrawerWidth }: AppDrawerProps) => {
  const location = useLocation();

  const DrawerList = (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="space-between"
    >
      <Box>
        <Box mb={2}>
          <DrawerActions />
          <DrawerProfile />
        </Box>
        <List>
          {menuItems.map(({ label, icon, to }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton
                component={Link}
                to={to}
                selected={location.pathname === to}
                sx={{
                  py: 2,
                  minHeight: 70,
                  px: 2,
                }}
              >
                <ListItemIcon sx={{ minWidth: 50 }}>{icon}</ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: "1.1rem", // yazı boyutu büyütülür
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DrawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DrawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
};
