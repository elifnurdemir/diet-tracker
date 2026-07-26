import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { days, meals } from "./constants";
import type { DietList } from "./dietTypes";

type Props = {
  dietList: DietList;
  onCellClick: (key: string, day: string, mealLabel: string) => void;
};

export const DietListTable = ({ dietList, onCellClick }: Props) => {
  const theme = useTheme();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {days.map((day) => (
            <TableCell align="center" key={day}>
              {day}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {meals.map((meal) => (
          <TableRow key={meal.key}>
            <TableCell>{meal.label}</TableCell>
            {days.map((day) => {
              const key = `${day}-${meal.key}`;
              const text = dietList[key];

              return (
                <TableCell
                  key={key}
                  onClick={() => onCellClick(key, day, meal.label)}
                  sx={{
                    width: { xs: "100%", sm: 160 },
                    minHeight: 80,
                    verticalAlign: "top",
                    border: "1px solid",
                    borderColor: "divider",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.06),
                    },
                  }}
                >
                  {text ? (
                    <Typography variant="body2">{text}</Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      + Ekle
                    </Typography>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
