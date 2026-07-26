import { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import CalendarGrid from "../../Calendar/CalendarGrid";
import AddExerciseDialog from "../../Calendar/Dialog";
import WeeklyChart from "../../Calendar/WeeklyChart";
import type exerciseColors from "../../constants/exerciseColors";
import type { GymEntry } from "../../types/GymEntry";
import { getMonthDays } from "../../utils/dateUtils";
import { useThemeContext } from "../../../ThemeContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export default function GymCalendar() {
  const { setTheme } = useThemeContext();

  useEffect(() => {
    return setTheme("gym");
  }, []);
  const [entries, setEntries] = useLocalStorage<GymEntry[]>("gym-entries", []);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [duration, setDuration] = useState("");
  const [exerciseType, setExerciseType] = useState<
    keyof typeof exerciseColors | ""
  >("");

  const days = getMonthDays(currentDate);

  const handleDayClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    setDialogOpen(true);
  };

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  };

  const handleSave = () => {
    if (!selectedDate || !duration || !exerciseType) return;

    const newEntry: GymEntry = {
      id: generateId(),
      date: selectedDate,
      duration: parseInt(duration),
      exercise: exerciseType,
    };

    setEntries((prev) => [...prev, newEntry]);
    setDialogOpen(false);
    setDuration("");
    setExerciseType("");
  };

  return (
    <Box p={2}>
      <Typography variant="h4" align="center" gutterBottom color="text.primary">
        Egzersiz Takvimi
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <IconButton
          onClick={() =>
            setCurrentDate(
              (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
            )
          }
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" color="text.primary">
          {currentDate.toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
          })}
        </Typography>
        <IconButton
          onClick={() =>
            setCurrentDate(
              (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
            )
          }
        >
          <ArrowForward />
        </IconButton>
      </Box>

      <CalendarGrid days={days} entries={entries} onDayClick={handleDayClick} />

      <WeeklyChart entries={entries} />

      <AddExerciseDialog
        open={dialogOpen}
        selectedDate={selectedDate}
        duration={duration}
        exerciseType={exerciseType}
        setDuration={setDuration}
        setExerciseType={setExerciseType}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
}
