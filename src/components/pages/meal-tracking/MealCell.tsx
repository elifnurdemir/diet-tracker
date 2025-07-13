import React from "react";
import {
  Box,
  Checkbox,
  IconButton,
  Tooltip,
  TextField,
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

export const MealCell = ({
  mealKey,
  data,
  date,
  onUpdate,
  onInfoClick,
}: Props) => {
  const cell = data || { checked: false, note: "" };
  const displayDate = format(date, "yyyy-MM-dd");

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
        minHeight: 180,
        verticalAlign: "top",
        border: "1px solid #ddd",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
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

      {cell.image && (
        <Box mt={1}>
          <img src={cell.image} alt="yemek" style={{ width: "100%" }} />
        </Box>
      )}

      <TextField
        placeholder={`Not - ${displayDate}`}
        value={cell.note}
        onChange={(e) => onUpdate(mealKey, { note: e.target.value })}
        multiline
        fullWidth
        size="small"
        margin="dense"
      />

      {cell.timestamp && (
        <Typography variant="caption" color="textSecondary">
          ⏱️ {format(new Date(cell.timestamp), "dd.MM.yyyy HH:mm")}
        </Typography>
      )}
    </TableCell>
  );
};
