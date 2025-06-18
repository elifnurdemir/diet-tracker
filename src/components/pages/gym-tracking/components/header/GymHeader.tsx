import { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useThemeContext } from "../../../../../ThemeContext";
import { ExerciseButton } from "../ExerciseButton";
import MotivationCard from "../MotivationCard";
import { ExerciseTotal } from "../ExerciseTotal";
import { ExerciseHeatmap } from "../ExerciseHeatmap";

export const GymHeader = () => {
  const { setTheme } = useThemeContext();

  useEffect(() => {
    setTheme("red");
  }, [setTheme]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={"center"}
      py={3}
      gap={20}
    >
      <Box>
        <ExerciseButton />
        <ExerciseTotal />
        <MotivationCard />
        <ExerciseHeatmap />
      </Box>
    </Stack>
  );
};
