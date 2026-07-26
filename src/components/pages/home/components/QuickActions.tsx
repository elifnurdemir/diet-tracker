import { useState } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import { WaterIntakeDialog } from "../../water-tracking/components/hero/drink-button/components/WaterIntakeDialog";
import exerciseColors from "../../../constants/exerciseColors";

type MealSlot = { key: string; label: string; checked: boolean };

type Props = {
  onAddWater: (amount: number) => void;
  onAddExercise: (entry: {
    duration: number;
    exercise: keyof typeof exerciseColors;
  }) => void;
  todayMealSlots: MealSlot[];
  onToggleMeal: (key: string, checked: boolean) => void;
};

type ActiveDialog = "water" | "exercise" | "meal" | null;

export const QuickActions = ({
  onAddWater,
  onAddExercise,
  todayMealSlots,
  onToggleMeal,
}: Props) => {
  const [openDialog, setOpenDialog] = useState<ActiveDialog>(null);
  const [dialOpen, setDialOpen] = useState(false);
  const [duration, setDuration] = useState("");
  const [exerciseType, setExerciseType] = useState<
    keyof typeof exerciseColors | ""
  >("");

  const closeAll = () => setOpenDialog(null);

  const handleExerciseSave = () => {
    const durationNum = parseInt(duration, 10);
    if (!durationNum || !exerciseType) return;
    onAddExercise({ duration: durationNum, exercise: exerciseType });
    setDuration("");
    setExerciseType("");
    closeAll();
  };

  return (
    <>
      <SpeedDial
        ariaLabel="Hızlı ekle"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
        icon={<SpeedDialIcon />}
        open={dialOpen}
        onOpen={() => setDialOpen(true)}
        onClose={() => setDialOpen(false)}
      >
        <SpeedDialAction
          icon={<WaterDropIcon />}
          tooltipTitle="Su Ekle"
          tooltipOpen
          onClick={() => {
            setDialOpen(false);
            setOpenDialog("water");
          }}
        />
        <SpeedDialAction
          icon={<FitnessCenterIcon />}
          tooltipTitle="Egzersiz Ekle"
          tooltipOpen
          onClick={() => {
            setDialOpen(false);
            setOpenDialog("exercise");
          }}
        />
        <SpeedDialAction
          icon={<RamenDiningIcon />}
          tooltipTitle="Öğün İşaretle"
          tooltipOpen
          onClick={() => {
            setDialOpen(false);
            setOpenDialog("meal");
          }}
        />
      </SpeedDial>

      <WaterIntakeDialog
        open={openDialog === "water"}
        onClose={closeAll}
        onSubmit={(amount) => {
          onAddWater(amount);
          closeAll();
        }}
      />

      <Dialog
        open={openDialog === "exercise"}
        onClose={closeAll}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Bugün İçin Egzersiz Ekle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Süre (dk)"
            type="number"
            fullWidth
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            margin="normal"
          />
          <TextField
            select
            label="Egzersiz Türü"
            fullWidth
            value={exerciseType}
            onChange={(e) =>
              setExerciseType(e.target.value as keyof typeof exerciseColors)
            }
            margin="normal"
          >
            {Object.keys(exerciseColors).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAll}>İptal</Button>
          <Button variant="contained" onClick={handleExerciseSave}>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog === "meal"}
        onClose={closeAll}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Bugünün Öğünlerini İşaretle</DialogTitle>
        <DialogContent>
          <FormGroup>
            {todayMealSlots.map((slot) => (
              <FormControlLabel
                key={slot.key}
                control={
                  <Checkbox
                    checked={slot.checked}
                    onChange={(e) => onToggleMeal(slot.key, e.target.checked)}
                  />
                }
                label={slot.label}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAll}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
