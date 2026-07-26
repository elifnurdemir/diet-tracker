import { useState } from "react";
import { Container, Stack } from "@mui/material";
import { ActivityHeatmap } from "../../../../../utils/ActivityHeatmap.tsx";
import { useUser } from "../../../../../../provider/UserProvider.tsx";
import { WaterIntakeDialog } from "../drink-button/components/WaterIntakeDialog";

export const WaterHeatmap = () => {
  const { waterHeatmapData, dailyIdealWater, addWaterEntry } = useUser();
  const [targetDate, setTargetDate] = useState<string | null>(null);

  const handleSubmit = (amount: number) => {
    if (!targetDate) return;
    addWaterEntry(amount, new Date(`${targetDate}T12:00:00`));
    setTargetDate(null);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Stack spacing={4}>
        <ActivityHeatmap
          data={waterHeatmapData}
          goal={dailyIdealWater}
          title="Su Takibi"
          titleColor="primary.main"
          unit="ml"
          onCellClick={setTargetDate}
        />
      </Stack>
      <WaterIntakeDialog
        open={targetDate !== null}
        onClose={() => setTargetDate(null)}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};
