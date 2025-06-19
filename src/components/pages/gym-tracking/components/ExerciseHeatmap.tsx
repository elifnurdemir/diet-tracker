import { useState, useEffect } from "react";
import { Container, Stack } from "@mui/material";
import { ActivityHeatmap } from "../../../utils/ActivityHeatmap";

export const ExerciseHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState<
    { date: string; value: number; name: string }[]
  >([]);

  useEffect(() => {
    const stored = localStorage.getItem("exercises");
    const exercises = stored ? JSON.parse(stored) : [];

    const grouped: Record<string, { count: number; name: string[] }> = {};

    exercises.forEach((ex: { date: string; name: string }) => {
      const d = ex.date.split("T")[0];
      if (!grouped[d]) {
        grouped[d] = { count: 0, name: [] };
      }
      grouped[d].count += 1;
      grouped[d].name.push(ex.name);
    });

    const heatmapArray = Object.entries(grouped).map(
      ([date, { count, name }]) => ({
        date,
        value: count,
        name: name.join(", "),
      })
    );

    setHeatmapData(heatmapArray);
  }, []);

  return (
    <Container sx={{ mt: 10 }}>
      <Stack spacing={4}>
        <ActivityHeatmap title="Egzersiz Takibi" data={heatmapData} goal={5} />
      </Stack>
    </Container>
  );
};
