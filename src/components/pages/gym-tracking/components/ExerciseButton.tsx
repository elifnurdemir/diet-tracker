import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { ExerciseForm } from "./ExerciseForm";

export const ExerciseButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (exercise: {
    name: string;
    duration: number;
    date: string;
    description: string;
  }) => {
    // önce mevcut veriyi çek
    const existingData = localStorage.getItem("exercises");
    const exercises = existingData ? JSON.parse(existingData) : [];

    // yeni veriyi ekle
    const updatedData = [...exercises, exercise];

    // tekrar localStorage'a yaz
    localStorage.setItem("exercises", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("storageUpdate"));

    console.log("Egzersiz kaydedildi:", exercise);
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
          backgroundColor: "background.paper",
          color: "text.primary",
          textTransform: "capitalize",
        }}
      >
        Egzersiz Ekle
      </Button>
      <ExerciseForm open={open} onClose={handleClose} onSubmit={handleSubmit} />
    </Stack>
  );
};
