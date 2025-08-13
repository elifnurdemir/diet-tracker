import React from "react";
import { Box, Checkbox, IconButton, Tooltip, TableCell } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseIcon from "@mui/icons-material/Close";
import type { MealCellProps } from "./types";

export const MealCell = ({
  mealKey,
  data,
  onUpdate,
  onInfoClick,
}: MealCellProps) => {
  const cell = data || { checked: false, note: "" };

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

  const imageSrc = cell.image
    ? cell.image
    : `https://picsum.photos/seed/${mealKey}/300/300`; // placeholder

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
      </Box>

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
