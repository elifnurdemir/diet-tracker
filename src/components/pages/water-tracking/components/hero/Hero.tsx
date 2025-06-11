import { DailyGoal } from "./daily-goal/DailyGoal";
import { DrinkButton } from "./drink-button/DrinkButton";
import { Stack, Box } from "@mui/material";
import { WaterHeatmap } from "./water-heatmap/WaterHeatmap";
export const Hero = () => {
  return (
    <Stack
      direction="row"
      alignItems="stretch"
      justifyContent={"center"}
      py={5}
    >
      <Box>
        <DailyGoal />
      </Box>
      <DrinkButton />
      <Box>
        <WaterHeatmap />
      </Box>
    </Stack>
  );
};
