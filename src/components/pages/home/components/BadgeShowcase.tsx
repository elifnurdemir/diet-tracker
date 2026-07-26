import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Collapse,
  Tooltip,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import type { Badge, BadgeCategory } from "../../../../hooks/useGamification";

type Props = { badges: Badge[] };

const CATEGORY_ORDER: BadgeCategory[] = [
  "su",
  "egzersiz",
  "kilo",
  "ogun",
  "seri",
  "seviye",
  "ozel",
];

const CATEGORY_LABELS: Record<BadgeCategory, string> = {
  su: "💧 Su",
  egzersiz: "🏋️ Egzersiz",
  kilo: "⚖️ Kilo",
  ogun: "🍽️ Öğün",
  seri: "🔥 Seri",
  seviye: "⭐ Seviye",
  ozel: "🎪 Özel",
};

export const BadgeShowcase = ({ badges }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box
          role="button"
          tabIndex={0}
          onClick={() => setExpanded((e) => !e)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setExpanded((v) => !v);
            }
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Başarılar
            </Typography>
            <Chip
              size="small"
              label={`${earnedCount}/${badges.length} rozet`}
              sx={{ fontWeight: 700 }}
            />
          </Box>
          <ExpandMore
            sx={{
              color: "text.secondary",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </Box>

        <Collapse in={expanded}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            {CATEGORY_ORDER.map((category) => {
              const categoryBadges = badges.filter(
                (b) => b.category === category
              );
              if (categoryBadges.length === 0) return null;

              return (
                <Box key={category}>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color="text.secondary"
                    sx={{ display: "block", mb: 1 }}
                  >
                    {CATEGORY_LABELS[category]}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                    {categoryBadges.map((badge) => (
                      <Tooltip
                        key={badge.id}
                        title={
                          badge.earned
                            ? badge.label
                            : `${badge.label} (henüz kazanılmadı)`
                        }
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: 76,
                            opacity: badge.earned ? 1 : 0.35,
                            filter: badge.earned ? "none" : "grayscale(1)",
                          }}
                        >
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 24,
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            {badge.icon}
                          </Box>
                          <Typography
                            variant="caption"
                            textAlign="center"
                            color="text.secondary"
                            sx={{ mt: 0.5, lineHeight: 1.1 }}
                          >
                            {badge.label}
                          </Typography>
                        </Box>
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};
