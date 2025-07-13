export const STORAGE_KEY = "meal-tracker-data";

export const days = ["Pzt", "Salı", "Çrş", "Per", "Cuma", "Cmt", "Paz"];

export const meals = [
  { key: "breakfast", label: "Kahvaltı" },
  { key: "snack1", label: "1. Ara Öğün" },
  { key: "lunch", label: "Öğle" },
  { key: "snack2", label: "2. Ara Öğün" },
  { key: "dinner", label: "Akşam" },
];

export const mealInfos: Record<string, string> = {
  breakfast: "Protein + lifli karbonhidrat (örn: yumurta + ekmek)",
  snack1: "Meyve + ceviz",
  lunch: "Sebze + tam tahıl",
  snack2: "Kefir / hafif ara",
  dinner: "Sebze + hafif protein",
};
