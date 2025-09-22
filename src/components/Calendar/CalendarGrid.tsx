import { Box, Typography, useMediaQuery } from "@mui/material";
import type { GymEntry } from "../types/GymEntry";
import exerciseColors from "../constants/exerciseColors";

type Props = {
  days: (string | null)[];
  entries: GymEntry[];
  onDayClick: (dateStr: string) => void;
};

export default function CalendarGrid({ days, entries, onDayClick }: Props) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const daysShort = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

  // Bugünün tarihini alıyoruz
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10); // YYYY-MM-DD

  return (
    <Box mt={3}>
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {daysShort.map((d) => (
          <Typography key={d} align="center" fontWeight="bold" color="#254441">
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
                  ? exerciseColors[entry.exercise] || "#eee"
                  : dateStr
                  ? "#1111"
                  : "transparent",
                border: isToday ? "5px solid #5b6349ff" : "none", // Bugün vurgusu
                borderRadius: 1,
                opacity: dateStr ? 1 : 0.2,
                cursor: dateStr ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                color: "#000",
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
