import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DrawerProfile } from "./components/DrawerProfile";
import { DrawerActions } from "./components/DrawerActions";
import { WaterDrop, Home, FitnessCenter } from "@mui/icons-material";

const menuItems = [
  {
    label: "Anasayfa",
    icon: <Home />,
    to: "/",
  },
  {
    label: "Su İçme Takibi",
    icon: <WaterDrop />,
    to: "/water",
  },
  {
    label: "Egzersiz Takibi",
    icon: <FitnessCenter />,
    to: "/gym",
  },
];

type AppDrawerProps = {
  DrawerWidth: number;
};

export const AppDrawer = ({ DrawerWidth }: AppDrawerProps) => {
  const DrawerList = (
    <Box>
      <List>
        <DrawerActions />
        <DrawerProfile />
        {menuItems.map(({ label, icon, to }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton component={Link} to={to}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
