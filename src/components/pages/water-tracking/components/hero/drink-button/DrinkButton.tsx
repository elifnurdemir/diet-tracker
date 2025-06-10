import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { useUser } from "../../../../../../provider/UserProvider";
import { WaterIntakeDialog } from "./components/WaterIntakeDialog";

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
    <Stack direction="row" alignItems="center" justifyContent="center">
      <Button variant="contained" size="large" onClick={handleClickOpen}>
        Su içtim! +
      </Button>
      <WaterIntakeDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Stack>
  );
};
