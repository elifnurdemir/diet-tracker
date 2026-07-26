import { useEffect, useRef, useState, type JSX } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { PAGE_ACCENTS } from "../../../../theme";
import { toDateKey } from "../../../utils/dateUtils";
import type { GymEntry } from "../../../types/GymEntry";

type Props = {
  waterData: { date: string; value: number }[];
  dailyIdealWater: number;
  gymEntries: GymEntry[];
  days?: number;
  onCellClick?: (date: string) => void;
};

const dayNames = ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"];
const monthNames = [
  "Oca",
  "Şub",
  "Mar",
  "Nis",
  "May",
  "Haz",
  "Tem",
  "Ağu",
  "Eyl",
  "Eki",
  "Kas",
  "Ara",
];
const DAY_LABEL_WIDTH = 24;
const EXERCISE_TARGET_MINUTES = 30;
const MIN_CELL_SIZE = 10;
const MAX_CELL_SIZE = 20;
const GRID_GAP = 3;

export const CombinedActivityHeatmap = ({
  waterData,
  dailyIdealWater,
  gymEntries,
  days = 365,
  onCellClick,
}: Props) => {
  const theme = useTheme();
  const waterAccent = PAGE_ACCENTS.water[theme.palette.mode];
  const gymAccent = PAGE_ACCENTS.gym[theme.palette.mode];

  // Hücre boyutu, kart genişliğine göre hesaplanır: 53 hafta hiçbir zaman
  // yatay kaydırma gerektirmeden tam sığar, kalan boşluk kadar da büyür —
  // dar bir varsayımla küçük kalmak yerine mevcut genişliği kullanır.
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setContainerWidth(width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const weekCount = Math.ceil(days / 7);
  const CELL_SIZE = (() => {
    if (!containerWidth) return MIN_CELL_SIZE;
    const available = containerWidth - DAY_LABEL_WIDTH - weekCount * GRID_GAP;
    const fitted = Math.floor(available / weekCount);
    return Math.max(MIN_CELL_SIZE, Math.min(MAX_CELL_SIZE, fitted));
  })();

  const waterByDate = new Map(waterData.map((d) => [d.date, d.value]));
  const gymMinutesByDate = new Map<string, number>();
  for (const entry of gymEntries) {
    gymMinutesByDate.set(
      entry.date,
      (gymMinutesByDate.get(entry.date) ?? 0) + entry.duration
    );
  }

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (days - 1));
  const startDayIndex = startDate.getDay();

  // Her hafta-sütunu için, o hafta içinde ayın 1'i varsa ay adını göster
  // (GitHub'ın yıllık katkı grafiğindeki ay etiketleriyle aynı mantık).
  const monthLabels: (string | null)[] = Array.from(
    { length: weekCount },
    () => null
  );
  for (let w = 0; w < weekCount; w++) {
    for (let d = 0; d < 7; d++) {
      const dayIndex = w * 7 + d;
      if (dayIndex >= days) break;
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + dayIndex);
      if (date.getDate() === 1) {
        monthLabels[w] = monthNames[date.getMonth()];
        break;
      }
    }
  }

  const levelColor = (score: number): string => {
    if (score <= 0) return "transparent";
    if (score < 0.25) return alpha(waterAccent, 0.25);
    if (score < 0.5) return alpha(waterAccent, 0.5);
    if (score < 0.75) return alpha(waterAccent, 0.75);
    return waterAccent;
  };

  const cells: JSX.Element[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const iso = toDateKey(date);
    const waterAmount = waterByDate.get(iso) ?? 0;
    const exerciseMinutes = gymMinutesByDate.get(iso) ?? 0;
    const waterScore = dailyIdealWater > 0 ? waterAmount / dailyIdealWater : 0;
    const exerciseScore = exerciseMinutes / EXERCISE_TARGET_MINUTES;
    const score = Math.min(1, 0.6 * waterScore + 0.4 * exerciseScore);

    cells.push(
      <Tooltip
        key={iso}
        title={
          <Box>
            <Typography
              variant="caption"
              sx={{ display: "block", fontWeight: 700 }}
            >
              {iso}
            </Typography>
            <Typography variant="body2">💧 {waterAmount} ml</Typography>
            <Typography variant="body2">🏋️ {exerciseMinutes} dk</Typography>
            {onCellClick && (
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 0.5, opacity: 0.8 }}
              >
                Su eklemek için tıkla
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
          sx={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: levelColor(score),
            borderRadius: 0.75,
            border: "1px solid",
            borderColor: "divider",
            cursor: onCellClick ? "pointer" : "default",
            transition: "transform 0.15s",
            position: "relative",
            "&:hover": onCellClick
              ? { transform: "scale(1.25)", borderColor: waterAccent }
              : undefined,
            ...(exerciseMinutes > 0 && {
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -2,
                right: -2,
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: gymAccent,
              },
            }),
          }}
        />
      </Tooltip>
    );
  }

  const gridTemplateColumns = `${DAY_LABEL_WIDTH}px repeat(${weekCount}, ${CELL_SIZE}px)`;

  return (
    <Box>
      <Typography variant="h6" mb={0.5} textAlign="center" fontWeight="bold">
        {days >= 365
          ? "Yıllık Su ve Egzersiz Isı Haritası"
          : `Son ${days} Günlük Su ve Egzersiz Isı Haritası`}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        textAlign="center"
        display="block"
        mb={2}
      >
        Koyu mavi = hedefe yakın su, küçük yeşil nokta = o gün egzersiz yapıldı
      </Typography>

      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Box>
          <Box
            display="grid"
            gridTemplateColumns={gridTemplateColumns}
            gap={`${GRID_GAP}px`}
            sx={{ mb: 0.5 }}
          >
            <Box />
            {monthLabels.map((label, i) => (
              <Typography
                key={i}
                variant="caption"
                color="text.secondary"
                sx={{
                  gridColumn: i + 2,
                  fontSize: "0.65rem",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {label ?? ""}
              </Typography>
            ))}
          </Box>
          <Box
            display="grid"
            gridTemplateColumns={gridTemplateColumns}
            gap={`${GRID_GAP}px`}
          >
            {dayNames.map((name, i) => (
              <Typography
                key={name}
                variant="caption"
                color="text.secondary"
                sx={{
                  gridColumn: 1,
                  gridRow: i + 1,
                  height: CELL_SIZE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  pr: 0.75,
                  fontSize: CELL_SIZE < 14 ? "0.65rem" : undefined,
                }}
              >
                {name}
              </Typography>
            ))}
            {cells.map((cell, i) => {
              const col = Math.floor(i / 7) + 2;
              const row = ((startDayIndex + i) % 7) + 1;
              return (
                <Box key={i} sx={{ gridColumn: col, gridRow: row }}>
                  {cell}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
