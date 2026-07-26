// Diyetisyenin önerdiği haftalık plan: gün-öğün anahtarı (MealTable ile aynı
// `${day}-${mealKey}` şeması) -> önerilen içerik metni. Belirli bir haftaya
// değil, tekrar eden haftalık şablona bağlıdır.
export type DietList = Record<string, string>;

export const DIET_LIST_STORAGE_KEY = "diet-list";

export type DietitianAppointment = {
  id: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  dietitianName?: string;
  notes?: string;
};

export const DIETITIAN_APPOINTMENTS_STORAGE_KEY = "dietitian-appointments";
