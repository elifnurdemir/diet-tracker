import { useContext, useState } from "react";
import { ColorModeContext } from "../../../context/ColorModeContext";
import {
  IconButton,
  Box,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Avatar,
  Typography,
  Stack,
  ListItemText,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { EditDialog } from "./components/EditDialog";

export function AppDrawer() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const userData = JSON.parse(localStorage.getItem("Profile") ?? "{}");

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={colorMode.toggleMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
          <IconButton onClick={() => setDialogOpen(true)}>
            <EditIcon />
          </IconButton>
          <EditDialog
            open={dialogOpen}
            handleClose={() => setDialogOpen(false)}
          />
        </ListItem>
        <ListItem>
          <Stack spacing={1} direction={"row"} alignItems={"center"}>
            <Avatar
              alt={userData.name}
              src={userData.image ?? userData.name}
              sx={{ width: 64, height: 64 }}
            />
            <Box>
              <Typography variant="h6">{userData.name}</Typography>
              <Typography variant="body1">
                {userData.gender} , {userData.age}
              </Typography>
            </Box>
          </Stack>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Anasayfa" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return <Drawer variant="permanent">{DrawerList}</Drawer>;
}
