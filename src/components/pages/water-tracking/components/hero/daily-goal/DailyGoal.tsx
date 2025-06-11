import { useUser } from "../../../../../../provider/UserProvider";
import { Box, Typography } from "@mui/material";
export const DailyGoal = () => {
  const { dailyIdealWater, todayTotalWaterAmount } = useUser();

  const percentage =
    dailyIdealWater && dailyIdealWater > 0
      ? (todayTotalWaterAmount / dailyIdealWater) * 100
      : 0;

  const topPercent = 100 - percentage;

  // Create marks for the scale inside the container
  const marks = [];
  if (dailyIdealWater && dailyIdealWater > 0) {
    for (let i = 0; i <= 4; i++) {
      const value = (dailyIdealWater / 4) * i;
      const position = (i / 4) * 100;
      marks.push({
        value: value,
        position: `${100 - position}%`, // Invert for bottom-to-top
        label: value === 0 ? "0ml" : `${Math.round(value)}ml`,
      });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "24px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#2c5aa0",
            margin: "0 0 8px 0",
          }}
        >
          Günlük Su Hedefi
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#666",
            margin: "0 0 4px 0",
          }}
        >
          {Math.round(todayTotalWaterAmount)}ml /{" "}
          {Math.round(dailyIdealWater ?? 0)}
          ml
        </p>
        <p
          style={{
            fontSize: "14px",
            color: "#33cfff",
            fontWeight: "bold",
            margin: "0",
          }}
        >
          %{Math.round(percentage)} tamamlandı
        </p>
      </div>

      {/* Water Container with Internal Scale */}
      <div
        style={{
          width: "360px",
          height: "320px",
          border: "6px solid #2c5aa0",
          borderTop: "none",
          borderBottomRightRadius: "30px",
          borderBottomLeftRadius: "30px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f8f9fa",
          boxShadow: "0 8px 25px rgba(44, 90, 160, 0.15)",
        }}
      >
        {/* Water Level with Wave Animation */}
        <div
          style={{
            width: "600px",
            height: "600px",
            backgroundColor: "#33cfff88",
            position: "absolute",
            top: `${topPercent}%`,
            left: "50%",
            borderRadius: "40%",
            transform: "translateX(-50%)",
            animation: "waves 8000ms linear infinite",
            transition: "top 2.5s ease-in-out",
            opacity: 0.85,
            zIndex: 1,
          }}
        />

        {/* Secondary Wave for More Realistic Effect */}
        <div
          style={{
            width: "600px",
            height: "600px",
            backgroundColor: "#33cfff88",
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "flex-end",
            justifyContent: "space-between",
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: "10",
          }}
        >
          {marks.map((mark) => (
            <Box
              sx={{
                backgroundColor: "#2c5aa0",
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
                px: 1,
              }}
            >
              <Typography variant={"body2"}>{mark.label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Current Level Indicator */}
        {dailyIdealWater && dailyIdealWater > 0 && (
          <div
            style={{
              position: "absolute",
              left: "8px",
              right: "8px",
              top: `${topPercent}%`,
              display: "flex",
              alignItems: "center",
              zIndex: 3,
              transform: "translateY(-1px)",
            }}
          >
            {/* Current Level Line */}
            <div
              style={{
                flex: 1,
                height: "3px",
                backgroundColor: "#ff6b35",
                borderRadius: "2px",
                boxShadow: "0 0 8px rgba(255, 107, 53, 0.5)",
              }}
            />
            {/* Current Amount Badge */}
            <div
              style={{
                position: "absolute",
                left: "-40px",
                backgroundColor: "#ff6b35",
                color: "white",
                padding: "2px 6px",
                borderRadius: "12px",
                fontSize: "10px",
                fontWeight: "bold",
                boxShadow: "0 2px 8px rgba(255, 107, 53, 0.3)",
              }}
            >
              {Math.round(todayTotalWaterAmount)}ml
            </div>
          </div>
        )}

        {/* Gradient Overlay for Depth Effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, transparent 0%, rgba(44, 90, 160, 0.1) 100%)",
            pointerEvents: "none",
            zIndex: 4,
          }}
        />

        <style>{`
          @keyframes waves {
            0% {
              transform: translateX(-50%) rotate(0deg);
            }
            100% {
              transform: translateX(-50%) rotate(360deg);
            }
          }
          @keyframes waves-reverse {
            0% {
              transform: translateX(-50%) rotate(360deg);
            }
            100% {
              transform: translateX(-50%) rotate(0deg);
            }
          }
        `}</style>
      </div>

      {/* Progress Summary */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #e9ecef",
          minWidth: "200px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#666",
            margin: "0 0 8px 0",
          }}
        >
          Kalan miktar
        </p>
        <h3
          style={{
            fontSize: "24px",
            color: "#2c5aa0",
            fontWeight: "bold",
            margin: "0 0 4px 0",
          }}
        >
          {Math.max(0, (dailyIdealWater ?? 0) - todayTotalWaterAmount)}ml
        </h3>
        <p
          style={{
            fontSize: "12px",
            color: "#666",
            margin: "0",
          }}
        >
          {percentage >= 100 ? "Hedef tamamlandı! 🎉" : "hedefe ulaşmak için"}
        </p>
      </div>
    </div>
  );
};

export default DailyGoal;
