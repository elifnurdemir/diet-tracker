import { useMemo, useState } from "react";
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
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { format, parseISO } from "date-fns";
import { tr } from "date-fns/locale";
import type { WeightEntry } from "./types";
import { PAGE_ACCENTS } from "../../../theme";
import { toDateKey } from "../../utils/dateUtils";

const formatDateTick = (date: string) =>
  format(parseISO(date), "d MMM", { locale: tr });

type RangeOption = "7" | "30" | "90" | "all";

const RANGE_OPTIONS: { value: RangeOption; label: string }[] = [
  { value: "7", label: "Haftalık" },
  { value: "30", label: "Aylık" },
  { value: "90", label: "Son 3 Ay" },
  { value: "all", label: "Tümü" },
];

const Chart = ({ entries }: { entries: WeightEntry[] }) => {
  const theme = useTheme();
  const accent = PAGE_ACCENTS.weight[theme.palette.mode];
  const [range, setRange] = useState<RangeOption>("all");

  const filteredEntries = useMemo(() => {
    if (range === "all") return entries;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - Number(range));
    const cutoffKey = toDateKey(cutoff);
    return entries.filter((e) => e.date >= cutoffKey);
  }, [entries, range]);

  const hasGoal = filteredEntries.some((e) => e.goal !== undefined);

  // Y eksenini yalnızca gerçek kilo değerlerine göre ölçekle — hedef kilo
  // genellikle mevcut kilodan çok uzak olur (ör. 30kg fark), onu da domine
  // ettirirsek kilo çizgisi grafiğin tepesine sıkışıp altı boş kalır. Hedef
  // çizgisi yine çizilir, sadece eksenin dışına taşarsa orada kırpılır.
  //
  // Ölçek en GÜNCEL kiloya göre kurulur: ondan makul bir sapma (±25kg) içinde
  // kalan girişler dikkate alınır. Geçmişte kalmış tek bir aykırı/yanlış
  // girilmiş değer (ör. yanlışlıkla "1" yazılmış bir kayıt) böylece tüm
  // ekseni germez — kaç giriş olursa olsun güncel trend her zaman net görünür.
  const yDomain = useMemo((): [number, number] | undefined => {
    const weights = filteredEntries.map((e) => e.weight);
    if (weights.length === 0) return undefined;
    const latest = weights[weights.length - 1];
    const REASONABLE_DELTA = 25;
    const relevant = weights.filter(
      (w) => Math.abs(w - latest) <= REASONABLE_DELTA
    );
    const dataMin = Math.min(...relevant);
    const dataMax = Math.max(...relevant);
    const padding = Math.max(3, (dataMax - dataMin) * 0.3);
    return [Math.floor(dataMin - padding), Math.ceil(dataMax + padding)];
  }, [filteredEntries]);

  const rangeSelector = (
    <ToggleButtonGroup
      value={range}
      exclusive
      size="small"
      onChange={(_, value: RangeOption | null) => value && setRange(value)}
      sx={{ mb: 2 }}
    >
      {RANGE_OPTIONS.map((opt) => (
        <ToggleButton
          key={opt.value}
          value={opt.value}
          sx={{ px: 1.5, py: 0.5 }}
        >
          {opt.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );

  if (filteredEntries.length < 2) {
    return (
      <Box>
        {entries.length >= 2 && rangeSelector}
        <Box
          sx={{
            height: 340,
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
              : entries.length === 1
                ? "Trend görmek için en az bir kilo girişi daha ekle."
                : "Bu tarih aralığında yeterli veri yok."}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {rangeSelector}
      <ResponsiveContainer width="100%" height={340}>
        <LineChart
          data={filteredEntries}
          margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDateTick}
            stroke={theme.palette.text.secondary}
            tickMargin={10}
          />
          <YAxis
            domain={yDomain}
            allowDataOverflow
            tickFormatter={(v) => `${v} kg`}
            stroke={theme.palette.text.secondary}
            width={84}
            tickMargin={10}
            tickCount={6}
          />
          <Tooltip
            labelFormatter={(date) => formatDateTick(date as string)}
            formatter={(value: number) => [`${value} kg`]}
            allowEscapeViewBox={{ x: false, y: false }}
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
    </Box>
  );
};

export default Chart;
