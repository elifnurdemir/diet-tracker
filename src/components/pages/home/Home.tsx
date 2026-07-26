import { useEffect, useMemo } from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
  WaterDrop,
  MonitorWeight,
  FitnessCenter,
  RamenDining,
} from "@mui/icons-material";
import { useThemeContext } from "../../../ThemeContext";
import { useUser } from "../../../provider/UserProvider";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { getCurrentWeekDates } from "../../utils/dateUtils";
import { ActivityHeatmap } from "../../utils/ActivityHeatmap";
import Chart from "../weight-tracking/Chart";
import WeeklyChart from "../../Calendar/WeeklyChart";
import type { WeightEntry } from "../weight-tracking/types";
import type { GymEntry } from "../../types/GymEntry";
import {
  STORAGE_KEY,
  days as mealDays,
  meals as mealSlots,
  getWeekKey,
} from "../meal-tracking/constants";
import type { WeekData } from "../meal-tracking/types";
import { StatCard } from "./components/StatCard";
import { PAGE_ACCENTS } from "../../../theme";

export const Home = () => {
  const { setTheme } = useThemeContext();
  const theme = useTheme();

  useEffect(() => {
    setTheme("home");
  }, []);

  const {
    userData,
    bmi,
    dailyIdealWater,
    todayTotalWaterAmount,
    waterHeatmapData,
  } = useUser();
  const [weightEntries] = useLocalStorage<WeightEntry[]>("weightData", []);
  const [gymEntries] = useLocalStorage<GymEntry[]>("gym-entries", []);
  const [mealData] = useLocalStorage<Record<string, WeekData>>(STORAGE_KEY, {});

  const weekDates = useMemo(() => getCurrentWeekDates(), []);

  const waterPercentage = dailyIdealWater
    ? Math.round((todayTotalWaterAmount / dailyIdealWater) * 100)
    : 0;

  const latestWeight = weightEntries[weightEntries.length - 1];
  const previousWeight = weightEntries[weightEntries.length - 2];
  const weightDelta =
    latestWeight && previousWeight
      ? Number((latestWeight.weight - previousWeight.weight).toFixed(1))
      : null;

  const weekGymEntries = useMemo(
    () => gymEntries.filter((entry) => weekDates.includes(entry.date)),
    [gymEntries, weekDates]
  );
  const weeklyGymMinutes = weekGymEntries.reduce(
    (sum, entry) => sum + entry.duration,
    0
  );

  const weekMealData = mealData[getWeekKey(new Date())] ?? {};
  const totalMealSlots = mealDays.length * mealSlots.length;
  const completedMealSlots = Object.values(weekMealData).filter(
    (slot) => slot.checked
  ).length;
  const mealPercentage = Math.round(
    (completedMealSlots / totalMealSlots) * 100
  );

  const greetingName = userData.name?.split(" ")[0];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {greetingName ? `Merhaba, ${greetingName}! 👋` : "Merhaba! 👋"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            İşte bugünkü genel durumun.
          </Typography>
        </Box>
        {bmi !== null && (
          <Chip label={`VKİ: ${bmi}`} color="primary" variant="outlined" />
        )}
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          mb: 4,
        }}
      >
        <StatCard
          to="/water"
          page="water"
          icon={<WaterDrop />}
          label="Bugünkü Su"
          value={`${todayTotalWaterAmount} ml`}
          subtext={
            dailyIdealWater
              ? `%${waterPercentage} · hedef ${dailyIdealWater}ml`
              : "Hedef için profilini tamamla"
          }
        />
        <StatCard
          to="/weight"
          page="weight"
          icon={<MonitorWeight />}
          label="Güncel Kilo"
          value={latestWeight ? `${latestWeight.weight} kg` : "Kayıt yok"}
          subtext={
            weightDelta === null
              ? "Önceki girişle karşılaştırma yok"
              : `${weightDelta > 0 ? "+" : ""}${weightDelta} kg (önceki girişe göre)`
          }
        />
        <StatCard
          to="/gym"
          page="gym"
          icon={<FitnessCenter />}
          label="Bu Hafta Egzersiz"
          value={`${weeklyGymMinutes} dk`}
          subtext={`${weekGymEntries.length} antrenman`}
        />
        <StatCard
          to="/meal"
          page="meal"
          icon={<RamenDining />}
          label="Bu Hafta Öğün Planı"
          value={`%${mealPercentage}`}
          subtext={`${completedMealSlots}/${totalMealSlots} öğün tamamlandı`}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          mb: 3,
        }}
      >
        <Card
          sx={{
            boxShadow: `0 5px 0 ${alpha(PAGE_ACCENTS.weight[theme.palette.mode], 0.55)}`,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📈 Kilo Değişimi
            </Typography>
            {weightEntries.length > 0 ? (
              <Chart entries={weightEntries.slice(-10)} />
            ) : (
              <Typography color="text.secondary">
                Henüz kilo girişi yok.
              </Typography>
            )}
          </CardContent>
        </Card>

        <Card
          sx={{
            boxShadow: `0 5px 0 ${alpha(PAGE_ACCENTS.gym[theme.palette.mode], 0.55)}`,
          }}
        >
          <CardContent>
            {gymEntries.length > 0 ? (
              <WeeklyChart entries={gymEntries} />
            ) : (
              <Typography color="text.secondary">
                Henüz egzersiz kaydı yok.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      <Card
        sx={{
          boxShadow: `0 5px 0 ${alpha(PAGE_ACCENTS.water[theme.palette.mode], 0.55)}`,
        }}
      >
        <CardContent>
          <ActivityHeatmap
            data={waterHeatmapData}
            goal={dailyIdealWater || 2000}
            title="Su Takibi Geçmişi"
            unit="ml"
          />
        </CardContent>
      </Card>
    </Box>
  );
};
