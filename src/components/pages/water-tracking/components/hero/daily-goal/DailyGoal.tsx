import { useUser } from "../../../../../../provider/UserProvider";
import { Box, CardContent, Typography } from "@mui/material";

// yardimci fonksiyon: hedef miktara göre uygun aralık (step) belirler
const getStepForScale = (max: number) => {
  if (max <= 500) return 100;
  if (max <= 1000) return 200;
  if (max <= 2000) return 250;
  if (max <= 3000) return 500;
  return 500; // maksimum step'i 500 tut
};

export const DailyGoal = () => {
  const { dailyIdealWater, todayTotalWaterAmount } = useUser();

  // yüzde hesapla
  const percentage =
    dailyIdealWater && dailyIdealWater > 0
      ? (todayTotalWaterAmount / dailyIdealWater) * 100
      : 0;

  const topPercent = 100 - percentage;

  // iç ölçek (ölçüm çizgileri) oluştur
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

    // hedefin tam değeri eksikse son çizgiyi ekle
    const lastMark = marks[marks.length - 1];
    if (lastMark?.value < dailyIdealWater) {
      marks.push({
        value: dailyIdealWater,
        position: `0%`,
        label: `${Math.round(dailyIdealWater)}ml`,
      });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        padding: "24px",
      }}
    >
      {/* başlık ve toplam miktar */}
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "text.primary",
            margin: "0 0 8px",
          }}
        >
          Günlük Su İçme Hedefiniz
        </h2>
        <p
          style={{
            fontSize: "body1",
            color: "text.primary",
            fontWeight: "bold",
            margin: "4px 0 0",
          }}
        >
          %{Math.round(percentage)} tamamlandı
        </p>{" "}
      </div>

      {/* su kabı görseli */}
      <div
        style={{
          width: "320px",
          height: "320px",
          border: "6px solid #0F4C75",
          borderTop: "none",
          borderBottomRightRadius: "70px",
          borderBottomLeftRadius: "70px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "transparent",
          boxShadow: "0 8px 25px rgba(44, 90, 160, 0.15)",
        }}
      >
        {/* animasyonlu su seviyesi */}
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
            opacity: 0.95,
            zIndex: 1,
          }}
        />
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
          {marks.map((mark, index) => {
            return (
              <Box
                key={mark.value}
                sx={{
                  backgroundColor: "#0F4C75",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  px: 1,
                  top: mark.position,
                  visibility: index === 0 ? "hidden" : "visible",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontSize: "12px" }}
                >
                  {mark.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* mevcut seviye çizgisi */}
        {dailyIdealWater && dailyIdealWater > 0 && (
          <div
            style={{
              position: "relative",

              top: `${topPercent}%`,
              width: "100%",
              display: "flex",
              alignItems: "center",
              zIndex: 100,
            }}
          >
            <div
              style={{
                width: "50%",
                height: "3px",
                right: "0px",
                position: "absolute",
                backgroundColor: "#0F4C75",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#0F4C75",
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: "12px",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                {Math.round(todayTotalWaterAmount)}ml
              </div>
            </div>
          </div>
        )}

        {/* görsel derinlik için gradient overlay */}
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

        {/* wave animasyonları */}
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
      </div>

      {/* kalan miktar kutusu */}

      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 3,
          minWidth: 220,
          textAlign: "center",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <CardContent>
          <Typography variant="body2" color="text.primary" gutterBottom>
            Kalan miktar
          </Typography>

          <Typography
            variant="h4"
            sx={{ color: "white", fontWeight: "bold", mb: 1 }}
          >
            {Math.max(0, (dailyIdealWater ?? 0) - todayTotalWaterAmount)}ml
          </Typography>

          <Typography variant="caption" color="text.primary">
            {percentage >= 100 ? "Hedef tamamlandı! 🎉" : "hedefe ulaşmak için"}
          </Typography>
        </CardContent>
      </Box>
    </div>
  );
};

export default DailyGoal;
