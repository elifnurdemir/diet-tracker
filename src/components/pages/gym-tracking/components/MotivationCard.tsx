// MotivasyonCard.tsx
import { useEffect, useState } from "react";
import { Card, Typography, Box, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const quotes = [
  "Bugünün hareketi yarının gücüdür. 💪",
  "Ter, çaba demektir. Gururla parlasın. ✨",
  "5 dakika bile yapman, hiçbir şey yapmamaktan iyidir. 🔥",
  "Hedef: daha güçlü, daha huzurlu bir sen.",
  "Bir set daha... ve sonra bir tane daha. 🧠",
  "Bitki gibi hareketsiz kalma, sen insansın! 🌿😂",
  "Mert seni gururla izliyor olabilir. 🥰",
];

export default function MotivationCard() {
  const [quote, setQuote] = useState<string>("");

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <Card
      sx={{
        backgroundColor: "text.secondary",
        boxShadow: 3,
        borderRadius: 3,
        maxWidth: 300,
        mx: "auto",
        p: 2,
        position: "relative",
      }}
    >
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="h6" component="div" fontWeight="bold" color="gray">
          Günün Motivasyonu
        </Typography>
        <IconButton
          onClick={getRandomQuote}
          aria-label="yenile"
          size="medium"
          sx={{ ml: "auto" }}
        >
          <RefreshIcon />
        </IconButton>
      </Box>
      <Typography variant="body1" color="gray">
        {quote}
      </Typography>
    </Card>
  );
}
