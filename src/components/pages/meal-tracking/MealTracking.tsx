import { useEffect, useMemo, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { addWeeks } from "date-fns";
import { WeekNavigator } from "./WeekNavigator";
import { MealTable } from "./MealTable";
import { InfoDialog } from "./InfoDialog";
import { DietListTable } from "./DietListTable";
import { DietItemDialog } from "./DietItemDialog";
import { DietitianAppointments } from "./DietitianAppointments";
import { ComplianceCard } from "./ComplianceCard";
import { STORAGE_KEY, days, meals, getWeekKey } from "./constants";
import {
  DIET_LIST_STORAGE_KEY,
  DIETITIAN_APPOINTMENTS_STORAGE_KEY,
  type DietList,
  type DietitianAppointment,
} from "./dietTypes";
import type { MealCellData, WeekData } from "./types";
import { useThemeContext } from "../../../ThemeContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

type TabKey = "weekly" | "diet" | "appointments";

export const MealTracking = () => {
  const { setTheme } = useThemeContext();

  useEffect(() => {
    setTheme("meal");
  }, []);

  const [tab, setTab] = useState<TabKey>("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allData, setAllData] = useLocalStorage<Record<string, WeekData>>(
    STORAGE_KEY,
    {}
  );
  const [infoOpen, setInfoOpen] = useState<string | null>(null);

  const [dietList, setDietList] = useLocalStorage<DietList>(
    DIET_LIST_STORAGE_KEY,
    {}
  );
  const [dietDialog, setDietDialog] = useState<{
    key: string;
    day: string;
    mealLabel: string;
  } | null>(null);

  const [appointments, setAppointments] = useLocalStorage<
    DietitianAppointment[]
  >(DIETITIAN_APPOINTMENTS_STORAGE_KEY, []);

  const weekKey = getWeekKey(currentDate);
  const mealsData: WeekData = useMemo(
    () => allData[weekKey] || {},
    [allData, weekKey]
  );

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

  const prescribedKeys = useMemo(
    () => Object.keys(dietList).filter((key) => dietList[key]?.trim()),
    [dietList]
  );
  const matchedCount = useMemo(
    () => prescribedKeys.filter((key) => mealsData[key]?.checked).length,
    [prescribedKeys, mealsData]
  );
  const compliance =
    prescribedKeys.length > 0
      ? Math.round((matchedCount / prescribedKeys.length) * 100)
      : null;

  const handleDietSave = (value: string) => {
    if (!dietDialog) return;
    setDietList((prev) => {
      const updated = { ...prev };
      if (value.trim()) {
        updated[dietDialog.key] = value.trim();
      } else {
        delete updated[dietDialog.key];
      }
      return updated;
    });
    setDietDialog(null);
  };

  const handleDietDelete = () => {
    if (!dietDialog) return;
    setDietList((prev) => {
      const updated = { ...prev };
      delete updated[dietDialog.key];
      return updated;
    });
    setDietDialog(null);
  };

  const addAppointment = (appointment: Omit<DietitianAppointment, "id">) => {
    setAppointments((prev) => [
      ...prev,
      {
        ...appointment,
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      },
    ]);
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <Box p={2} sx={{ overflowX: "auto" }}>
      <Tabs
        value={tab}
        onChange={(_, value: TabKey) => setTab(value)}
        sx={{ mb: 2 }}
      >
        <Tab value="weekly" label="Haftalık Takip" />
        <Tab value="diet" label="Diyet Listem" />
        <Tab value="appointments" label="Diyetisyen Randevuları" />
      </Tabs>

      {tab === "weekly" && (
        <>
          <ComplianceCard
            compliance={compliance}
            matchedCount={matchedCount}
            totalPrescribed={prescribedKeys.length}
          />
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
        </>
      )}

      {tab === "diet" && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Diyetisyenin haftalık önerdiği öğünleri buraya gir — bu plan her
            hafta için aynı temel alınır. "Haftalık Takip" sekmesindeki
            işaretlemeler bu listeyle karşılaştırılıp uyumunu gösterir.
          </Typography>
          <DietListTable
            dietList={dietList}
            onCellClick={(key, day, mealLabel) =>
              setDietDialog({ key, day, mealLabel })
            }
          />
        </>
      )}

      {tab === "appointments" && (
        <DietitianAppointments
          appointments={appointments}
          onAdd={addAppointment}
          onDelete={deleteAppointment}
        />
      )}

      <DietItemDialog
        open={!!dietDialog}
        day={dietDialog?.day ?? null}
        mealLabel={dietDialog?.mealLabel ?? null}
        initialValue={dietDialog ? (dietList[dietDialog.key] ?? "") : ""}
        onClose={() => setDietDialog(null)}
        onSave={handleDietSave}
        onDelete={handleDietDelete}
      />
    </Box>
  );
};
