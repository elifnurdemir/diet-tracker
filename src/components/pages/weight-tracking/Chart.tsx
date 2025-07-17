import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { WeightEntry } from "./types";

const Chart = ({ entries }: { entries: WeightEntry[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={entries}>
      <XAxis dataKey="date" />
      <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="weight"
        stroke="#4caf50"
        strokeWidth={2}
        dot={{ r: 4 }}
      />
      {entries.some((e) => e.goal !== undefined) && (
        <Line
          type="monotone"
          dataKey="goal"
          stroke="#ff9800"
          strokeDasharray="5 5"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      )}
    </LineChart>
  </ResponsiveContainer>
);

export default Chart;
