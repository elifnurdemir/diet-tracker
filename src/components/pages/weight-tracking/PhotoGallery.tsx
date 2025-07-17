import { Box, Card, CardContent, Typography } from "@mui/material";
import { type WeightEntry, views } from "./types";

const PhotoGallery = ({ entries }: { entries: WeightEntry[] }) => (
  <Box mt={5}>
    <Typography variant="h6" gutterBottom>
      📸 Haftalık Fotoğraf Galerisi
    </Typography>
    {entries.length === 0 && <Typography>Henüz fotoğraf yok.</Typography>}
    {entries.map((entry) => (
      <Card key={entry.date} sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {entry.date}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {views.map((view) =>
              entry.photos[view] ? (
                <Box key={view} sx={{ textAlign: "center" }}>
                  <Typography variant="caption">
                    {view.toUpperCase()}
                  </Typography>
                  <img
                    src={entry.photos[view]}
                    alt={`${view} photo`}
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                    }}
                  />
                </Box>
              ) : null
            )}
          </Box>
        </CardContent>
      </Card>
    ))}
  </Box>
);

export default PhotoGallery;
