import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { alpha, useTheme } from "@mui/material/styles";
import { PAGE_ACCENTS } from "../../../../theme";

type Props = {
  consumed: number;
  goal?: number;
  protein: number;
  carbs: number;
  fat: number;
};

const MACRO_COLORS = {
  protein: "#5b6bd6",
  carbs: "#e0a72a",
  fat: "#e0527a",
} as const;

const MACRO_LABELS = {
  protein: "Protein",
  carbs: "Karbonhidrat",
  fat: "Yağ",
} as const;

export const CalorieProgress = ({
  consumed,
  goal,
  protein,
  carbs,
  fat,
}: Props) => {
  const theme = useTheme();
  const accent = PAGE_ACCENTS.meal[theme.palette.mode];

  const macroKcal = {
    protein: protein * 4,
    carbs: carbs * 4,
    fat: fat * 9,
  };
  const macroTotal = macroKcal.protein + macroKcal.carbs + macroKcal.fat;

  const remaining = goal !== undefined ? Math.max(0, goal - consumed) : null;
  const percentage = goal
    ? Math.min(100, Math.round((consumed / goal) * 100))
    : 0;

  const pieData =
    macroTotal > 0
      ? [
          {
            name: "Protein",
            value: macroKcal.protein,
            color: MACRO_COLORS.protein,
          },
          {
            name: "Karbonhidrat",
            value: macroKcal.carbs,
            color: MACRO_COLORS.carbs,
          },
          { name: "Yağ", value: macroKcal.fat, color: MACRO_COLORS.fat },
        ]
      : [
          {
            name: "Veri yok",
            value: 1,
            color: alpha(theme.palette.text.secondary, 0.15),
          },
        ];

  return (
    <Card
      sx={{
        mb: 4,
        minHeight: 260,
        boxShadow: `0 5px 0 ${alpha(accent, 0.55)}`,
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 3, md: 6 },
          flexWrap: "wrap",
          px: { xs: 3, md: 5 },
          py: 4,
        }}
      >
        <Box
          sx={{ position: "relative", width: 200, height: 200, flexShrink: 0 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={68}
                outerRadius={92}
                paddingAngle={macroTotal > 0 ? 3 : 0}
                stroke="none"
                isAnimationActive={false}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: 1,
              pointerEvents: "none",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {remaining !== null ? "Kalan Kalori" : "Bugünkü Kalori"}
            </Typography>
            <Typography variant="h4" fontWeight={800}>
              {remaining !== null ? remaining : consumed}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              kcal
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: "1 1 380px", maxWidth: 420, minWidth: 260 }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Bugünkü Kalori & Makrolar
          </Typography>
          {goal ? (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              {consumed} / {goal} kcal tüketildi (%{percentage})
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              Günlük kalori hedefi belirlemek için profilini düzenle.
            </Typography>
          )}

          {(Object.keys(MACRO_COLORS) as (keyof typeof MACRO_COLORS)[]).map(
            (key) => {
              const grams = { protein, carbs, fat }[key];
              const kcal = macroKcal[key];
              const pct =
                macroTotal > 0 ? Math.round((kcal / macroTotal) * 100) : 0;
              const color = MACRO_COLORS[key];

              return (
                <Box key={key} sx={{ mb: 1.75 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          backgroundColor: color,
                          display: "inline-block",
                        }}
                      />
                      {MACRO_LABELS[key]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {grams}g · %{pct}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={pct}
                    sx={{
                      width: "calc(100% - 16px)",
                      height: 7,
                      borderRadius: 999,
                      backgroundColor: alpha(color, 0.15),
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: color,
                        borderRadius: 999,
                      },
                    }}
                  />
                </Box>
              );
            }
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
