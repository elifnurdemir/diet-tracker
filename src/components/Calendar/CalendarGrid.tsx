import { Box, Typography, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import type { GymEntry } from "../types/GymEntry";
import exerciseColors from "../constants/exerciseColors";
import { toDateKey, weekDaysShort } from "../utils/dateUtils";

type Props = {
  days: (string | null)[];
  entries: GymEntry[];
  onDayClick: (dateStr: string) => void;
};

export default function CalendarGrid({ days, entries, onDayClick }: Props) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();

  // Bugünün tarihini alıyoruz
  const today = new Date();
  const todayStr = toDateKey(today);

  return (
    <Box mt={3}>
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {weekDaysShort.map((d) => (
          <Typography
            key={d}
            align="center"
            fontWeight="bold"
            color="text.secondary"
          >
            {d}
          </Typography>
        ))}

        {days.map((dateStr, i) => {
          const entry = dateStr
            ? entries.find((e) => e.date === dateStr)
            : null;

          const isToday = dateStr === todayStr; // Bugün kontrolü

          return (
            <Box
              key={i}
              onClick={() => dateStr && onDayClick(dateStr)}
              minHeight={isMobile ? 60 : 90}
              sx={{
                backgroundColor: entry
                  ? exerciseColors[entry.exercise]
                  : dateStr
                    ? alpha(theme.palette.primary.main, 0.08)
                    : "transparent",
                border: isToday
                  ? `3px solid ${theme.palette.primary.main}`
                  : "none",
                borderRadius: 2.5,
                opacity: dateStr ? 1 : 0.2,
                cursor: dateStr ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 700,
                color: entry ? "#ffffff" : "text.primary",
              }}
            >
              {dateStr ? +dateStr.slice(-2) : ""}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
