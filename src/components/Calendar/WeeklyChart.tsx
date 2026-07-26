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
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Bu Haftanın Egzersiz Dağılımı
      </Typography>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={getWeekChartData()}
          margin={{ top: 16, right: 8, left: 8, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            dataKey="name"
            stroke={theme.palette.text.secondary}
            tickMargin={10}
          />
          <YAxis
            allowDecimals={false}
            stroke={theme.palette.text.secondary}
            width={32}
            tickMargin={10}
          />
          <Tooltip
            formatter={(value: number) => [`${value} dk`, "Süre"]}
            allowEscapeViewBox={{ x: false, y: false }}
            cursor={{ fill: theme.palette.action.hover }}
          />
          <Bar
            dataKey="sure"
            name="Süre"
            fill={accent}
            radius={[6, 6, 2, 2]}
            barSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
