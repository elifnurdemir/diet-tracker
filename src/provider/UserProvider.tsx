import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import type { UserData, WaterEntry } from "../components/types/UserData";

interface UserContextValue {
  userData: UserData;
  dailyIdealWater: number | null;
  bmi: number | null;
  updateUserData: (newUserData: UserData) => void;
  updateUserImage: (image: string) => void;
  addWaterEntry: (amount: number) => void;
  todayWaterEntries: WaterEntry[]; // Bugünün tüm su içme kayıtları
  todayTotalWaterAmount: number; // Bugünkü toplam su miktarı
}

const UserContext = createContext<UserContextValue | null>(null);

function isSameDay(dateStr1: string, dateStr2: string) {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    return JSON.parse(localStorage.getItem("Profile") ?? "{}");
  });

  const updateUserData = useCallback((newUserData: UserData) => {
    setUserData(newUserData);
    localStorage.setItem("Profile", JSON.stringify(newUserData));
  }, []);

  const updateUserImage = useCallback((image: string) => {
    setUserData((prev) => {
      const updated = { ...prev, image };
      localStorage.setItem("Profile", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const dailyIdealWater = useMemo(() => {
    if (userData.kg !== undefined && userData.kg !== null) {
      const kg =
        typeof userData.kg === "string" ? parseFloat(userData.kg) : userData.kg;
      if (!isNaN(kg)) {
        return Math.round(kg * 0.033 * 1000); // ml cinsinden, tam sayı
      }
    }
    return null;
  }, [userData.kg]);

  const addWaterEntry = useCallback((amount: number) => {
    setUserData((prev) => {
      const newEntry: WaterEntry = {
        id: String(Date.now()) + Math.random().toString(36).substr(2, 9), // unique id
        amount,
        date: new Date().toISOString(), // ISO string date with timestamp
      };
      const updatedEntries = [...(prev.waterEntries ?? []), newEntry];
      const updated = { ...prev, waterEntries: updatedEntries };
      localStorage.setItem("Profile", JSON.stringify(updated));
      return updated;
    });
  }, []);

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

  const todayWaterEntries = useMemo(() => {
    if (!userData.waterEntries) return [];
    const todayStr = new Date().toISOString();
    return userData.waterEntries.filter((entry) =>
      isSameDay(entry.date, todayStr)
    );
  }, [userData.waterEntries]);

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
