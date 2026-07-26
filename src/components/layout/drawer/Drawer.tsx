import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
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
import { PAGE_ACCENTS, type PageName } from "../../../theme";

const menuItems: {
  label: string;
  icon: React.ReactNode;
  to: string;
  page: PageName;
}[] = [
  { label: "Anasayfa", icon: <Home />, to: "/", page: "home" },
  { label: "Su İçme Takibi", icon: <WaterDrop />, to: "/water", page: "water" },
  {
    label: "Egzersiz Takibi",
    icon: <FitnessCenter />,
    to: "/gym",
    page: "gym",
  },
  { label: "Öğün Takibi", icon: <RamenDining />, to: "/meal", page: "meal" },
  {
    label: "Kilo Takibi",
    icon: <MonitorWeight />,
    to: "/weight",
    page: "weight",
  },
];

type AppDrawerProps = {
  DrawerWidth: number;
};

export const AppDrawer = ({ DrawerWidth }: AppDrawerProps) => {
  const location = useLocation();
  const theme = useTheme();

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
        <List sx={{ px: 1.5, pt: 1 }}>
          {menuItems.map(({ label, icon, to, page }) => {
            const accent = PAGE_ACCENTS[page][theme.palette.mode];
            const active = location.pathname === to;

            return (
              <ListItem key={label} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  to={to}
                  selected={active}
                  sx={{
                    py: 1.75,
                    minHeight: 60,
                    px: 2,
                    borderRadius: 999,
                    "&.Mui-selected": {
                      backgroundColor: alpha(accent, 0.16),
                      "&:hover": { backgroundColor: alpha(accent, 0.22) },
                    },
                    "&:hover": { backgroundColor: alpha(accent, 0.08) },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 44, color: accent }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: active ? "text.primary" : "text.secondary",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{ width: DrawerWidth, flexShrink: 0 }}
      slotProps={{
        paper: {
          sx: {
            width: DrawerWidth,
            backgroundColor: alpha(theme.palette.background.paper, 0.7),
            backdropFilter: "blur(14px)",
            borderRight: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
            boxSizing: "border-box",
          },
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
};
