import { Box, Card, CardContent, Tooltip, Typography } from "@mui/material";
import type { Badge } from "../../../../hooks/useGamification";

type Props = { badges: Badge[] };

export const BadgeShowcase = ({ badges }: Props) => (
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        Başarılar
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
        {badges.map((badge) => (
          <Tooltip
            key={badge.id}
            title={
              badge.earned ? badge.label : `${badge.label} (henüz kazanılmadı)`
            }
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 76,
                opacity: badge.earned ? 1 : 0.35,
                filter: badge.earned ? "none" : "grayscale(1)",
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                {badge.icon}
              </Box>
              <Typography
                variant="caption"
                textAlign="center"
                color="text.secondary"
                sx={{ mt: 0.5, lineHeight: 1.1 }}
              >
                {badge.label}
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </CardContent>
  </Card>
);
