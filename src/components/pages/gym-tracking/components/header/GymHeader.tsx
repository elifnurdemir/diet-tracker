import { useEffect } from "react";
import { Box, Container, Stack } from "@mui/material";
import { useThemeContext } from "../../../../../ThemeContext";
import { ExerciseButton } from "../ExerciseButton";
import MotivationCard from "../MotivationCard";
import { ExerciseTotal } from "../ExerciseTotal";
import { ExerciseHeatmap } from "../ExerciseHeatmap";
import { FavoriteExercise } from "../FavoriteExercise";
import { Directions } from "@mui/icons-material";

export const GymHeader = () => {
  const { setTheme } = useThemeContext();

  useEffect(() => {
    setTheme("red");
  }, [setTheme]);

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      py={3}
      spacing={4} // dikey boşluk
    >
      <ExerciseButton />

      {/* 3 Kartı Yana Yana Hizala */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        flexWrap="wrap"
      >
        <ExerciseTotal />
        <FavoriteExercise />
        <MotivationCard />
      </Stack>

      {/* Heatmap'i Ortala */}
      <Box width="100%" display="flex" justifyContent="center">
        <Box maxWidth="md" width="100%">
          <ExerciseHeatmap />
        </Box>
      </Box>
    </Stack>
  );
};
