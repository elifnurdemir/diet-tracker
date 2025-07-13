import { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

type Exercise =
  | "yoga"
  | "pilates"
  | "kardiyo"
  | "agirlik"
  | "dans"
  | "atlama"
  | "esneme";

const exerciseColors: Record<Exercise, string> = {
  yoga: "#4caf50",
  pilates: "#2196f3",
  kardiyo: "#f44336",
  agirlik: "#9c27b0",
  dans: "#ff9800",
  atlama: "#795548",
  esneme: "#607d8b",
};

interface GymEntry {
  id: string;
  exercise: Exercise;
  duration: number; // dakika
  date: string; // yyyy-mm-dd
  description?: string;
}

export default function GymTracking() {
  const [exercise, setExercise] = useState<Exercise>("yoga");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [entries, setEntries] = useState<GymEntry[]>(() => {
    const saved = localStorage.getItem("gymEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const handleChange = (event: SelectChangeEvent<string>) => {
    setExercise(event.target.value as Exercise);
  };

  const handleAddEntry = () => {
    if (!duration || isNaN(+duration) || +duration <= 0)
      return alert("Geçerli süre giriniz");
    const newEntry: GymEntry = {
      id: Date.now().toString(),
      exercise,
      duration: +duration,
      date,
      description,
    };
    const updated = [...entries, newEntry];
    setEntries(updated);
    localStorage.setItem("gymEntries", JSON.stringify(updated));
    setDuration("");
    setDescription("");
  };

  // Haftalık toplam süre hesapla
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const weeklyTotal = entries
    .filter((e) => new Date(e.date) >= startOfWeek)
    .reduce((acc, e) => acc + e.duration, 0);

  const motivationMessages = [
    "Harika gidiyorsun, devam et!",
    "Bugün kendin için bir adım attın, kutla!",
    "Her egzersiz seni daha güçlü yapıyor!",
    "Azim + Sabır = Başarı!",
  ];
  const motivation =
    motivationMessages[Math.floor(Math.random() * motivationMessages.length)];

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h4" gutterBottom>
        Egzersiz Takibi
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="exercise-label">Egzersiz Seç</InputLabel>
        <Select
          labelId="exercise-label"
          id="exercise-select"
          value={exercise}
          label="Egzersiz Seç"
          onChange={handleChange}
          name="exercise"
          sx={{ color: exerciseColors[exercise] }}
        >
          {Object.entries(exerciseColors).map(([key, color]) => (
            <MenuItem key={key} value={key} sx={{ color }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Süre (dakika)"
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Tarih"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Açıklama (opsiyonel)"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEntry}
        fullWidth
        sx={{ mt: 2 }}
      >
        Ekle
      </Button>

      <Typography variant="h6" mt={4}>
        Bu hafta toplam egzersiz süresi: {weeklyTotal} dakika
      </Typography>
      <Typography variant="body1" color="textSecondary" mt={1} mb={4}>
        {motivation}
      </Typography>

      <Box>
        {entries.length === 0 ? (
          <Typography>Henüz egzersiz kaydı yok.</Typography>
        ) : (
          entries.map((e) => (
            <Box
              key={e.id}
              p={1}
              mb={1}
              borderRadius={1}
              sx={{
                backgroundColor: exerciseColors[e.exercise],
                color: "#fff",
              }}
            >
              <Typography>
                <strong>
                  {e.exercise.charAt(0).toUpperCase() + e.exercise.slice(1)}
                </strong>{" "}
                - {e.duration} dk - {e.date}
              </Typography>
              {e.description && (
                <Typography variant="body2">{e.description}</Typography>
              )}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
