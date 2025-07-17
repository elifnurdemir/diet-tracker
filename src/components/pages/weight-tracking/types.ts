export type PhotoView = "front" | "side" | "back";

export interface WeightEntry {
  date: string;
  weight: number;
  goal?: number;
  photos: Record<PhotoView, string | undefined>;
}

export const views: PhotoView[] = ["front", "side", "back"];
