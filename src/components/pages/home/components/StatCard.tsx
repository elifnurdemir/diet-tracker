import type { ReactNode } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { PAGE_ACCENTS, type PageName } from "../../../../theme";

type StatCardProps = {
  to: string;
  page: PageName;
  icon: ReactNode;
  label: string;
  value: string;
  subtext: string;
};

export const StatCard = ({
  to,
  page,
  icon,
  label,
  value,
  subtext,
}: StatCardProps) => {
  const theme = useTheme();
  const accent = PAGE_ACCENTS[page][theme.palette.mode];

  return (
    <Card sx={{ height: "100%", boxShadow: `0 5px 0 ${alpha(accent, 0.55)}` }}>
      <CardActionArea component={Link} to={to} sx={{ height: "100%" }}>
        <CardContent>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
              backgroundColor: accent,
              color: "#ffffff",
            }}
          >
            {icon}
          </Box>
          <Typography variant="body2" color="text.secondary" fontWeight={700}>
            {label}
          </Typography>
          <Typography variant="h5" fontWeight={800} color="text.primary">
            {value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {subtext}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
