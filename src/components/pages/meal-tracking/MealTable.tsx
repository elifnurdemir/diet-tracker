import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { MealCell } from "./MealCell";
import type { Meal, WeekData } from "./types";

type Props = {
  days: string[];
  meals: Meal[];
  mealsData: WeekData;
  currentDate: Date;
  updateMeal: (key: string, changes: Partial<any>) => void;
  setInfoOpen: (key: string) => void;
};

export const MealTable = ({
  days,
  meals,
  mealsData,
  currentDate,
  updateMeal,
  setInfoOpen,
}: Props) => (
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
            return (
              <MealCell
                key={key}
                mealKey={key}
                data={mealsData[key]}
                date={currentDate}
                onUpdate={updateMeal}
                onInfoClick={() => setInfoOpen(meal.key)}
              />
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
