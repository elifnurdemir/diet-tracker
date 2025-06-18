import { useState, useEffect } from "react";
import { Container, Stack } from "@mui/material";
import { ActivityHeatmap } from "../../../utils/ActivityHeatmap";

export const ExerciseHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState<
    { date: string; value: number }[]
  >([]);

  useEffect(() => {
    const stored = localStorage.getItem("exercises");
    const exercises = stored ? JSON.parse(stored) : [];

    const grouped: Record<string, number> = {};

    exercises.forEach((ex: { date: string }) => {
      const d = ex.date.split("T")[0]; // sadece yyyy-mm-dd
      grouped[d] = (grouped[d] || 0) + 1;
    });

    const heatmapArray = Object.entries(grouped).map(([date, count]) => ({
      date,
      value: count, // value alanı önemli!
    }));

    setHeatmapData(heatmapArray);
  }, []);

  return (
    <Container sx={{ mt: 1 }}>
      <Stack spacing={4}>
        <ActivityHeatmap title="Egzersiz Takibi" data={heatmapData} goal={5} />
      </Stack>
    </Container>
  );
};
