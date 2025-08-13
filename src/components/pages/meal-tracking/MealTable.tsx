import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { MealCell } from "./MealCell";
import type {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import type { Props } from "./types";

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
      {meals.map(
        (meal: {
          key: Key | null | undefined;
          label:
            | string
            | number
            | bigint
            | boolean
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | ReactPortal
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
        }) => (
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
        )
      )}
    </TableBody>
  </Table>
);
