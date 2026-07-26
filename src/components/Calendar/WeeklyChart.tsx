// components/Calendar/WeeklyChart.tsx

import { Typography } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import type { GymEntry } from "../types/GymEntry";
import { getCurrentWeekDates, weekDaysShort } from "../utils/dateUtils";
import { PAGE_ACCENTS } from "../../theme";

type Props = {
  entries: GymEntry[];
  daysShort?: string[];
};

export default function WeeklyChart({
  entries,
  daysShort = weekDaysShort,
}: Props) {
  const theme = useTheme();
  const accent = PAGE_ACCENTS.gym[theme.palette.mode];

  const getWeekChartData = () =>
    getCurrentWeekDates().map((dateStr, i) => ({
      name: daysShort[i],
      sure: entries
        .filter((e) => e.date === dateStr)
        .reduce((acc, e) => acc + e.duration, 0),
    }));

  return (
    <>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Bu Haftanın Egzersiz Dağılımı
      </Typography>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={getWeekChartData()}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
          <YAxis allowDecimals={false} stroke={theme.palette.text.secondary} />
          <Tooltip />
          <Bar dataKey="sure" fill={accent} radius={[6, 6, 2, 2]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
