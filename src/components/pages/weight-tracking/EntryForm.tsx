import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  LinearProgress,
  Collapse,
} from "@mui/material";
import { views, type PhotoView, type WeightEntry } from "./types";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface Props {
  onSubmit: (entry: WeightEntry) => void;
  loading: boolean;
}

const EntryForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [open, setOpen] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  const [weight, setWeight] = useState<number | "">("");
  const [goal, setGoal] = useState<number | "">("");
  const [photos, setPhotos] = useState<Record<PhotoView, string | undefined>>({
    ön: undefined,
    yan: undefined,
    arka: undefined,
  });

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    view: PhotoView
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotos((prev) => ({ ...prev, [view]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!date || !weight) return;
    onSubmit({
      date,
      weight: Number(weight),
      goal: goal === "" ? undefined : Number(goal),
      photos,
    });
    setDate("");
    setWeight("");
    setGoal("");
    setPhotos({ ön: undefined, yan: undefined, arka: undefined });
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={() => setOpen((prev) => !prev)}
        sx={{ mb: 2 }}
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
      >
        {open ? "Gizle" : "➕ Haftalık Kilo Girişi"}
      </Button>

      <Collapse in={open}>
        <Box
          sx={{
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            type="date"
            label="Tarih"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />
          <TextField
            type="number"
            label="Kilo (kg)"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            sx={{ minWidth: 120 }}
          />
          <TextField
            type="number"
            label="Haftalık Hedef (kg)"
            value={goal}
            onChange={(e) =>
              setGoal(e.target.value === "" ? "" : Number(e.target.value))
            }
            sx={{ minWidth: 120 }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 5,
            mt: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {views.map((view) => (
            <Box key={view} sx={{ textAlign: "center" }}>
              <InputLabel>{view.toUpperCase()} Fotoğraf</InputLabel>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoChange(e, view)}
                style={{ display: "block", margin: "8px auto" }}
              />
              {photos[view] && (
                <img
                  src={photos[view]}
                  alt={`${view} preview`}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 8,
                    marginTop: 4,
                    border: "1px solid #ccc",
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ mt: 3, display: "block", mx: "auto" }}
        >
          Kaydet
        </Button>
        {loading && <LinearProgress sx={{ mt: 2 }} />}
      </Collapse>
    </Box>
  );
};

export default EntryForm;
