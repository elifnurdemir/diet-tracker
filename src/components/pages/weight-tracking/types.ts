export type PhotoView = "ön" | "yan" | "arka";

export interface WeightEntry {
  date: string;
  weight: number;
  goal?: number;
  photos: Record<PhotoView, string | undefined>;
}

export const views: PhotoView[] = ["ön", "yan", "arka"];
