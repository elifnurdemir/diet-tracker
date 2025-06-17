import { DailyGoal } from "./daily-goal/DailyGoal";
import { DrinkButton } from "./drink-button/DrinkButton";
import { Stack, Box } from "@mui/material";
import { WaterHeatmap } from "./water-heatmap/WaterHeatmap";
import { useThemeContext } from "../../../../../ThemeContext";
import { useEffect } from "react";
export const Hero = () => {
  const { setTheme } = useThemeContext();

  useEffect(() => {
    setTheme("blue");
  }, []);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={"center"}
      py={3}
      gap={20}
    >
      <Box>
        <DailyGoal />
      </Box>
      <Box>
        <WaterHeatmap />
        <DrinkButton />
      </Box>
    </Stack>
  );
};
