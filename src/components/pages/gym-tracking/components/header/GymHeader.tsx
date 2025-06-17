import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useThemeContext } from "../../../../../ThemeContext";
import { ExerciseSelectorButton } from "../ExerciseSelectorButton";
import MotivationCard from "../MotivationCard";

export const GymHeader = () => {
  const { setTheme } = useThemeContext();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setTheme("red");
  }, [setTheme]);

  return (
    <Box>
      <MotivationCard />
      <ExerciseSelectorButton onClick={() => setIsFormOpen(!isFormOpen)} />
    </Box>
  );
};
