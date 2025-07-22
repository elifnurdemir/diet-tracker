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
import type { GymEntry } from "../types/GymEntry";

type Props = {
  entries: GymEntry[];
  daysShort: string[];
};

export default function WeeklyChart({ entries, daysShort }: Props) {
  const getWeekChartData = () => {
    const start = new Date();
    start.setDate(start.getDate() - start.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const dateStr = date.toISOString().slice(0, 10);

      const total = entries
        .filter((e) => e.date === dateStr)
        .reduce((acc, e) => acc + e.duration, 0);

      return {
        name: daysShort[i],
        sure: total,
      };
    });
  };

  return (
    <>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Bu Haftanın Egzersiz Dağılımı
      </Typography>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={getWeekChartData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="sure" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
