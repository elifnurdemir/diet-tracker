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

  const [gender, setGender] = useState<string>(userData.gender ?? "female");
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

            const userProfile = {
              name,
              age,
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
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Cinsiyet"
            value={gender}
            defaultValue={userData.gender}
            variant="standard"
            onChange={handleGenderChange}
          >
            <MenuItem value={"Kadın"}>Kadın</MenuItem>
            <MenuItem value={"Erkek"}>Erkek</MenuItem>
            <MenuItem value={"Diğer"}>Diğer</MenuItem>
          </Select>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>İptal</Button>
        <Button type="submit">Kaydet kııız</Button>
      </DialogActions>
    </Dialog>
  );
};
