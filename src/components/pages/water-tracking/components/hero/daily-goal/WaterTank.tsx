import { Box, Typography, useTheme } from "@mui/material";

interface WaterTankProps {
  percentage: number;
  todayTotalWaterAmount: number;
  dailyIdealWater: number;
  marks: { value: number; position: string; label: string }[];
}

export const WaterTank = ({
  percentage,
  todayTotalWaterAmount,
  dailyIdealWater,
  marks,
}: WaterTankProps) => {
  const theme = useTheme();
  const topPercent = 100 - percentage;

  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  const waterColor = `${primaryColor}cc`;

  return (
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
      {[0, 2].map((offset, i) => (
        <Box
          key={i}
          sx={{
            width: 600,
            height: 600,
            backgroundColor: waterColor,
            position: "absolute",
            top: `${topPercent + offset}%`,
            left: "50%",
            borderRadius: "40%",
            transform: "translateX(-50%)",
            animation:
              i === 0
                ? "waves 8s linear infinite"
                : "waves-reverse 8s linear 2s infinite",
            transition: "top 2.5s ease-in-out",
            zIndex: i === 0 ? 1 : 0,
            opacity: i === 0 ? 0.95 : 1,
          }}
        />
      ))}

      {/* Ölçüm çizgileri */}
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

      {/* Mevcut seviye çizgisi */}
      {dailyIdealWater && (
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

      {/* Derinlik efekti */}
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

      {/* Wave animasyonu */}
      <style>{`
        @keyframes waves { 0% { transform: translateX(-50%) rotate(0deg); } 100% { transform: translateX(-50%) rotate(360deg); } }
        @keyframes waves-reverse { 0% { transform: translateX(-50%) rotate(360deg); } 100% { transform: translateX(-50%) rotate(0deg); } }
      `}</style>
    </Box>
  );
};
