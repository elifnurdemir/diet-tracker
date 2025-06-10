import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";

interface WaterIntakeDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export const WaterIntakeDialog: React.FC<WaterIntakeDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ml = parseInt(amount, 10);
    if (!isNaN(ml) && ml > 0) {
      onSubmit(ml);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit,
        },
      }}
    >
      <DialogContent>
        <DialogContentText>Ne kadar su içtin?</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="ml"
          name="ml"
          label="İçtiğin su miktarı"
          type="number"
          fullWidth
          variant="standard"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">ml</InputAdornment>,
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          sx={{
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
            "& input[type=number]::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button type="submit">Kaydet</Button>
      </DialogActions>
    </Dialog>
  );
};
