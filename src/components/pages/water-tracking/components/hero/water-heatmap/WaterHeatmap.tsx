import { Container, Stack } from "@mui/material";
import { ActivityHeatmap } from "../../../../../utils/ActivityHeatmap.tsx";
import { useUser } from "../../../../../../provider/UserProvider.tsx";

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
