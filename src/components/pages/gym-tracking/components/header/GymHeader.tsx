import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useThemeContext } from "../../../../../ThemeContext";
import { ExerciseSelectorButton } from "../ExerciseSelectorButton";
import { ExerciseForm } from "../ExerciseForm";

export const GymHeader = () => {
  const { setTheme } = useThemeContext();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setTheme("red");
  }, [setTheme]);

  const handleSave = (type: string, details: string) => {
    console.log("Egzersiz Kaydedildi:", { tür: type, detay: details });
    setIsFormOpen(false);
  };

  return (
    <Box>
      <ExerciseSelectorButton onClick={() => setIsFormOpen(!isFormOpen)} />
      {isFormOpen && <ExerciseForm onSave={handleSave} />}
    </Box>
  );
};
