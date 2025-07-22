import exerciseColors from "../constants/exerciseColors";

export type GymEntry = {
  id: string;
  date: string;
  duration: number;
  exercise: keyof typeof exerciseColors;
};
