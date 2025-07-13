export type Meal = {
  key: string;
  label: string;
};

export type MealCellData = {
  checked: boolean;
  note: string;
  image?: string;
  timestamp?: string;
};

export type WeekData = Record<string, MealCellData>;
