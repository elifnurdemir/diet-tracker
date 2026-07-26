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
    <Card
      sx={{
        height: "100%",
        minHeight: 176,
        boxShadow: `0 5px 0 ${alpha(accent, 0.55)}`,
      }}
    >
      <CardActionArea component={Link} to={to} sx={{ height: "100%" }}>
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: 3,
            py: "28px !important",
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1.5,
              backgroundColor: accent,
              color: "#ffffff",
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            fontWeight={700}
            sx={{ mb: 0.75 }}
          >
            {label}
          </Typography>
          <Typography variant="h4" fontWeight={800} color="text.primary">
            {value}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1, opacity: 0.85 }}
          >
            {subtext}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
