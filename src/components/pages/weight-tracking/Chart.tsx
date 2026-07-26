import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { alpha, useTheme } from "@mui/material/styles";
import type { WeightEntry } from "./types";
import { PAGE_ACCENTS } from "../../../theme";

const Chart = ({ entries }: { entries: WeightEntry[] }) => {
  const theme = useTheme();
  const accent = PAGE_ACCENTS.weight[theme.palette.mode];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={entries}>
        <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
        <YAxis
          domain={["dataMin - 1", "dataMax + 1"]}
          stroke={theme.palette.text.secondary}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="weight"
          stroke={accent}
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        {entries.some((e) => e.goal !== undefined) && (
          <Line
            type="monotone"
            dataKey="goal"
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
