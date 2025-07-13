import React from "react";
import {
  Box,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
  TableCell,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { format } from "date-fns";
import type { MealCellData } from "./types";

type Props = {
  mealKey: string;
  data?: MealCellData;
  date: Date;
  onUpdate: (key: string, changes: Partial<MealCellData>) => void;
  onInfoClick: () => void;
};

export const MealCell = ({ mealKey, data, onUpdate, onInfoClick }: Props) => {
  const cell = data || { checked: false, note: "" };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      onUpdate(mealKey, { image: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <TableCell
      sx={{
        minWidth: 200,
        minHeight: 200,
        verticalAlign: "top",
        border: "1px solid #ddd",
      }}
    >
      <Box display="flex" alignItems="center" gap={4}>
        <Checkbox
          checked={cell.checked}
          onChange={() => onUpdate(mealKey, { checked: !cell.checked })}
        />
        <Tooltip title="Bilgi">
          <IconButton onClick={onInfoClick} size="medium">
            <InfoIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Fotoğraf Ekle">
          <IconButton size="medium" component="label">
            <AddAPhotoIcon fontSize="medium" />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </IconButton>
        </Tooltip>
      </Box>

      {cell.image && (
        <Box mt={3}>
          <img src={cell.image} alt="yemek" style={{ width: "100%" }} />
        </Box>
      )}

      {cell.timestamp && (
        <Typography variant="caption" color="textSecondary">
          ⏱️ {format(new Date(cell.timestamp), "dd.MM.yyyy HH:mm")}
        </Typography>
      )}
    </TableCell>
  );
};
