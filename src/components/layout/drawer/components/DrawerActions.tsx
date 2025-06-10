import { useContext, useState } from "react";
import { ColorModeContext } from "../../../../context/ColorModeContext";
import { IconButton, ListItem, useTheme } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import EditIcon from "@mui/icons-material/Edit";
import { EditDialog } from "./EditDialog";

export const DrawerActions = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  return (
    <>
      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={colorMode.toggleMode}>
          {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <IconButton onClick={() => setDialogOpen(true)}>
          <EditIcon />
        </IconButton>
      </ListItem>

      <EditDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} />
    </>
  );
};
