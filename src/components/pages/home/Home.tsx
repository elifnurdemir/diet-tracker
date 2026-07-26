import { useEffect, useMemo, useState } from "react";
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
import { useGamification } from "../../../hooks/useGamification";
import { getCurrentWeekDates, toDateKey } from "../../utils/dateUtils";
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
import { QuickActions } from "./components/QuickActions";
import { CalorieProgress } from "./components/CalorieProgress";
import { BadgeShowcase } from "./components/BadgeShowcase";
import { MoodTracker } from "./components/MoodTracker";
import { CombinedActivityHeatmap } from "./components/CombinedActivityHeatmap";
import { getDashboardInsight } from "./getDashboardInsight";
import { PAGE_ACCENTS } from "../../../theme";
import { WaterIntakeDialog } from "../water-tracking/components/hero/drink-button/components/WaterIntakeDialog";
import type exerciseColors from "../../constants/exerciseColors";

type BmiChipColor = "info" | "success" | "warning" | "error";

const getBmiCategory = (
  value: number
): { label: string; color: BmiChipColor } => {
  if (value < 18.5) return { label: "Zayıf", color: "info" };
  if (value < 25) return { label: "Normal", color: "success" };
  if (value < 30) return { label: "Fazla Kilolu", color: "warning" };
  return { label: "Obez", color: "error" };
};

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
    addWaterEntry,
  } = useUser();
  const { streak, badges } = useGamification();
  const [waterDialogDate, setWaterDialogDate] = useState<string | null>(null);
  const [weightEntries] = useLocalStorage<WeightEntry[]>("weightData", []);
  const [gymEntries, setGymEntries] = useLocalStorage<GymEntry[]>(
    "gym-entries",
    []
  );
  const [mealData, setMealData] = useLocalStorage<Record<string, WeekData>>(
    STORAGE_KEY,
    {}
  );

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

  const todayWeekKey = getWeekKey(new Date());
  const weekMealData = mealData[todayWeekKey] ?? {};
  const totalMealSlots = mealDays.length * mealSlots.length;
  const completedMealSlots = Object.values(weekMealData).filter(
    (slot) => slot.checked
  ).length;
  const mealPercentage = Math.round(
    (completedMealSlots / totalMealSlots) * 100
  );

  // mealDays Pazartesi'den başlıyor (Pzt...Paz); Date.getDay() (0=Paz) bu
  // sıraya çevrilir.
  const todayLabel = mealDays[(new Date().getDay() + 6) % 7];
  const todayMealSlots = mealSlots.map((meal) => {
    const key = `${todayLabel}-${meal.key}`;
    return { key, label: meal.label, checked: !!weekMealData[key]?.checked };
  });

  const todayCheckedEntries = Object.entries(weekMealData).filter(
    ([key, slot]) => key.startsWith(`${todayLabel}-`) && slot.checked
  );
  const todayCalories = todayCheckedEntries.reduce(
    (sum, [, slot]) => sum + (slot.calories ?? 0),
    0
  );
  const todayProtein = todayCheckedEntries.reduce(
    (sum, [, slot]) => sum + (slot.protein ?? 0),
    0
  );
  const todayCarbs = todayCheckedEntries.reduce(
    (sum, [, slot]) => sum + (slot.carbs ?? 0),
    0
  );
  const todayFat = todayCheckedEntries.reduce(
    (sum, [, slot]) => sum + (slot.fat ?? 0),
    0
  );

  const todayDateKey = toDateKey(new Date());
  const exercisedToday = gymEntries.some((e) => e.date === todayDateKey);
  const insightMessage = getDashboardInsight({
    dailyIdealWater,
    todayTotalWaterAmount,
    exercisedToday,
    todayCheckedMealsCount: todayCheckedEntries.length,
    totalTodayMealSlots: mealSlots.length,
    hour: new Date().getHours(),
  });

  const handleAddExercise = (entry: {
    duration: number;
    exercise: keyof typeof exerciseColors;
  }) => {
    setGymEntries((prev) => [
      ...prev,
      {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        date: toDateKey(new Date()),
        duration: entry.duration,
        exercise: entry.exercise,
      },
    ]);
  };

  const handleToggleMeal = (key: string, checked: boolean) => {
    setMealData((prev) => ({
      ...prev,
      [todayWeekKey]: {
        ...prev[todayWeekKey],
        [key]: {
          ...prev[todayWeekKey]?.[key],
          checked,
          timestamp: new Date().toISOString(),
        },
      },
    }));
  };

  const greetingName = userData.name?.split(" ")[0];

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 220 }}>
          <Typography variant="h4" fontWeight="bold">
            {greetingName ? `Merhaba, ${greetingName}! 👋` : "Merhaba! 👋"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {insightMessage}
          </Typography>
        </Box>
        <Chip
          label={`🔥 ${streak} gün seri`}
          sx={{
            fontWeight: 700,
            backgroundColor: alpha("#ff7a3d", 0.15),
            color: theme.palette.mode === "dark" ? "#ffb27a" : "#c1531a",
          }}
        />
        {bmi !== null && (
          <Chip
            label={`VKİ: ${bmi} · ${getBmiCategory(bmi).label}`}
            color={getBmiCategory(bmi).color}
            variant="outlined"
          />
        )}
      </Box>

      <MoodTracker />

      <CalorieProgress
        consumed={todayCalories}
        goal={userData.dailyCalorieGoal}
        protein={todayProtein}
        carbs={todayCarbs}
        fat={todayFat}
      />

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          mb: 3,
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

      <BadgeShowcase badges={badges} />

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
            <Typography variant="h6" sx={{ mb: 2 }}>
              📈 Kilo Değişimi
            </Typography>
            <Chart entries={weightEntries.slice(-10)} />
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
          <CombinedActivityHeatmap
            waterData={waterHeatmapData}
            dailyIdealWater={dailyIdealWater}
            gymEntries={gymEntries}
            onCellClick={setWaterDialogDate}
          />
        </CardContent>
      </Card>

      <WaterIntakeDialog
        open={waterDialogDate !== null}
        onClose={() => setWaterDialogDate(null)}
        onSubmit={(amount) => {
          if (!waterDialogDate) return;
          addWaterEntry(amount, new Date(`${waterDialogDate}T12:00:00`));
          setWaterDialogDate(null);
        }}
      />

      <QuickActions
        onAddWater={(amount) => addWaterEntry(amount)}
        onAddExercise={handleAddExercise}
        todayMealSlots={todayMealSlots}
        onToggleMeal={handleToggleMeal}
      />
    </Box>
  );
};
