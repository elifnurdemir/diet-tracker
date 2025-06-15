import { Button } from "@mui/material";

// adım 1: prop tipi tanımla
interface ExerciseSelectorButtonProps {
  onClick?: () => void;
}

// adım 2: prop'u parametre olarak al
export const ExerciseSelectorButton = ({
  onClick,
}: ExerciseSelectorButtonProps) => {
  return (
    <Button variant="contained" onClick={onClick}>
      Egzersiz Ekle
    </Button>
  );
};
