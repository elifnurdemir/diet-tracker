import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { addWeeks } from "date-fns";
import { WeekNavigator } from "./WeekNavigator";
import { MealTable } from "./MealTable";
import { InfoDialog } from "./InfoDialog";
import { STORAGE_KEY, days, meals, getWeekKey } from "./constants";
import type { MealCellData, WeekData } from "./types";
import { useThemeContext } from "../../../ThemeContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export const MealTracking = () => {
  const { setTheme } = useThemeContext();

  useEffect(() => {
    setTheme("meal");
  }, []);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allData, setAllData] = useLocalStorage<Record<string, WeekData>>(
    STORAGE_KEY,
    {}
  );
  const [infoOpen, setInfoOpen] = useState<string | null>(null);

  const weekKey = getWeekKey(currentDate);
  const mealsData: WeekData = allData[weekKey] || {};

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
