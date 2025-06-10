import { useUser } from "../../../../../../provider/UserProvider";
import { Typography, Box, Stack } from "@mui/material";

export const DailyGoal = () => {
  const { dailyIdealWater, todayTotalWaterAmount } = useUser();

  const topPercent =
    dailyIdealWater && dailyIdealWater > 0
      ? 100 - (todayTotalWaterAmount / dailyIdealWater) * 100
      : 100;

  const marks = [];
  if (dailyIdealWater && dailyIdealWater > 0) {
    for (let i = 0; i <= 4; i++) {
      const value = (dailyIdealWater / 4) * (4 - i); // Reverse the values
      marks.push({
        value: value,
        position: `${(i / 4) * 100}%`,
      });
    }
  }

  // Calculate position for current water amount mark
  const currentMarkPosition =
    dailyIdealWater && dailyIdealWater > 0
      ? `${(1 - todayTotalWaterAmount / dailyIdealWater) * 100}%`
      : "0%";

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      {/* Water level and wave */}
      <Box
        sx={{
          width: "128px",
          height: "256px",
          border: "5px solid gray",
          borderTop: "none",
          borderBottomRightRadius: "25px",
          borderBottomLeftRadius: "25px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "512px",
            height: "512px",
            backgroundColor: "#33cfff",
            position: "absolute",
            top: `${topPercent}%`,
            left: "50%",
            borderRadius: "40%",
            transform: "translateX(-50%)",
            animation: "waves 7000ms linear infinite",
            transition: "top 2s ease",
          }}
        ></Box>

        <style>{`
          @keyframes waves {
            0% {
              transform: translateX(-50%) rotate(0deg);
            }
            100% {
              transform: translateX(-50%) rotate(360deg);
            }
          }
        `}</style>
      </Box>

      {/* Ruler part */}
      <Box
        sx={{
          height: "256px",
          width: "60px",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: "10px",
          boxSizing: "border-box",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            width: "2px",
            backgroundColor: "gray",
          }}
        />
        <Box>
          {marks.map((mark, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                left: "10px",
                top: `calc(${mark.position} - 8px)`, // Adjust for text height
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Small horizontal line for the mark */}
              <Box
                sx={{
                  width: "10px",
                  height: "2px",
                  backgroundColor: "gray",
                  marginRight: "4px",
                }}
              />
              {/* Label */}
              <Typography variant="body2">
                {Math.round(mark.value)}ml
              </Typography>
            </Box>
          ))}
          {dailyIdealWater && dailyIdealWater > 0 && (
            <Box
              sx={{
                position: "absolute",
                left: "10px",
                top: `calc(${currentMarkPosition} - 8px)`,
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Red indicator for current level */}
              <Box
                sx={{
                  width: "60px",
                  height: "2px",
                  backgroundColor: "#33cfff",
                  marginRight: "4px",
                }}
              />
              {/* Label */}
              <Typography
                variant="body2"
                sx={{ color: "#33cfff", fontWeight: "bold" }}
              >
                {Math.round(todayTotalWaterAmount)}ml
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Stack>
  );
};
