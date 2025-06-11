import { Container, Stack } from "@mui/material";
import { ActivityHeatmap } from "../../../../../utils/ActivityHeatmap.tsx";
import { useUser } from "../../../../../../provider/UserProvider.tsx";

const mockWaterData = [
  { date: "2025-06-01", value: 1800 },
  { date: "2025-06-02", value: 2000 },
  { date: "2025-06-03", value: 900 },
];

export const WaterHeatmap = () => {
  const { waterHeatmapData, dailyIdealWater } = useUser();

  console.log(waterHeatmapData);

  return (
    <Container sx={{ mt: 4 }}>
      <Stack spacing={4}>
        <ActivityHeatmap
          data={waterHeatmapData}
          goal={dailyIdealWater || 2000}
          title="Su Takibi"
          unit="ml"
        />
      </Stack>
    </Container>
  );
};
