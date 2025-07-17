import { Card, CardContent, Typography, Box } from "@mui/material";
import { getMotivation } from "./helpers";

const MotivationCard = ({ week }: { week: number }) => (
  <Box mt={4}>
    <Typography variant="h6">💬 Haftalık Motivasyon</Typography>
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <Typography>{getMotivation(week)}</Typography>
      </CardContent>
    </Card>
  </Box>
);

export default MotivationCard;
