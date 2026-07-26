import React, { useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  Tooltip,
  TableCell,
  TextField,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseIcon from "@mui/icons-material/Close";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import type { MealCellProps } from "./types";

export const MealCell = ({
  mealKey,
  data,
  onUpdate,
  onInfoClick,
}: MealCellProps) => {
  const cell = data || { checked: false, note: "" };
  const [nutritionAnchor, setNutritionAnchor] = useState<HTMLElement | null>(
    null
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      onUpdate(mealKey, { image: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleImageDelete = () => {
    onUpdate(mealKey, { image: undefined });
  };

  const handleNutritionChange =
    (field: "calories" | "protein" | "carbs" | "fat") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      onUpdate(mealKey, { [field]: raw === "" ? undefined : Number(raw) });
    };

  const imageSrc = cell.image
    ? cell.image
    : `https://picsum.photos/seed/${mealKey}/300/300`; // placeholder

  const hasNutrition =
    cell.calories !== undefined ||
    cell.protein !== undefined ||
    cell.carbs !== undefined ||
    cell.fat !== undefined;

  return (
    <TableCell
      sx={{
        width: { xs: "100%", sm: 200 },
        minHeight: { xs: "auto", sm: 200 },
        verticalAlign: "top",
        border: "1px solid #ddd",
        padding: 1,
      }}
    >
      <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
        <Checkbox
          checked={cell.checked}
          onChange={() => onUpdate(mealKey, { checked: !cell.checked })}
        />
        <Tooltip title="Bilgi">
          <IconButton onClick={onInfoClick} size="small">
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Fotoğraf Ekle">
          <IconButton size="small" component="label">
            <AddAPhotoIcon fontSize="small" />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </IconButton>
        </Tooltip>
        {cell.checked && (
          <Tooltip title="Beslenme Bilgisi">
            <IconButton
              size="small"
              color={hasNutrition ? "primary" : "default"}
              onClick={(e) => setNutritionAnchor(e.currentTarget)}
            >
              <RestaurantIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {cell.checked && hasNutrition && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 0.5 }}
        >
          {cell.calories ?? 0} kcal
          {(cell.protein || cell.carbs || cell.fat) &&
            ` · P${cell.protein ?? 0} K${cell.carbs ?? 0} Y${cell.fat ?? 0}`}
        </Typography>
      )}

      <Popover
        open={Boolean(nutritionAnchor)}
        anchorEl={nutritionAnchor}
        onClose={() => setNutritionAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Stack spacing={1.5} sx={{ p: 2, width: 200 }}>
          <Typography variant="subtitle2">Beslenme Bilgisi</Typography>
          <TextField
            size="small"
            type="number"
            label="Kalori"
            value={cell.calories ?? ""}
            onChange={handleNutritionChange("calories")}
          />
          <TextField
            size="small"
            type="number"
            label="Protein (g)"
            value={cell.protein ?? ""}
            onChange={handleNutritionChange("protein")}
          />
          <TextField
            size="small"
            type="number"
            label="Karbonhidrat (g)"
            value={cell.carbs ?? ""}
            onChange={handleNutritionChange("carbs")}
          />
          <TextField
            size="small"
            type="number"
            label="Yağ (g)"
            value={cell.fat ?? ""}
            onChange={handleNutritionChange("fat")}
          />
        </Stack>
      </Popover>

      <Box mt={1} position="relative">
        <img
          src={imageSrc}
          alt="yemek"
          style={{ width: "100%", height: "auto", maxWidth: "100%" }}
        />
        {cell.image && (
          <IconButton
            onClick={handleImageDelete}
            size="small"
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </TableCell>
  );
};
