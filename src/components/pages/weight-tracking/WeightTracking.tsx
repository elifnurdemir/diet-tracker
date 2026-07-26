import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import type { WeightEntry } from "./types";
import EntryForm from "./EntryForm";
import Chart from "./Chart";
import MotivationCard from "./MotivationCard";
import PhotoGallery from "./PhotoGallery";
import { useThemeContext } from "../../../ThemeContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const WeightTracker = () => {
  const { setTheme } = useThemeContext();

  useEffect(() => {
    setTheme("weight");
  }, []);
  const [entries, setEntries] = useLocalStorage<WeightEntry[]>(
    "weightData",
    []
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = (entry: WeightEntry) => {
    setLoading(true);
    const updated = [...entries, entry].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    setEntries(updated);
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Haftalık Kilo Girişi & Hedef Belirleme
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <EntryForm onSubmit={handleSubmit} loading={loading} />
        </CardContent>
      </Card>

      <Typography variant="h6">📈 Kilo Değişim Grafiği</Typography>
      <Chart entries={entries} />

      <MotivationCard week={entries.length} />

      <PhotoGallery entries={entries} />
    </Box>
  );
};

export default WeightTracker;
