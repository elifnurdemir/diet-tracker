import { getISOWeek } from "date-fns";

export const STORAGE_KEY = "meal-tracker-data";

export const getWeekKey = (date: Date) =>
  `${date.getFullYear()}-${String(getISOWeek(date)).padStart(2, "0")}`;

export const days = ["Pzt", "Salı", "Çrş", "Per", "Cuma", "Cmt", "Paz"];

export const meals = [
  { key: "breakfast", label: "Kahvaltı" },
  { key: "snack1", label: "1. Ara Öğün" },
  { key: "lunch", label: "Öğle Yemeği" },
  { key: "snack2", label: "2. Ara Öğün" },
  { key: "dinner", label: "Akşam Yemeği" },
];

export const mealInfos: Record<string, string> = {
  breakfast: `🍳 Kahvaltı:
- 2 haşlanmış yumurta
- 1 dilim tam buğday ekmeği
- Bol söğüş (domates, salatalık, biber)
- 5 zeytin
- 1 dilim az tuzlu beyaz peynir veya lor
- Şekersiz yeşil çay veya rezene çayı`,

  snack1: `🍎 Ara Öğün:
- 1 küçük elma + 10 badem
veya
- 1 bardak ayran + 1 galeta`,

  lunch: `🥗 Öğle Yemeği:
- 1 tabak sebze yemeği (zeytinyağlı kabak, taze fasulye, ıspanak vs.)
- 3 yemek kaşığı bulgur pilavı
- 1 kase yoğurt
- Bol salata (limonlu, sirkeli)`,

  snack2: `🥛 2. Ara Öğün:
- 1 küçük meyve veya
- 1 bardak kefir veya
- 1 dilim tam buğday ekmeği + 1 tatlı kaşığı fıstık ezmesi`,

  dinner: `🍽️ Akşam Yemeği:
-Izgara tavuk, balık veya hindi (100–120 gr)
-4 yemek kaşığı sebze yemeği
-Bol yeşil salata
-1 dilim tam buğday ekmeği`,
};
