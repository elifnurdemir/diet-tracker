import {
  Avatar,
  Box,
  Divider,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

type UserData = {
  name: string;
  image?: string | null;
  gender?: string;
  age?: number | string;
  kg?: number | string;
  height?: number | string;
};

export const DrawerProfile = () => {
  const userData: UserData = JSON.parse(
    localStorage.getItem("Profile") ?? "{}"
  );

  return (
    <>
      <ListItem sx={{ py: 0 }}>
        <Stack flex={1}>
          <Stack spacing={1} direction="row" alignItems="center" p={2}>
            <Avatar
              alt={userData.name}
              src={userData.image ?? undefined}
              sx={{ width: 64, height: 64 }}
            />
            <Box>
              <Typography variant="h6">{userData.name}</Typography>
              <Typography variant="body1">
                {userData.gender} , {userData.age}
              </Typography>
            </Box>
          </Stack>

          <Divider />

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
      <Divider />
    </>
  );
};
