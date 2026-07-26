import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { toDateKey } from "../../../utils/dateUtils";
import { PAGE_ACCENTS } from "../../../../theme";

export const MOODS = [
  { key: "happy", emoji: "😊", label: "Mutlu" },
  { key: "energetic", emoji: "⚡", label: "Enerjik" },
  { key: "tired", emoji: "😴", label: "Yorgun" },
  { key: "stressed", emoji: "😣", label: "Stresli" },
  { key: "sad", emoji: "😔", label: "Üzgün" },
] as const;

export type MoodKey = (typeof MOODS)[number]["key"];
export type MoodLog = Record<string, MoodKey>;

export const MOOD_STORAGE_KEY = "mood-log";

export const MoodTracker = () => {
  const theme = useTheme();
  const accent = PAGE_ACCENTS.home[theme.palette.mode];
  const [moodLog, setMoodLog] = useLocalStorage<MoodLog>(MOOD_STORAGE_KEY, {});
  const todayKey = toDateKey(new Date());
  const todayMood = moodLog[todayKey];

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="subtitle1" fontWeight={700} sx={{ flexShrink: 0 }}>
          Bugün nasılsın?
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {MOODS.map((mood) => {
            const selected = todayMood === mood.key;
            return (
              <Tooltip key={mood.key} title={mood.label}>
                <IconButton
                  onClick={() =>
                    setMoodLog((prev) => ({ ...prev, [todayKey]: mood.key }))
                  }
                  sx={{
                    fontSize: 22,
                    border: "2px solid",
                    borderColor: selected ? accent : "transparent",
                    backgroundColor: selected
                      ? alpha(accent, 0.12)
                      : "transparent",
                  }}
                >
                  {mood.emoji}
                </IconButton>
              </Tooltip>
            );
          })}
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ flexShrink: 0, minWidth: 190, textAlign: "right" }}
        >
          {todayMood
            ? `Bugünkü modun kaydedildi: ${MOODS.find((m) => m.key === todayMood)?.label}`
            : ""}
        </Typography>
      </CardContent>
    </Card>
  );
};
