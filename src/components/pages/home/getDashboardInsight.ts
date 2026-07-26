type InsightParams = {
  dailyIdealWater: number;
  todayTotalWaterAmount: number;
  exercisedToday: boolean;
  todayCheckedMealsCount: number;
  totalTodayMealSlots: number;
  hour: number;
};

// Basit, kural tabanlı bir "akıllı özet" — kullanıcının o anki verisine göre
// öncelik sırasıyla en anlamlı motivasyon cümlesini seçer. Gerçek bir yapay
// zeka çağrısı değil; tamamen istemci tarafında, mevcut veriden türetilir.
export function getDashboardInsight(p: InsightParams): string {
  const waterRemaining = p.dailyIdealWater - p.todayTotalWaterAmount;
  const waterGoalMet = waterRemaining <= 0;
  const glassesLeft = Math.max(1, Math.ceil(waterRemaining / 250));
  const allMealsChecked =
    p.totalTodayMealSlots > 0 &&
    p.todayCheckedMealsCount >= p.totalTodayMealSlots;

  if (waterGoalMet && p.exercisedToday && allMealsChecked) {
    return "Bugün tüm hedeflerini tamamladın, harikasın! 🎉";
  }
  if (!waterGoalMet && waterRemaining <= 500) {
    return `Harika gidiyorsun! Su hedefine ulaşmana sadece ${glassesLeft} bardak kaldı 💧`;
  }
  if (!p.exercisedToday && p.hour >= 17) {
    return "Bugün biraz hareketsiz kalmışız gibi duruyor, hadi kalk ve 10 dakikalık esneme hareketleriyle başla! 🤸";
  }
  if (!waterGoalMet && p.hour < 12) {
    return "Güne güzel bir su molasıyla başla! 💧";
  }
  if (p.todayCheckedMealsCount === 0 && p.hour >= 12) {
    return "Bugünkü öğünlerini henüz işaretlemedin, unutmadan gir 🍽️";
  }
  if (!waterGoalMet) {
    return `Hedefine ulaşmak için ${glassesLeft} bardak daha su içmeyi unutma 💧`;
  }
  return "İşte bugünkü genel durumun.";
}
