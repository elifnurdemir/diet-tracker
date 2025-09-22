import {
  Avatar,
  Box,
  Divider,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useUser } from "../../../../provider/UserProvider";
import catImage from "../../../../assets/cat.jpg";

export const DrawerProfile = () => {
  const { userData } = useUser();

  return (
    <>
      <ListItem sx={{ py: 0, px: 0 }}>
        <Stack flex={1}>
          <Stack
            spacing={1}
            direction="row"
            alignItems="flex-end"
            p={2}
            justifyContent={"center"}
          >
            <Avatar
              alt={userData.name}
              src={userData.image ?? catImage}
              sx={{
                width: 150,
                height: 150,
                flexShrink: 0,
                borderRadius: "50%",
              }}
            />
            <Box flex={1} minWidth={0}>
              <Typography variant="h6" noWrap>
                {userData.name || "ad"},
              </Typography>
              <Typography variant="body1" fontWeight={300} noWrap>
                {userData.gender || "cinsiyet"}, {userData.age ?? "yaş"}
              </Typography>
            </Box>
          </Stack>
          <Divider></Divider>
          <Stack spacing={1} direction="row" alignItems="center">
            <Stack flex={1} alignItems="center" p={1}>
              <Typography variant="h6">Kilo</Typography>
              <Typography variant="body1">{userData.kg}</Typography>
            </Stack>

            <Divider orientation="vertical" flexItem />

            <Stack flex={1} alignItems="center" p={1}>
              <Typography variant="h6">Boy</Typography>
              <Typography variant="body1">{userData.height}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </ListItem>
    </>
  );
};
