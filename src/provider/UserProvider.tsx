import React, { createContext, useContext, useMemo, useCallback } from "react";
import type { UserData, WaterEntry } from "../components/types/UserData";
import { toDateKey } from "../components/utils/dateUtils";
import { useLocalStorage } from "../hooks/useLocalStorage";

const DEFAULT_DAILY_WATER_GOAL_ML = 2000;

interface UserContextValue {
  userData: UserData;
  dailyIdealWater: number;
  bmi: number | null;
  updateUserData: (newUserData: UserData) => void;
  updateUserImage: (image: string) => void;
  addWaterEntry: (amount: number, date?: Date) => void;
  todayWaterEntries: WaterEntry[]; // Bugünün tüm su içme kayıtları
  todayTotalWaterAmount: number; // Bugünkü toplam su miktarı
  waterHeatmapData: { date: string; value: number }[];
}

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useLocalStorage<UserData>("Profile", {});

  const updateUserData = useCallback(
    (newUserData: UserData) => {
      setUserData(newUserData);
    },
    [setUserData]
  );

  const updateUserImage = useCallback(
    (image: string) => {
      setUserData((prev) => ({ ...prev, image }));
    },
    [setUserData]
  );

  const dailyIdealWater = useMemo(() => {
    if (userData.kg !== undefined && userData.kg !== null) {
      const kg =
        typeof userData.kg === "string" ? parseFloat(userData.kg) : userData.kg;
      if (!isNaN(kg)) {
        return Math.round(kg * 0.033 * 1000); // ml cinsinden, tam sayı
      }
    }
    // Kilo profile girilmemişse su hedefi hesaplanamaz; makul bir
    // varsayılan olmadan gösterge (tank, kalan miktar, yüzde) hep sıfır
    // görünürdü, sanki eklenen su hiçbir şeyi etkilemiyormuş gibi.
    return DEFAULT_DAILY_WATER_GOAL_ML;
  }, [userData.kg]);

  const addWaterEntry = useCallback(
    (amount: number, date?: Date) => {
      setUserData((prev) => {
        const newEntry: WaterEntry = {
          id: String(Date.now()) + Math.random().toString(36).substr(2, 9), // unique id
          amount,
          date: (date ?? new Date()).toISOString(),
        };
        const updatedEntries = [...(prev.waterEntries ?? []), newEntry];
        return { ...prev, waterEntries: updatedEntries };
      });
    },
    [setUserData]
  );

  // Günlük toplam su miktarlarını tarih bazlı toplayıp heatmap'e uygun formatta döner
  const waterHeatmapData = useMemo(() => {
    if (!userData.waterEntries) return [];

    const summary: Record<string, number> = {};

    for (const entry of userData.waterEntries) {
      const dateOnly = toDateKey(new Date(entry.date));
      summary[dateOnly] = (summary[dateOnly] || 0) + entry.amount;
    }

    return Object.entries(summary).map(([date, value]) => ({ date, value }));
  }, [userData.waterEntries]);

  const bmi = useMemo(() => {
    if (
      userData.kg !== undefined &&
      userData.height !== undefined &&
      userData.kg !== null &&
      userData.height !== null
    ) {
      const kg =
        typeof userData.kg === "string" ? parseFloat(userData.kg) : userData.kg;
      const heightCm =
        typeof userData.height === "string"
          ? parseFloat(userData.height)
          : userData.height;

      if (!isNaN(kg) && !isNaN(heightCm) && heightCm > 0) {
        const heightM = heightCm / 100;
        return parseFloat((kg / (heightM * heightM)).toFixed(1));
      }
    }
    return null;
  }, [userData.kg, userData.height]);

  const todayDateStr = toDateKey(new Date());

  const todayWaterEntries = useMemo(() => {
    if (!userData.waterEntries) return [];
    return userData.waterEntries.filter(
      (entry) => toDateKey(new Date(entry.date)) === todayDateStr
    );
  }, [userData.waterEntries, todayDateStr]);

  const todayTotalWaterAmount = useMemo(() => {
    return todayWaterEntries.reduce((total, entry) => total + entry.amount, 0);
  }, [todayWaterEntries]);

  return (
    <UserContext.Provider
      value={{
        userData,
        dailyIdealWater,
        bmi,
        updateUserData,
        updateUserImage,
        addWaterEntry,
        todayWaterEntries,
        todayTotalWaterAmount,
        waterHeatmapData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
