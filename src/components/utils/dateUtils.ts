// Yerel takvim gününü YYYY-MM-DD olarak döner. toISOString() UTC'ye çevirdiği
// için UTC'nin doğusundaki saat dilimlerinde (ör. Türkiye, UTC+3) günü bir gün
// geriye kaydırır — bu yüzden burada yerel getFullYear/getMonth/getDate kullanılıyor.
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const weekDaysShort = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

// Pazar'dan başlayan içinde bulunulan haftanın 7 gününü YYYY-MM-DD olarak döner.
export function getCurrentWeekDates(reference: Date = new Date()): string[] {
  const start = new Date(reference);
  start.setDate(start.getDate() - start.getDay());

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return toDateKey(date);
  });
}

export function getMonthDays(currentDate: Date) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];

  const startOffset = (firstDay.getDay() + 6) % 7;
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(toDateKey(new Date(year, month, d)));
  }

  return days;
}
