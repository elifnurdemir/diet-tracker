// components/Calendar/AddExerciseDialog.tsx

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import exerciseColors from "../constants/exerciseColors";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  selectedDate: string | null;
  duration: string;
  exerciseType: keyof typeof exerciseColors | "";
  setDuration: (val: string) => void;
  setExerciseType: (val: keyof typeof exerciseColors) => void;
};

export default function AddExerciseDialog({
  open,
  onClose,
  onSave,
  selectedDate,
  duration,
  exerciseType,
  setDuration,
  setExerciseType,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Egzersiz Ekle ({selectedDate})</DialogTitle>
      <DialogContent>
        <TextField
          label="Süre (dk)"
          type="number"
          fullWidth
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          margin="normal"
        />
        <TextField
          select
          label="Egzersiz Türü"
          fullWidth
          value={exerciseType}
          onChange={(e) =>
            setExerciseType(e.target.value as keyof typeof exerciseColors)
          }
          margin="normal"
        >
          {Object.keys(exerciseColors).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button variant="contained" onClick={onSave}>
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
}
