import { DailyGoal } from "./daily-goal/DailyGoal";
import { DrinkButton } from "./drink-button/DrinkButton";
import { Stack, Box } from "@mui/material";
export const Hero = () => {
  return (
    <Stack direction="row" alignItems="stretch">
      <Box flex={1}>
        <DailyGoal />
      </Box>
      <Box flex={1}>
        <DrinkButton />
      </Box>
    </Stack>
  );
};
