import { useEffect } from "react";
import { Box } from "@mui/material";
import { useThemeContext } from "../../../../../ThemeContext";
import { ExerciseButton } from "../ExerciseButton";
import MotivationCard from "../MotivationCard";
import { ExerciseTotal } from "../ExerciseTotal";

export const GymHeader = () => {
  const { setTheme } = useThemeContext();

  useEffect(() => {
    setTheme("red");
  }, [setTheme]);

  return (
    <Box>
      <MotivationCard />
      <ExerciseButton />
      <ExerciseTotal />
    </Box>
  );
};
