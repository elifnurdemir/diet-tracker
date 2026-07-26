import { useMemo } from "react";
import { useUser } from "../provider/UserProvider";
import { useLocalStorage } from "./useLocalStorage";
import { toDateKey } from "../components/utils/dateUtils";
import type { WeightEntry } from "../components/pages/weight-tracking/types";
import type { GymEntry } from "../components/types/GymEntry";
import {
  STORAGE_KEY as MEAL_STORAGE_KEY,
  days as mealDays,
  getWeekKey,
} from "../components/pages/meal-tracking/constants";
import type { WeekData } from "../components/pages/meal-tracking/types";

const XP_PER_WATER_ENTRY = 10;
const XP_PER_GYM_ENTRY = 25;
const XP_PER_CHECKED_MEAL = 15;
const XP_PER_WEIGHT_ENTRY = 20;
const XP_PER_LEVEL = 100;

export type Badge = {
  id: string;
  label: string;
  icon: string;
  earned: boolean;
};

const dayLabelFor = (date: Date) => mealDays[(date.getDay() + 6) % 7];

export function useGamification() {
  const { userData, dailyIdealWater } = useUser();
  const [gymEntries] = useLocalStorage<GymEntry[]>("gym-entries", []);
  const [weightEntries] = useLocalStorage<WeightEntry[]>("weightData", []);
  const [mealData] = useLocalStorage<Record<string, WeekData>>(
    MEAL_STORAGE_KEY,
    {}
  );

  const waterEntries = useMemo(
    () => userData.waterEntries ?? [],
    [userData.waterEntries]
  );

  const waterByDate = useMemo(() => {
    const map = new Map<string, number>();
    for (const entry of waterEntries) {
      const key = toDateKey(new Date(entry.date));
      map.set(key, (map.get(key) ?? 0) + entry.amount);
    }
    return map;
  }, [waterEntries]);

  const totalCheckedMeals = useMemo(
    () =>
      Object.values(mealData).reduce(
        (sum, week) =>
          sum + Object.values(week).filter((slot) => slot.checked).length,
        0
      ),
    [mealData]
  );

  const isDayActive = (date: Date) => {
    const dateKey = toDateKey(date);
    const waterThatDay = waterByDate.get(dateKey) ?? 0;
    const waterGoalMet = dailyIdealWater > 0 && waterThatDay >= dailyIdealWater;
    const exercised = gymEntries.some((e) => e.date === dateKey);

    const weekKey = getWeekKey(date);
    const dayLabel = dayLabelFor(date);
    const weekData = mealData[weekKey] ?? {};
    const mealChecked = Object.entries(weekData).some(
      ([key, slot]) => key.startsWith(`${dayLabel}-`) && slot.checked
    );

    return waterGoalMet || exercised || mealChecked;
  };

  const streak = useMemo(() => {
    let count = 0;
    for (let i = 0; i < 365; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      if (isDayActive(d)) {
        count++;
      } else if (i > 0) {
        break;
      }
      // i === 0 (today) inactive yet doesn't break the streak — the day isn't over.
    }
    return count;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waterByDate, gymEntries, mealData, dailyIdealWater]);

  const xp =
    waterEntries.length * XP_PER_WATER_ENTRY +
    gymEntries.length * XP_PER_GYM_ENTRY +
    totalCheckedMeals * XP_PER_CHECKED_MEAL +
    weightEntries.length * XP_PER_WEIGHT_ENTRY;

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = xp % XP_PER_LEVEL;

  const badges: Badge[] = [
    {
      id: "first-water",
      label: "İlk Yudum",
      icon: "💧",
      earned: waterEntries.length >= 1,
    },
    {
      id: "week-streak",
      label: "7 Günlük Seri",
      icon: "🔥",
      earned: streak >= 7,
    },
    {
      id: "ten-workouts",
      label: "10 Antrenman",
      icon: "🏋️",
      earned: gymEntries.length >= 10,
    },
    {
      id: "first-weight",
      label: "İlk Kilo Kaydı",
      icon: "⚖️",
      earned: weightEntries.length >= 1,
    },
    {
      id: "meal-master",
      label: "Öğün Ustası",
      icon: "🍽️",
      earned: totalCheckedMeals >= 20,
    },
    {
      id: "level-5",
      label: "Seviye 5",
      icon: "⭐",
      earned: level >= 5,
    },
  ];

  return {
    xp,
    level,
    xpIntoLevel,
    xpForNextLevel: XP_PER_LEVEL,
    streak,
    badges,
  };
}
