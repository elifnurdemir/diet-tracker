import React, { type JSX } from "react";
import { Box, Tooltip, Typography } from "@mui/material";

interface ActivityData {
  date: string; // ISO tarih: "2025-06-12"
  value: number; // o günkü ölçülen değer (örneğin ml, dakika, puan)
}

interface ActivityHeatmapProps {
  data: ActivityData[];
  goal: number; // günlük hedef (örn. 2000ml, 30dk, 5 puan)
  title?: string; // üst başlık (örn. "Su Takibi", "Spor Takibi")
  unit?: string; // değer birimi (örn. ml, dk, kalori)
  colorScale?: string[]; // isteğe bağlı renk dizisi (açık -> koyu)
}

const defaultColorScale = [
  "#e3f2fd",
  "#bbdefb",
  "#90caf9",
  "#42a5f5",
  "#1e88e5",
];

const daysOfWeek = ["Pz", "Sa", "Ça", "Pe", "Cu", "Ct", "Pa"];

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  data,
  goal,
  title = "Aktivite Takibi",
  unit = "",
  colorScale = defaultColorScale,
}) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 41); // son 6 hafta

  const dateMap = new Map<string, number>();
  data.forEach((entry) => {
    dateMap.set(entry.date, entry.value);
  });

  const getColorByPercentage = (percentage: number): string => {
    const steps = colorScale.length;
    const index = Math.min(steps - 1, Math.floor(percentage * steps));
    return colorScale[index];
  };

  const cells: JSX.Element[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const iso = date.toISOString().split("T")[0];
    const value = dateMap.get(iso) || 0;
    const percentage = Math.min(1, value / goal);
    const color = getColorByPercentage(percentage);

    cells.push(
      <Tooltip
        key={iso}
        title={
          <Box>
            <Typography variant="caption">{iso}</Typography>
            <Typography variant="body2">
              {value} {unit}
            </Typography>
          </Box>
        }
        arrow
      >
        <Box
          sx={{
            width: 22,
            height: 22,
            backgroundColor: color,
            borderRadius: 1,
            border: "1px solid #ccc",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        />
      </Tooltip>
    );
  }

  return (
    <Box>
      <Typography
        variant="h6"
        mb={2}
        textAlign="center"
        sx={{ color: "#1e88e5", fontWeight: "bold" }}
      >
        {title}
      </Typography>

      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap="2px">
        {/* Haftanın günleri */}
        {daysOfWeek.map((day, index) => (
          <Typography
            key={`day-${index}`}
            variant="caption"
            sx={{ textAlign: "center", fontWeight: "medium" }}
          >
            {day}
          </Typography>
        ))}

        {/* Takvim hücreleri */}
        {cells}
      </Box>
    </Box>
  );
};
