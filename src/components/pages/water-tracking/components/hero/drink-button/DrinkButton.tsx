import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { useUser } from "../../../../../../provider/UserProvider";
import { WaterIntakeDialog } from "./components/WaterIntakeDialog";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";

export const DrinkButton = () => {
  const [open, setOpen] = useState(false);
  const { addWaterEntry } = useUser();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (amount: number) => {
    addWaterEntry(amount);
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" flex="1">
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          fontSize: "1.25rem",
          padding: "14px 36px",
          borderRadius: "16px",
          minWidth: "220px",
          minHeight: "64px",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <LocalDrinkIcon sx={{ fontSize: 30 }} />
        Su içtim!
      </Button>
      <WaterIntakeDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Stack>
  );
};
