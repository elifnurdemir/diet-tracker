import { Box, CardContent, Typography, useTheme } from "@mui/material";
import { useUser } from "../../../../../../provider/UserProvider";
import { generateMarks } from "../../../../../utils/water";
import { WaterTank } from "./WaterTank";

export const DailyGoal = () => {
  const { dailyIdealWater, todayTotalWaterAmount } = useUser();
  const theme = useTheme();

  const percentage = (todayTotalWaterAmount / dailyIdealWater) * 100;
  const marks = generateMarks(dailyIdealWater);
  const bgColor = theme.palette.background.paper;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        p: 3,
      }}
    >
      {/* Başlık */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" color="text.secondary">
          Günlük Su İçme Hedefiniz
        </Typography>
        <Typography variant="body1" fontWeight="bold" color="text.secondary">
          %{Math.round(percentage)} tamamlandı
        </Typography>
      </Box>

      {/* Water Tank */}
      <WaterTank
        dailyIdealWater={dailyIdealWater}
        todayTotalWaterAmount={todayTotalWaterAmount}
        percentage={percentage}
        marks={marks}
      />

      {/* Kalan miktar kutusu */}
      <Box
        sx={{
          backgroundColor: bgColor,
          borderRadius: 3,
          minWidth: 220,
          textAlign: "center",
          boxShadow: `0px 2px 8px ${theme.palette.primary.main}33`,
        }}
      >
        <CardContent>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Kalan miktar
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: "bold",
              mb: 1,
            }}
          >
            {Math.max(0, dailyIdealWater - todayTotalWaterAmount)}ml
          </Typography>
          <Typography variant="caption" color="text.primary">
            {percentage >= 100 ? "Hedef tamamlandı! 🎉" : "hedefe ulaşmak için"}
          </Typography>
        </CardContent>
      </Box>
    </Box>
  );
};

export default DailyGoal;
