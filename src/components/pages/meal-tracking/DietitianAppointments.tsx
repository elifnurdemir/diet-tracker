import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toDateKey } from "../../utils/dateUtils";
import type { DietitianAppointment } from "./dietTypes";

type Props = {
  appointments: DietitianAppointment[];
  onAdd: (appointment: Omit<DietitianAppointment, "id">) => void;
  onDelete: (id: string) => void;
};

export const DietitianAppointments = ({
  appointments,
  onAdd,
  onDelete,
}: Props) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dietitianName, setDietitianName] = useState("");
  const [notes, setNotes] = useState("");

  const handleAdd = () => {
    if (!date) return;
    onAdd({
      date,
      time: time || undefined,
      dietitianName: dietitianName || undefined,
      notes: notes || undefined,
    });
    setDate("");
    setTime("");
    setDietitianName("");
    setNotes("");
  };

  const todayStr = toDateKey(new Date());
  const sorted = [...appointments].sort(
    (a, b) =>
      a.date.localeCompare(b.date) || (a.time ?? "").localeCompare(b.time ?? "")
  );

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Yeni Randevu Ekle
          </Typography>
          <Stack direction="row" gap={2} flexWrap="wrap">
            <TextField
              type="date"
              label="Tarih"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 160 }}
            />
            <TextField
              type="time"
              label="Saat"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 140 }}
            />
            <TextField
              label="Diyetisyen"
              value={dietitianName}
              onChange={(e) => setDietitianName(e.target.value)}
              sx={{ minWidth: 180 }}
            />
            <TextField
              label="Not"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{ minWidth: 220, flex: 1 }}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleAdd}
            disabled={!date}
          >
            Randevu Ekle
          </Button>
        </CardContent>
      </Card>

      <Stack gap={1.5}>
        {sorted.length === 0 && (
          <Typography color="text.secondary">
            Henüz randevu eklenmedi.
          </Typography>
        )}
        {sorted.map((appt) => {
          const isPast = appt.date < todayStr;
          return (
            <Card key={appt.id} sx={{ opacity: isPast ? 0.6 : 1 }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Box>
                  <Stack
                    direction="row"
                    gap={1}
                    alignItems="center"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography fontWeight={700}>
                      {appt.date}
                      {appt.time ? ` · ${appt.time}` : ""}
                    </Typography>
                    <Chip
                      size="small"
                      label={isPast ? "Geçti" : "Yaklaşan"}
                      color={isPast ? "default" : "primary"}
                    />
                  </Stack>
                  {appt.dietitianName && (
                    <Typography variant="body2" color="text.secondary">
                      {appt.dietitianName}
                    </Typography>
                  )}
                  {appt.notes && (
                    <Typography variant="body2" color="text.secondary">
                      {appt.notes}
                    </Typography>
                  )}
                </Box>
                <IconButton
                  onClick={() => onDelete(appt.id)}
                  aria-label="Randevuyu sil"
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};
