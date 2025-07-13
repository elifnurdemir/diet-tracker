import React, { useState } from "react";
import {
  Box,
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
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const days = ["Pzt", "Salı", "Çrş", "Per", "Cuma", "Cmt", "Paz"];
const meals = [
  { key: "breakfast", label: "Kahvaltı" },
  { key: "snack1", label: "1. Ara Öğün" },
  { key: "lunch", label: "Öğle" },
  { key: "snack2", label: "2. Ara Öğün" },
  { key: "dinner", label: "Akşam" },
];

const mealInfos: Record<string, string> = {
  breakfast:
    "Protein + lifli karbonhidrat (örn: haşlanmış yumurta + tam tahıllı ekmek)",
  snack1: "Meyve + badem/ceviz",
  lunch: "Sebzeli ana yemek + tam tahıl + yoğurt",
  snack2: "Probiyotik içeren hafif ara öğün (kefir, yoğurt vb)",
  dinner: "Hafif protein + sebze",
};

export const MealTracking = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [infoOpen, setInfoOpen] = useState<string | null>(null);

  const toggleCheck = (day: string, meal: string) => {
    const key = `${day}-${meal}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Box p={2}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {days.map((day) => (
              <TableCell key={day} align="center">
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
                return (
                  <TableCell key={key} align="center">
                    <Checkbox
                      checked={checked[key] || false}
                      onChange={() => toggleCheck(day, meal.key)}
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
                        <input type="file" hidden accept="image/*" />
                      </IconButton>
                    </Tooltip>
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
          <Typography variant="body1">
            {infoOpen ? mealInfos[infoOpen] : ""}
          </Typography>
          <Box mt={2}>
            <Button
              onClick={() => setInfoOpen(null)}
              variant="outlined"
              fullWidth
            >
              Kapat
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
