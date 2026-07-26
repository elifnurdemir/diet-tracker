import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

type Props = {
  open: boolean;
  day: string | null;
  mealLabel: string | null;
  initialValue: string;
  onClose: () => void;
  onSave: (value: string) => void;
  onDelete: () => void;
};

export const DietItemDialog = ({
  open,
  day,
  mealLabel,
  initialValue,
  onClose,
  onSave,
  onDelete,
}: Props) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {day} · {mealLabel}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          multiline
          minRows={3}
          label="Diyetisyenin önerdiği öğün"
          placeholder="ör. 150g ızgara tavuk, bol yeşil salata, 1 dilim tam buğday ekmeği"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        {initialValue && (
          <Button color="error" onClick={onDelete}>
            Sil
          </Button>
        )}
        <Button onClick={onClose}>İptal</Button>
        <Button variant="contained" onClick={() => onSave(value)}>
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};
