import { Box, Button, Typography } from "@mui/material";
import { format } from "date-fns";

type Props = {
  currentDate: Date;
  goWeek: (n: number) => void;
};

export const WeekNavigator = ({ currentDate, goWeek }: Props) => (
  <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
    <Button variant="outlined" onClick={() => goWeek(-1)}>
      ⬅️ Önceki Hafta
    </Button>
    <Typography variant="h6">
      {format(currentDate, "'Hafta' w - yyyy")}
    </Typography>
    <Button variant="outlined" onClick={() => goWeek(1)}>
      Sonraki Hafta ➡️
    </Button>
  </Box>
);
