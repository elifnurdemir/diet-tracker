import {
  Avatar,
  Box,
  Divider,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useUser } from "../../../../provider/UserProvider";

export const DrawerProfile = () => {
  const { userData } = useUser();

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
