import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

interface ExerciseFormProps {
  onSave: (type: string, details: string) => void;
}

export const ExerciseForm = ({ onSave }: ExerciseFormProps) => {
  const [exerciseType, setExerciseType] = useState("");
  const [exerciseDetails, setExerciseDetails] = useState("");

  const handleSave = () => {
    onSave(exerciseType, exerciseDetails);
    setExerciseType("");
    setExerciseDetails("");
  };

  return (
    <Box mt={2} p={2} bgcolor="primary.main" borderRadius={2} boxShadow={2}>
      <Typography variant="h6">Yeni Egzersiz Ekle</Typography>

      <Select
        fullWidth
        value={exerciseType}
        onChange={(e) => setExerciseType(e.target.value)}
        displayEmpty
        sx={{ mt: 2 }}
      >
        <MenuItem value="" disabled>
          Egzersiz Türü Seçin
        </MenuItem>
        <MenuItem value="Ağırlık">Ağırlık</MenuItem>
        <MenuItem value="Yoga">Yoga</MenuItem>
        <MenuItem value="Kardiyo">Kardiyo</MenuItem>
      </Select>

      <TextField
        fullWidth
        label="Detaylar (ör. set/süre)"
        multiline
        rows={3}
        value={exerciseDetails}
        onChange={(e) => setExerciseDetails(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSave}
      >
        Kaydet
      </Button>
    </Box>
  );
};
