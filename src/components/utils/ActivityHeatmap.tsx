import React, { type JSX } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { toDateKey } from "./dateUtils";

interface ActivityData {
  date: string;
  value: number;
  name?: string;
}

interface ActivityHeatmapProps {
  data: ActivityData[];
  goal: number;
  title?: string;
  unit?: string;
  colorScale?: string[];
  titleColor?: string;
  titleSx?: SxProps<Theme>;
  onCellClick?: (date: string) => void;
}

const defaultColorScale = ["#bbdefb", "#42a5f5", "#1e88e5"];
const dayNames = ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"];
const GRID_GAP = 6;

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  data,
  goal,
  title = "Aktivite Takibi",
  unit = "",
  colorScale = defaultColorScale,
  titleColor,
  titleSx,
  onCellClick,
}) => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 41);

  const dateMap = new Map<string, ActivityData>();
  data.forEach((entry) => {
    dateMap.set(entry.date, entry);
  });

  const getColorByPercentage = (percentage: number): string => {
    if (percentage === 0) return "transparent";
    if (percentage < 0.33) return colorScale[0];
    if (percentage < 0.66) return colorScale[1];
    return colorScale[2];
  };

  const startDayIndex = startDate.getDay();

  const cells: JSX.Element[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const iso = toDateKey(date);
    const entry = dateMap.get(iso);
    const value = entry?.value || 0;
    const percentage = Math.min(1, value / goal);
    const color = getColorByPercentage(percentage);
    const names = entry?.name || "";

    cells.push(
      <Tooltip
        key={iso}
        title={
          <Box>
            <Typography variant="caption">{iso}</Typography>
            <Typography variant="body2">
              {value} {unit}
            </Typography>
            {names && (
              <Typography variant="body2" sx={{ mt: 0.5, fontStyle: "italic" }}>
                Egzersizler: {names}
              </Typography>
            )}
            {onCellClick && (
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 0.5, opacity: 0.8 }}
              >
                Eklemek için tıkla
              </Typography>
            )}
          </Box>
        }
        arrow
      >
        <Box
          onClick={onCellClick ? () => onCellClick(iso) : undefined}
          role={onCellClick ? "button" : undefined}
          tabIndex={onCellClick ? 0 : undefined}
          aria-label={onCellClick ? `${iso} için ekle` : undefined}
          onKeyDown={
            onCellClick
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onCellClick(iso);
                  }
                }
              : undefined
          }
          data-testid="heatmap-cell"
          sx={{
            width: 22,
            height: 22,
            backgroundColor: color,
            borderRadius: 1,
            border: "1px solid #ccc",
            cursor: onCellClick ? "pointer" : "default",
            transition: "background-color 0.3s, transform 0.15s",
            "&:hover": onCellClick
              ? { transform: "scale(1.15)", borderColor: colorScale[2] }
              : undefined,
            "&:focus-visible": onCellClick
              ? { outline: `2px solid ${colorScale[2]}`, outlineOffset: 2 }
              : undefined,
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
        sx={{
          fontWeight: "bold",
          color: titleColor || "text.primary",
          ...titleSx,
        }}
      >
        {title}
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns="repeat(7, 1fr)"
        gap={`${GRID_GAP}px`}
        mb={1}
      >
        {Array.from({ length: 7 }).map((_, i) => {
          const index = (startDayIndex + i) % 7;
          return (
            <Typography
              key={`day-${i}`}
              variant="caption"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                height: "100%",
                color: titleColor || "text.primary",
              }}
            >
              {dayNames[index]}
            </Typography>
          );
        })}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(7, 1fr)"
        gap={`${GRID_GAP}px`}
      >
        {cells}
      </Box>
    </Box>
  );
};
