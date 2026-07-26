import { useMemo } from "react";
import { useUser } from "../provider/UserProvider";
import { useLocalStorage } from "./useLocalStorage";
import { toDateKey } from "../components/utils/dateUtils";
import type { WeightEntry } from "../components/pages/weight-tracking/types";
import type { GymEntry } from "../components/types/GymEntry";
import {
  STORAGE_KEY as MEAL_STORAGE_KEY,
  days as mealDays,
  meals as mealSlots,
  getWeekKey,
} from "../components/pages/meal-tracking/constants";
import type { WeekData } from "../components/pages/meal-tracking/types";

const XP_PER_WATER_ENTRY = 10;
const XP_PER_GYM_ENTRY = 25;
const XP_PER_CHECKED_MEAL = 15;
const XP_PER_WEIGHT_ENTRY = 20;
const XP_PER_LEVEL = 100;

export type BadgeCategory =
  "su" | "egzersiz" | "kilo" | "ogun" | "seri" | "seviye" | "ozel";

export type Badge = {
  id: string;
  label: string;
  icon: string;
  category: BadgeCategory;
  earned: boolean;
};

const dayLabelFor = (date: Date) => mealDays[(date.getDay() + 6) % 7];

// GymEntry/weightEntry tarihleri toDateKey ile üretilen "YYYY-MM-DD" yerel
// tarih anahtarları — new Date(str) ile ayrıştırmak UTC'ye çevirip günü
// kaydırabilir, bu yüzden parçalar elle yerel tarihe çevriliyor.
const parseDateKey = (key: string): Date => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
};

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

  const daysWithWaterGoalMet =
    dailyIdealWater > 0
      ? [...waterByDate.values()].filter((v) => v >= dailyIdealWater).length
      : 0;

  const loggedLateNightWater = waterEntries.some((e) => {
    const hour = new Date(e.date).getHours();
    return hour >= 23 || hour < 5;
  });

  const totalExerciseMinutes = gymEntries.reduce(
    (sum, e) => sum + e.duration,
    0
  );
  const distinctExerciseTypes = new Set(gymEntries.map((e) => e.exercise)).size;
  const exercisedOnWeekend = gymEntries.some((e) => {
    const day = parseDateKey(e.date).getDay();
    return day === 0 || day === 6;
  });

  const hasWeightGoalProgress = useMemo(() => {
    const withGoal = weightEntries.filter((e) => e.goal !== undefined);
    if (withGoal.length < 2) return false;
    const first = withGoal[0];
    const latest = withGoal[withGoal.length - 1];
    if (first.goal === undefined || latest.goal === undefined) return false;
    return (
      Math.abs(latest.weight - latest.goal) <
      Math.abs(first.weight - first.goal)
    );
  }, [weightEntries]);

  const hasPerfectMealDay = useMemo(
    () =>
      Object.values(mealData).some((week) =>
        mealDays.some((day) =>
          mealSlots.every((meal) => week[`${day}-${meal.key}`]?.checked)
        )
      ),
    [mealData]
  );

  const isWellRounded =
    waterEntries.length >= 1 &&
    gymEntries.length >= 1 &&
    weightEntries.length >= 1 &&
    totalCheckedMeals >= 1;

  const badges: Badge[] = [
    // Su
    {
      id: "first-water",
      label: "İlk Yudum",
      icon: "💧",
      category: "su",
      earned: waterEntries.length >= 1,
    },
    {
      id: "water-lover",
      label: "Su Sever",
      icon: "🌊",
      category: "su",
      earned: waterEntries.length >= 25,
    },
    {
      id: "water-fairy",
      label: "Su Perisi",
      icon: "🧜‍♀️",
      category: "su",
      earned: waterEntries.length >= 75,
    },
    {
      id: "goal-hitter",
      label: "Hedef Vurucu",
      icon: "🎯",
      category: "su",
      earned: daysWithWaterGoalMet >= 1,
    },
    {
      id: "water-master",
      label: "Su Ustası",
      icon: "👑",
      category: "su",
      earned: daysWithWaterGoalMet >= 30,
    },
    {
      id: "night-owl",
      label: "Gece Kuşu",
      icon: "🦉",
      category: "su",
      earned: loggedLateNightWater,
    },

    // Egzersiz
    {
      id: "first-step",
      label: "İlk Adım",
      icon: "🥾",
      category: "egzersiz",
      earned: gymEntries.length >= 1,
    },
    {
      id: "ten-workouts",
      label: "10 Antrenman",
      icon: "🏋️",
      category: "egzersiz",
      earned: gymEntries.length >= 10,
    },
    {
      id: "iron-body",
      label: "Demir Vücut",
      icon: "💪",
      category: "egzersiz",
      earned: gymEntries.length >= 50,
    },
    {
      id: "marathon-spirit",
      label: "Maraton Ruhu",
      icon: "🏃",
      category: "egzersiz",
      earned: totalExerciseMinutes >= 1000,
    },
    {
      id: "variety-hunter",
      label: "Çeşit Avcısı",
      icon: "🎨",
      category: "egzersiz",
      earned: distinctExerciseTypes >= 5,
    },
    {
      id: "weekend-warrior",
      label: "Hafta Sonu Savaşçısı",
      icon: "🎉",
      category: "egzersiz",
      earned: exercisedOnWeekend,
    },

    // Kilo
    {
      id: "first-weight",
      label: "İlk Kilo Kaydı",
      icon: "⚖️",
      category: "kilo",
      earned: weightEntries.length >= 1,
    },
    {
      id: "consistent-tracker",
      label: "Kararlı Takipçi",
      icon: "📊",
      category: "kilo",
      earned: weightEntries.length >= 10,
    },
    {
      id: "determined",
      label: "Azimli",
      icon: "🧭",
      category: "kilo",
      earned: weightEntries.length >= 25,
    },
    {
      id: "toward-goal",
      label: "Hedefe Doğru",
      icon: "📉",
      category: "kilo",
      earned: hasWeightGoalProgress,
    },

    // Öğün
    {
      id: "meal-master",
      label: "Öğün Ustası",
      icon: "🍽️",
      category: "ogun",
      earned: totalCheckedMeals >= 20,
    },
    {
      id: "nutrition-hero",
      label: "Beslenme Kahramanı",
      icon: "🥗",
      category: "ogun",
      earned: totalCheckedMeals >= 50,
    },
    {
      id: "perfect-day",
      label: "Mükemmel Gün",
      icon: "🌟",
      category: "ogun",
      earned: hasPerfectMealDay,
    },

    // Seri
    {
      id: "week-streak",
      label: "7 Günlük Seri",
      icon: "🔥",
      category: "seri",
      earned: streak >= 7,
    },
    {
      id: "month-streak",
      label: "30 Günlük Seri",
      icon: "🔥🔥",
      category: "seri",
      earned: streak >= 30,
    },
    {
      id: "iron-will",
      label: "Demir İrade",
      icon: "🔥🔥🔥",
      category: "seri",
      earned: streak >= 100,
    },

    // Seviye
    {
      id: "level-5",
      label: "Seviye 5",
      icon: "⭐",
      category: "seviye",
      earned: level >= 5,
    },
    {
      id: "level-10",
      label: "Seviye 10",
      icon: "🌟",
      category: "seviye",
      earned: level >= 10,
    },
    {
      id: "level-25",
      label: "Seviye 25",
      icon: "💫",
      category: "seviye",
      earned: level >= 25,
    },
    {
      id: "legend",
      label: "Efsane",
      icon: "🏆",
      category: "seviye",
      earned: level >= 50,
    },

    // Özel
    {
      id: "well-rounded",
      label: "Çok Yönlü",
      icon: "🎪",
      category: "ozel",
      earned: isWellRounded,
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
