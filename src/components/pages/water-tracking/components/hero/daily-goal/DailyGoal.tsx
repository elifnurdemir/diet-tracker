import { useUser } from "../../../../../../provider/UserProvider";
import { Box, CardContent, Typography, useTheme } from "@mui/material";

const getStepForScale = (max: number) => {
  if (max <= 500) return 100;
  if (max <= 1000) return 200;
  if (max <= 2000) return 250;
  if (max <= 3000) return 500;
  return 500;
};

export const DailyGoal = () => {
  const { dailyIdealWater, todayTotalWaterAmount } = useUser();
  const theme = useTheme();

  const percentage =
    dailyIdealWater && dailyIdealWater > 0
      ? (todayTotalWaterAmount / dailyIdealWater) * 100
      : 0;

  const topPercent = 100 - percentage;

  const marks = [];
  if (dailyIdealWater && dailyIdealWater > 0) {
    const step = getStepForScale(dailyIdealWater);
    for (let value = 0; value <= dailyIdealWater; value += step) {
      const position = (value / dailyIdealWater) * 100;
      marks.push({
        value,
        position: `${100 - position}%`,
        label: `${value}ml`,
      });
    }

    const lastMark = marks[marks.length - 1];
    if (lastMark?.value < dailyIdealWater) {
      marks.push({
        value: dailyIdealWater,
        position: `0%`,
        label: `${Math.round(dailyIdealWater)}ml`,
      });
    }
  }

  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  const waterColor = `${theme.palette.primary.main}cc`; // yarı saydam
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
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" color="text.secondary">
          Günlük Su İçme Hedefiniz
        </Typography>
        <Typography variant="body1" fontWeight="bold" color="text.secondary">
          %{Math.round(percentage)} tamamlandı
        </Typography>
      </Box>

      <Box
        sx={{
          width: 200,
          height: 400,
          border: `10px solid ${secondaryColor}`,
          borderTop: "none",
          borderBottomRightRadius: 80,
          borderBottomLeftRadius: 80,
          position: "relative",
          overflow: "hidden",
          backgroundColor: "transparent",
          boxShadow: `0 8px 25px ${primaryColor}22`,
        }}
      >
        <Box
          sx={{
            width: 600,
            height: 600,
            backgroundColor: waterColor,
            position: "absolute",
            top: `${topPercent}%`,
            left: "50%",
            borderRadius: "40%",
            transform: "translateX(-50%)",
            animation: "waves 8000ms linear infinite",
            transition: "top 2.5s ease-in-out",
            opacity: 0.95,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            width: 600,
            height: 600,
            backgroundColor: waterColor,
            position: "absolute",
            top: `${topPercent + 2}%`,
            left: "50%",
            borderRadius: "40%",
            transform: "translateX(-50%)",
            animation: "waves-reverse 8000ms linear 2000ms infinite",
            transition: "top 2.5s ease-in-out",
            zIndex: 0,
          }}
        />

        {/* iç ölçüm çizgileri */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "flex-end",
            justifyContent: "space-between",
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 10,
          }}
        >
          {marks.map((mark, index) => (
            <Box
              key={mark.value}
              sx={{
                backgroundColor: secondaryColor,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 2,
                px: 1,
                top: mark.position,
                visibility: index === 0 ? "hidden" : "visible",
              }}
            >
              <Typography variant="body2" sx={{ color: "white", fontSize: 12 }}>
                {mark.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* mevcut seviye çizgisi */}
        {dailyIdealWater && dailyIdealWater > 0 && (
          <Box
            sx={{
              position: "relative",
              top: `${topPercent}%`,
              width: "100%",
              display: "flex",
              alignItems: "center",
              zIndex: 100,
            }}
          >
            <Box
              sx={{
                width: "50%",
                height: 3,
                position: "absolute",
                right: 0,
                backgroundColor: primaryColor,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: primaryColor,
                  color: "white",
                  px: 1,
                  py: 0.25,
                  borderRadius: 2,
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {Math.round(todayTotalWaterAmount)}ml
              </Box>
            </Box>
          </Box>
        )}

        {/* görsel derinlik efekti */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, transparent 0%, ${primaryColor}22 100%)`,
            pointerEvents: "none",
            zIndex: 4,
          }}
        />

        {/* wave animation css */}
        <style>{`
          @keyframes waves {
            0% { transform: translateX(-50%) rotate(0deg); }
            100% { transform: translateX(-50%) rotate(360deg); }
          }
          @keyframes waves-reverse {
            0% { transform: translateX(-50%) rotate(360deg); }
            100% { transform: translateX(-50%) rotate(0deg); }
          }
        `}</style>
      </Box>

      {/* kalan miktar kutusu */}
      <Box
        sx={{
          backgroundColor: bgColor,
          borderRadius: 3,
          minWidth: 220,
          textAlign: "center",
          boxShadow: `0px 2px 8px ${primaryColor}33`,
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
            {Math.max(0, (dailyIdealWater ?? 0) - todayTotalWaterAmount)}ml
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
