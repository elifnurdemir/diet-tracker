export type Meal = {
  key: string;
  label: string;
};

export type MealCellData = {
  checked: boolean;
  note?: string;
  image?: string;
  timestamp?: string | number;
};

export type Props = {
  days: string[];
  meals: Meal[];
  mealsData: WeekData;
  currentDate: Date;
  updateMeal: (key: string, changes: Partial<any>) => void;
  setInfoOpen: (key: string) => void;
};
export type MealCellProps = {
  mealKey: string;
  data?: MealCellData;
  onUpdate: (key: string, data: Partial<MealCellData>) => void;
  onInfoClick: () => void;
};

export type WeekData = Record<string, MealCellData>;
