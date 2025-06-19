import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

export const FavoriteExercise = () => {
  return (
    <Stack mt={2} justifyContent={"center"} alignItems={"center"} p={25}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Favori Egzersizin :
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
};
