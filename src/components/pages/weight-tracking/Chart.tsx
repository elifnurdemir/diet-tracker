import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { format, parseISO } from "date-fns";
import { tr } from "date-fns/locale";
import type { WeightEntry } from "./types";
import { PAGE_ACCENTS } from "../../../theme";

const formatDateTick = (date: string) =>
  format(parseISO(date), "d MMM", { locale: tr });

const Chart = ({ entries }: { entries: WeightEntry[] }) => {
  const theme = useTheme();
  const accent = PAGE_ACCENTS.weight[theme.palette.mode];
  const hasGoal = entries.some((e) => e.goal !== undefined);

  if (entries.length < 2) {
    return (
      <Box
        sx={{
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography color="text.secondary">
          {entries.length === 0
            ? "Henüz kilo girişi yok."
            : "Trend görmek için en az bir kilo girişi daha ekle."}
        </Typography>
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={entries}
        margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey="date"
          tickFormatter={formatDateTick}
          stroke={theme.palette.text.secondary}
        />
        <YAxis
          domain={["dataMin - 1", "dataMax + 1"]}
          tickFormatter={(v) => `${v} kg`}
          stroke={theme.palette.text.secondary}
          width={70}
        />
        <Tooltip
          labelFormatter={(date) => formatDateTick(date as string)}
          formatter={(value: number) => [`${value} kg`]}
        />
        <Legend
          formatter={(value) => (value === "weight" ? "Kilo" : "Hedef")}
        />
        <Line
          type="monotone"
          dataKey="weight"
          name="weight"
          stroke={accent}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        {hasGoal && (
          <Line
            type="monotone"
            dataKey="goal"
            name="goal"
            stroke={alpha(accent, 0.45)}
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
