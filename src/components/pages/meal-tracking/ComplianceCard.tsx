import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { PAGE_ACCENTS } from "../../../theme";

type Props = {
  compliance: number | null;
  matchedCount: number;
  totalPrescribed: number;
};

export const ComplianceCard = ({
  compliance,
  matchedCount,
  totalPrescribed,
}: Props) => {
  const theme = useTheme();
  const accent = PAGE_ACCENTS.meal[theme.palette.mode];

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Bu Hafta Diyet Uyumu
        </Typography>
        {compliance === null ? (
          <Typography color="text.secondary" variant="body2">
            Henüz bir diyet listesi eklemedin. "Diyet Listem" sekmesinden
            haftalık önerilen öğünlerini gir, uyumun burada görünsün.
          </Typography>
        ) : (
          <>
            <Box
              sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 1 }}
            >
              <Typography variant="h4" fontWeight={800} sx={{ color: accent }}>
                %{compliance}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {matchedCount}/{totalPrescribed} önerilen öğün yapıldı
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={compliance}
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
          </>
        )}
      </CardContent>
    </Card>
  );
};
