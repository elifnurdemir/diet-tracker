import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

type ExerciseData = {
  name: string;
  duration: number;
  date: string;
  description: string;
};

type ExerciseFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (exercise: ExerciseData) => void;
};

export const ExerciseForm: React.FC<ExerciseFormProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (name && duration && date) {
      onSubmit({
        name,
        duration: Number(duration),
        date,
        description,
      });
      // reset
      setName("");
      setDuration("");
      setDate("");
      setDescription("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Yeni Egzersiz Ekle</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Egzersiz Adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Süre (dk)"
            type="number"
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value === "" ? "" : Number(e.target.value))
            }
            fullWidth
          />
          <TextField
            label="Tarih"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            minRows={2}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          İptal
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Ekle
        </Button>
      </DialogActions>
    </Dialog>
  );
};
