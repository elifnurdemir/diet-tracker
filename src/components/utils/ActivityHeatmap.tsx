import React, { type JSX } from "react";
import { Box, Tooltip, Typography } from "@mui/material";

interface ActivityData {
  date: string;
  value: number;
}

interface ActivityHeatmapProps {
  data: ActivityData[];
  goal: number;
  title?: string;
  unit?: string;
  colorScale?: string[];
}

const defaultColorScale = ["#bbdefb", "#42a5f5", "#1e88e5"];

const dayNames = ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"]; // doğru sıralı

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  data,
  goal,
  title = "Aktivite Takibi",
  unit = "",
  colorScale = defaultColorScale,
}) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 41);

  const dateMap = new Map<string, number>();
  data.forEach((entry) => {
    dateMap.set(entry.date, entry.value);
  });

  const getColorByPercentage = (percentage: number): string => {
    if (percentage === 0) return "transparent";
    if (percentage < 0.33) return colorScale[0];
    if (percentage < 0.66) return colorScale[1];
    return colorScale[2];
  };

  // 🧠 startDate'in gününü al, 0=pazar, 1=pazartesi...
  const startDayIndex = startDate.getDay();

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

      {/* Gün isimlerini başlangıç gününe göre hizala */}
      {/* Gün isimleri */}
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap="1px" mb={1}>
        {Array.from({ length: 7 }).map((_, i) => {
          const index = (startDayIndex + i) % 7;
          return (
            <Typography
              key={`day-${i}`}
              variant="caption"
              sx={{ textAlign: "center", fontWeight: "medium" }}
            >
              {dayNames[index]}
            </Typography>
          );
        })}
      </Box>

      {/* Hücreler */}
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap="1px">
        {cells}
      </Box>
    </Box>
  );
};
