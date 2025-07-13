import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";
import { mealInfos } from "./constants";

type Props = {
  openKey: string | null;
  onClose: () => void;
};

export const InfoDialog = ({ openKey, onClose }: Props) => (
  <Dialog open={!!openKey} onClose={onClose}>
    <DialogTitle>Öğün Bilgisi</DialogTitle>
    <DialogContent>
      <Typography>{openKey && mealInfos[openKey]}</Typography>
      <Button onClick={onClose} fullWidth sx={{ mt: 2 }}>
        Kapat
      </Button>
    </DialogContent>
  </Dialog>
);
