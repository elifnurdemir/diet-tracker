import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { MealCell } from "./MealCell";
import type { Props, Meal } from "./types";

export const MealTable = ({
  days,
  meals,
  mealsData,
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
      {meals.map((meal: Meal) => (
        <TableRow key={meal.key}>
          <TableCell>{meal.label}</TableCell>
          {days.map((day) => {
            const key = `${day}-${meal.key}`;
            return (
              <MealCell
                key={key}
                mealKey={key}
                data={mealsData[key]}
                onUpdate={updateMeal}
                onInfoClick={() =>
                  meal.key ? setInfoOpen(String(meal.key)) : undefined
                }
              />
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
