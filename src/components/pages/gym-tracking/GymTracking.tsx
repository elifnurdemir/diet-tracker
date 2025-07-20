import { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type GymEntry = {
  id: string;
  date: string;
  duration: number;
  exercise: keyof typeof exerciseColors;
};

const exerciseColors = {
  yoga: "#4caf50",
  pilates: "#2196f3",
  kardiyo: "#f44336",
  agirlik: "#9c27b0",
  dans: "#ff9800",
  atlama: "#795548",
  esneme: "#607d8b",
};

const daysShort = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

export default function GymCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entries, setEntries] = useState<GymEntry[]>(() => {
    const saved = localStorage.getItem("gymEntries");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedType, setSelectedType] = useState("hepsi");
  const isMobile = useMediaQuery("(max-width:600px)");

  const filteredEntries =
    selectedType === "hepsi"
      ? entries
      : entries.filter((e) => e.exercise === selectedType);

  const handleDayClick = (dateStr: string) => {
    const duration = prompt("Egzersiz süresi (dk)?");
    const exercise = prompt(
      "Egzersiz türü (yoga, pilates, kardiyo, agirlik, dans, atlama, esneme)?"
    ) as keyof typeof exerciseColors;

    if (
      !duration ||
      !exercise ||
      isNaN(+duration) ||
      !(exercise in exerciseColors)
    )
      return;

    const newEntry: GymEntry = {
      id: Date.now().toString(),
      date: dateStr,
      duration: +duration,
      exercise,
    };
    const updated = [...entries, newEntry];
    setEntries(updated);
    localStorage.setItem("gymEntries", JSON.stringify(updated));
  };

  const changeMonth = (dir: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + dir);
    setCurrentDate(newDate);
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const startOffset = firstDay.getDay();
    for (let i = 0; i < startOffset; i++) days.push(null);

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const fullDate = new Date(year, month, d).toISOString().slice(0, 10);
      days.push(fullDate);
    }

    return days;
  };

  const getWeekChartData = () => {
    const start = new Date();
    start.setDate(start.getDate() - start.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const dateStr = date.toISOString().slice(0, 10);

      const total = filteredEntries
        .filter((e) => e.date === dateStr)
        .reduce((acc, e) => acc + e.duration, 0);

      return {
        name: daysShort[i],
        sure: total,
      };
    });
  };

  return (
    <Box p={2}>
      {/* Ay Değiştirici */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <IconButton onClick={() => changeMonth(-1)}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6">
          {currentDate.toLocaleString("tr-TR", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <IconButton onClick={() => changeMonth(1)}>
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Filtre */}
      <Select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        size="small"
        sx={{ mt: 2 }}
      >
        <MenuItem value="hepsi">Tümü</MenuItem>
        {Object.keys(exerciseColors).map((key) => (
          <MenuItem key={key} value={key}>
            {key}
          </MenuItem>
        ))}
      </Select>

      {/* Takvim */}
      <Box mt={3} display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {daysShort.map((d) => (
          <Typography key={d} align="center" fontWeight="bold">
            {d}
          </Typography>
        ))}
        {getMonthDays().map((dateStr, i) => {
          const entry = dateStr
            ? filteredEntries.find((e) => e.date === dateStr)
            : null;
          return (
            <Box
              key={i}
              onClick={() => dateStr && handleDayClick(dateStr)}
              minHeight={isMobile ? 60 : 90}
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                backgroundColor: entry
                  ? exerciseColors[entry.exercise] || "#eee"
                  : dateStr
                  ? "#fff"
                  : "transparent",
                opacity: dateStr ? 1 : 0.2,
                cursor: dateStr ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                color: "#000",
              }}
            >
              {dateStr ? +dateStr.slice(-2) : ""}
            </Box>
          );
        })}
      </Box>

      {/* Grafik */}
      <Box mt={4}>
        <Typography variant="h6">Bu Haftanın Egzersiz Dağılımı</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={getWeekChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="sure" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
