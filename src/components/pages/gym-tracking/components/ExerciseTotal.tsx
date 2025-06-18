import { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

export const ExerciseTotal = () => {
  const [weeklyCount, setWeeklyCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      // localStorage'dan güncel veriyi çek
      const stored = localStorage.getItem("exercises");
      const exercises = stored ? JSON.parse(stored) : [];

      const today = new Date();
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay());

      const count = exercises.filter((ex: { date: string }) => {
        const exDate = new Date(ex.date);
        return exDate >= firstDayOfWeek && exDate <= today;
      }).length;

      setWeeklyCount(count);
    };

    updateCount(); // component açılır açılmaz yükle

    window.addEventListener("storageUpdate", updateCount);

    return () => window.removeEventListener("storageUpdate", updateCount);
  }, []);

  return (
    <Stack mt={2} justifyContent={"center"} alignItems={"center"}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Haftalık Toplam Egzersiz : {weeklyCount}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
};
