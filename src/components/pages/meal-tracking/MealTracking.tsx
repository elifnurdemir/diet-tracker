import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { getISOWeek, addWeeks, format } from "date-fns";

const days = ["Pzt", "Salı", "Çrş", "Per", "Cuma", "Cmt", "Paz"];
const meals = [
  { key: "breakfast", label: "Kahvaltı" },
  { key: "snack1", label: "1. Ara Öğün" },
  { key: "lunch", label: "Öğle" },
  { key: "snack2", label: "2. Ara Öğün" },
  { key: "dinner", label: "Akşam" },
];

const mealInfos: Record<string, string> = {
  breakfast: "Protein + lifli karbonhidrat (örn: yumurta + ekmek)",
  snack1: "Meyve + ceviz",
  lunch: "Sebze + tam tahıl",
  snack2: "Kefir / hafif ara",
  dinner: "Sebze + hafif protein",
};

type MealCellData = {
  checked: boolean;
  note: string;
  image?: string;
  timestamp?: string;
};

type WeekData = Record<string, MealCellData>;

const STORAGE_KEY = "meal-tracker-data";

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

  const handleCheckboxToggle = (key: string) => {
    updateMeal(key, { checked: !mealsData[key]?.checked });
  };

  const handleNoteChange = (key: string, note: string) => {
    updateMeal(key, { note });
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      updateMeal(key, { image: reader.result as string });
    reader.readAsDataURL(file);
  };

  const goWeek = (n: number) => setCurrentDate((prev) => addWeeks(prev, n));

  return (
    <Box p={2} sx={{ overflowX: "auto" }}>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button variant="outlined" onClick={() => goWeek(-1)}>
          ⬅️ Önceki Hafta
        </Button>
        <Typography variant="h6">
          {format(currentDate, "'Hafta' w - yyyy")}
        </Typography>
        <Button variant="outlined" onClick={() => goWeek(1)}>
          Sonraki Hafta ➡️
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {days.map((day) => (
              <TableCell align="center" key={day}>
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal.key}>
              <TableCell>{meal.label}</TableCell>
              {days.map((day) => {
                const key = `${day}-${meal.key}`;
                const cell = mealsData[key] || { checked: false, note: "" };
                const displayDate = format(currentDate, "yyyy-MM-dd");

                return (
                  <TableCell
                    key={key}
                    sx={{
                      minWidth: 200,
                      minHeight: 180,
                      verticalAlign: "top",
                      border: "1px solid #ddd",
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Checkbox
                        checked={cell.checked}
                        onChange={() => handleCheckboxToggle(key)}
                      />
                      <Tooltip title="Bilgi">
                        <IconButton
                          onClick={() => setInfoOpen(meal.key)}
                          size="small"
                        >
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Fotoğraf Ekle">
                        <IconButton size="small" component="label">
                          <AddAPhotoIcon fontSize="small" />
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, key)}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {cell.image && (
                      <Box mt={1}>
                        <img
                          src={cell.image}
                          alt="yemek"
                          style={{
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    )}

                    <TextField
                      placeholder={`Not - ${displayDate}`}
                      value={cell.note}
                      onChange={(e) => handleNoteChange(key, e.target.value)}
                      multiline
                      fullWidth
                      size="small"
                      margin="dense"
                    />

                    {cell.timestamp && (
                      <Typography variant="caption" color="textSecondary">
                        ⏱️{" "}
                        {format(new Date(cell.timestamp), "dd.MM.yyyy HH:mm")}
                      </Typography>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!infoOpen} onClose={() => setInfoOpen(null)}>
        <DialogTitle>Öğün Bilgisi</DialogTitle>
        <DialogContent>
          <Typography>{infoOpen && mealInfos[infoOpen]}</Typography>
          <Button onClick={() => setInfoOpen(null)} fullWidth sx={{ mt: 2 }}>
            Kapat
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
