import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  IconButton,
  InputAdornment,
  Stack,
  type SelectChangeEvent,
} from "@mui/material";
import { Select, MenuItem } from "@mui/material";

type EditDialogProps = {
  open: boolean;
  handleClose: () => void;
};

export const EditDialog = ({ open, handleClose }: EditDialogProps) => {
  const userData = JSON.parse(localStorage.getItem("Profile") ?? "{}");

  const [gender, setGender] = useState<string>(userData.gender ?? "Kadın");
  const [image, setImage] = useState<string | null>(userData.image ?? null);

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        localStorage.setItem("profileImage", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());

            const name = formJson.name;
            const age = formJson.age;
            const kg = formJson.kg;
            const height = formJson.height;

            const userProfile = {
              name,
              age,
              kg,
              height,
              gender,
              image,
            };

            localStorage.setItem("Profile", JSON.stringify(userProfile));
            handleClose();
          },
        },
      }}
    >
      <DialogTitle>Profil Bilgilerini Düzenle</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Avatar src={image ?? undefined} sx={{ width: 56, height: 56 }} />
            </IconButton>
          </label>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="ad soyad"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={userData.name}
          />
          <Stack direction="row" spacing={5}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="age"
              name="age"
              label="yaş"
              type="number"
              fullWidth
              variant="standard"
              defaultValue={userData.age}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">yaş</InputAdornment>
                ),
              }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Cinsiyet"
              value={gender}
              variant="standard"
              onChange={handleGenderChange}
            >
              <MenuItem value={"Kadın"}>kadın</MenuItem>
              <MenuItem value={"Erkek"}>erkek</MenuItem>
              <MenuItem value={"Diğer"}>diğer</MenuItem>
            </Select>
          </Stack>
          <Stack direction="row" spacing={5}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="kg"
              name="kg"
              type="number"
              label="kilo"
              fullWidth
              variant="standard"
              defaultValue={userData.kg}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="height"
              name="height"
              type="number"
              label="boy"
              fullWidth
              variant="standard"
              defaultValue={userData.height}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">cm</InputAdornment>
                ),
              }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>İptal</Button>
        <Button type="submit">Kaydet kııız</Button>
      </DialogActions>
    </Dialog>
  );
};
