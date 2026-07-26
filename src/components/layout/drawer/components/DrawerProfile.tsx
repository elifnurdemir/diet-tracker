import {
  Avatar,
  Box,
  Divider,
  LinearProgress,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useUser } from "../../../../provider/UserProvider";
import { useGamification } from "../../../../hooks/useGamification";
import catImage from "../../../../assets/cat.jpg";

export const DrawerProfile = () => {
  const { userData } = useUser();
  const { level, xpIntoLevel, xpForNextLevel } = useGamification();
  const theme = useTheme();
  const accent = theme.palette.primary.main;

  return (
    <>
      <ListItem sx={{ py: 0, px: 0 }}>
        <Stack flex={1}>
          <Stack spacing={1.5} alignItems="center" sx={{ pt: 4, pb: 3, px: 2 }}>
            <Avatar
              alt={userData.name}
              src={userData.image ?? catImage}
              sx={{
                width: 104,
                height: 104,
                flexShrink: 0,
                borderRadius: "50%",
              }}
            />
            <Box sx={{ textAlign: "center", minWidth: 0, maxWidth: "100%" }}>
              <Typography variant="h6" noWrap>
                {userData.name || "ad"}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {userData.gender || "cinsiyet"}, {userData.age ?? "yaş"}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ px: 2.5, pt: 0.5, pb: 2.5 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ mb: 0.75 }}
            >
              <Typography
                variant="caption"
                fontWeight={800}
                color="text.primary"
              >
                Seviye {level} 🐣
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {xpIntoLevel}/{xpForNextLevel} XP
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={(xpIntoLevel / xpForNextLevel) * 100}
              sx={{
                height: 8,
                borderRadius: 999,
                backgroundColor: alpha(accent, 0.15),
                "& .MuiLinearProgress-bar": {
                  backgroundColor: accent,
                  borderRadius: 999,
                },
              }}
            />
          </Box>

          <Divider sx={{ mx: 2 }} />

          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            sx={{
              mx: 2,
              my: 2,
              borderRadius: 2.5,
              border: "1px solid",
              borderColor: alpha(theme.palette.text.primary, 0.08),
              backgroundColor: alpha(theme.palette.text.primary, 0.03),
            }}
          >
            <Stack flex={1} alignItems="center" sx={{ py: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={700}
              >
                Kilo
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {userData.kg || "—"}
              </Typography>
            </Stack>

            <Divider orientation="vertical" flexItem />

            <Stack flex={1} alignItems="center" sx={{ py: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={700}
              >
                Boy
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {userData.height || "—"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </ListItem>
    </>
  );
};
