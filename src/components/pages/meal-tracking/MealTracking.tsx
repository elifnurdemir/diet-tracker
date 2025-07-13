import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getISOWeek, addWeeks } from "date-fns";
import { WeekNavigator } from "./WeekNavigator";
import { MealTable } from "./MealTable";
import { InfoDialog } from "./InfoDialog";
import { STORAGE_KEY, days, meals } from "./constants";
import type { MealCellData, WeekData } from "./types";

const getWeekKey = (date: Date) =>
  `${date.getFullYear()}-${String(getISOWeek(date)).padStart(2, "0")}`;

export const MealTracking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allData, setAllData] = useState<Record<string, WeekData>>({});
  const [infoOpen, setInfoOpen] = useState<string | null>(null);

  const weekKey = getWeekKey(currentDate);
  const mealsData: WeekData = allData[weekKey] || {};

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setAllData(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
  }, [allData]);

  const updateMeal = (key: string, changes: Partial<MealCellData>) => {
    setAllData((prev) => ({
      ...prev,
      [weekKey]: {
        ...prev[weekKey],
        [key]: {
          ...prev[weekKey]?.[key],
          ...changes,
          timestamp: new Date().toISOString(),
        },
      },
    }));
  };

  const goWeek = (n: number) => setCurrentDate((prev) => addWeeks(prev, n));

  return (
    <Box p={2} sx={{ overflowX: "auto" }}>
      <WeekNavigator currentDate={currentDate} goWeek={goWeek} />
      <MealTable
        days={days}
        meals={meals}
        mealsData={mealsData}
        currentDate={currentDate}
        updateMeal={updateMeal}
        setInfoOpen={setInfoOpen}
      />
      <InfoDialog openKey={infoOpen} onClose={() => setInfoOpen(null)} />
    </Box>
  );
};
