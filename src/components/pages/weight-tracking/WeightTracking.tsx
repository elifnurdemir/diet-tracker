import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  InputLabel,
  LinearProgress,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type PhotoView = "front" | "side" | "back";

interface WeightEntry {
  date: string;
  weight: number;
  goal?: number;
  photos: Record<PhotoView, string | undefined>;
}

// Motivasyon mesajları
const getMotivation = (week: number) => {
  const messages = [
    "Seninle gurur duyuyorum!",
    "İstikrarlı gitmek kazandırır.",
    "Bugün en iyi versiyonun için çalış!",
    "Vücudun sana teşekkür edecek.",
    "Küçük adımlar büyük fark yaratır!",
    "Her gün daha güçlüsün.",
    "Harika ilerliyorsun, pes etme!",
  ];
  return messages[week % messages.length];
};

const views: PhotoView[] = ["front", "side", "back"];

const WeightTracker = () => {
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [date, setDate] = useState("");
  const [weight, setWeight] = useState<number | "">("");
  const [goal, setGoal] = useState<number | "">("");
  const [photos, setPhotos] = useState<Record<PhotoView, string | undefined>>({
    front: undefined,
    side: undefined,
    back: undefined,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("weightData");
    if (data) setEntries(JSON.parse(data));
  }, []);

  const handleSubmit = () => {
    if (!date || !weight) return;
    setLoading(true);
    const newEntry: WeightEntry = {
      date,
      weight: Number(weight),
      goal: goal === "" ? undefined : Number(goal),
      photos,
    };
    const updated = [...entries, newEntry].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    localStorage.setItem("weightData", JSON.stringify(updated));
    setEntries(updated);
    setDate("");
    setWeight("");
    setGoal("");
    setPhotos({ front: undefined, side: undefined, back: undefined });
    setLoading(false);
  };

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    view: PhotoView
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotos((prev) => ({ ...prev, [view]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Haftalık Kilo Girişi & Hedef Belirleme
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <TextField
              type="date"
              label="Tarih"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 150 }}
            />
            <TextField
              type="number"
              label="Kilo (kg)"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              sx={{ minWidth: 120 }}
            />
            <TextField
              type="number"
              label="Haftalık Hedef (kg)"
              value={goal}
              onChange={(e) =>
                setGoal(e.target.value === "" ? "" : Number(e.target.value))
              }
              sx={{ minWidth: 150 }}
              helperText="Opsiyonel"
            />
          </Box>

          <Box sx={{ display: "flex", gap: 3, mt: 2, flexWrap: "wrap" }}>
            {views.map((view) => (
              <Box key={view} sx={{ textAlign: "center" }}>
                <InputLabel>{view.toUpperCase()} Fotoğraf</InputLabel>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(e, view)}
                  style={{ display: "block", margin: "8px auto" }}
                />
                {photos[view] && (
                  <img
                    src={photos[view]}
                    alt={`${view} preview`}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginTop: 4,
                      border: "1px solid #ccc",
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>

          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 3 }}>
            Kaydet
          </Button>
          {loading && <LinearProgress sx={{ mt: 2 }} />}
        </CardContent>
      </Card>

      <Typography variant="h6">📈 Kilo Değişim Grafiği</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={entries}>
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#4caf50"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          {entries.some((e) => e.goal !== undefined) && (
            <Line
              type="monotone"
              dataKey="goal"
              stroke="#ff9800"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      <Box mt={4}>
        <Typography variant="h6">💬 Haftalık Motivasyon</Typography>
        <Card sx={{ mt: 1 }}>
          <CardContent>
            <Typography>{getMotivation(entries.length)}</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          📸 Haftalık Fotoğraf Galerisi
        </Typography>
        {entries.length === 0 && <Typography>Henüz fotoğraf yok.</Typography>}
        {entries.map((entry) => (
          <Card key={entry.date} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {entry.date}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {views.map((view) =>
                  entry.photos[view] ? (
                    <Box key={view} sx={{ textAlign: "center" }}>
                      <Typography variant="caption">
                        {view.toUpperCase()}
                      </Typography>
                      <img
                        src={entry.photos[view]}
                        alt={`${view} photo`}
                        style={{
                          width: 120,
                          height: 120,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #ccc",
                        }}
                      />
                    </Box>
                  ) : null
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default WeightTracker;
