// types/UserData.ts
export interface WaterEntry {
  id: string;
  amount: number; // ml cinsinden
  date: string; // YYYY-MM-DD format
}

export interface ExerciseEntry {
  id: string;
  name: string;
  duration: number; // dakika cinsinden
  category:
    | "cardio"
    | "strength"
    | "yoga"
    | "pilates"
    | "dance"
    | "walking"
    | "other";
  calories?: number; // yakılan kalori (opsiyonel)
  timestamp: string; // ISO string format
  date: string; // YYYY-MM-DD format
  notes?: string;
}

export interface MealEntry {
  id: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  foodName: string;
  calories: number;
  portion: string; // "1 porsiyon", "100g", etc.
  isHealthy: boolean;
  timestamp: string; // ISO string format
  date: string; // YYYY-MM-DD format
  notes?: string;
}

export interface WeightEntry {
  id: string;
  weight: number; // kg cinsinden
  date: string; // YYYY-MM-DD format
  timestamp: string; // ISO string format
  notes?: string;
}

export interface DailyGoals {
  water: number; // ml cinsinden günlük hedef
  calories: number; // günlük kalori hedefi
  exercise: number; // dakika cinsinden günlük egzersiz hedefi
  steps?: number; // günlük adım hedefi (opsiyonel)
}

export interface PinkPoints {
  total: number;
  dailyStreak: number; // kaç gündür devam eden streak
  longestStreak: number; // en uzun streak
  lastUpdated: string; // ISO string format
  achievements: string[]; // kazanılan başarım ID'leri
}

export interface UserPreferences {
  theme: "light" | "dark" | "pink";
  notifications: {
    water: boolean;
    exercise: boolean;
    meals: boolean;
    motivation: boolean;
  };
  language: "tr" | "en";
  units: {
    weight: "kg" | "lbs";
    water: "ml" | "oz";
  };
}

export interface UserData {
  // Temel Profil Bilgileri
  id?: string;
  name?: string;
  age?: string;
  gender?: "kadın" | "erkek" | "diğer";
  height?: string; // cm cinsinden
  kg?: string; // kg cinsinden
  image?: string; // base64 veya URL
  createdAt?: string; // ISO string format
  lastLogin?: string; // ISO string format

  // Hedefler
  goals?: DailyGoals;
  targetWeight?: number; // hedef kilo

  // Su İçme Verileri
  waterEntries?: WaterEntry[];
  dailyWaterGoal?: number; // ml cinsinden

  // Egzersiz Verileri
  exerciseEntries?: ExerciseEntry[];
  favoriteExercises?: string[]; // sık yapılan egzersizler

  // Beslenme Verileri
  mealEntries?: MealEntry[];
  dailyCalorieGoal?: number;

  // Kilo Takibi
  weightEntries?: WeightEntry[];
  startingWeight?: number;

  // Puanlama ve Motivasyon
  pinkPoints?: PinkPoints;
  motivationMessages?: string[]; // kişiselleştirilmiş mesajlar

  // Kullanıcı Tercihleri
  preferences?: UserPreferences;

  // İstatistikler (hesaplanmış değerler)
  stats?: {
    totalWaterConsumed?: number; // toplam içilen su
    totalExerciseMinutes?: number; // toplam egzersiz süresi
    averageWeeklyWeight?: number; // haftalık ortalama kilo
    currentStreak?: number; // mevcut streak
    bmi?: number; // vücut kitle indeksi
  };
}

// Örnek tam dolu UserData objesi
export const sampleUserData: UserData = {
  id: "user_12345",
  name: "Ayşe Pembe",
  age: "25",
  gender: "kadın",
  height: "165",
  kg: "65",
  image: "data:image/jpeg;base64,/9j...",
  createdAt: "2024-01-01T00:00:00.000Z",
  lastLogin: "2024-06-10T08:30:00.000Z",

  goals: {
    water: 2500, // 2.5L
    calories: 1800,
    exercise: 45, // 45 dakika
    steps: 8000,
  },
  targetWeight: 60,

  waterEntries: [
    {
      id: "water_001",
      amount: 250,
      date: "2024-06-10",
    },
    {
      id: "water_002",
      amount: 300,
      date: "2024-06-10",
    },
    {
      id: "water_003",
      amount: 400,
      date: "2024-06-10",
    },
  ],

  exerciseEntries: [
    {
      id: "exercise_001",
      name: "Sabah Yürüyüşü",
      duration: 30,
      category: "walking",
      calories: 120,
      timestamp: "2024-06-10T07:00:00.000Z",
      date: "2024-06-10",
      notes: "Parkta güzel bir yürüyüş",
    },
    {
      id: "exercise_002",
      name: "Yoga Seansı",
      duration: 45,
      category: "yoga",
      calories: 180,
      timestamp: "2024-06-09T18:00:00.000Z",
      date: "2024-06-09",
      notes: "Akşam relaksasyon yogası",
    },
  ],

  mealEntries: [
    {
      id: "meal_001",
      mealType: "breakfast",
      foodName: "Yulaf Ezmesi + Muz",
      calories: 320,
      portion: "1 kase",
      isHealthy: true,
      timestamp: "2024-06-10T08:00:00.000Z",
      date: "2024-06-10",
      notes: "Bal ve ceviz ile",
    },
    {
      id: "meal_002",
      mealType: "lunch",
      foodName: "Izgara Tavuk Salata",
      calories: 450,
      portion: "1 porsiyon",
      isHealthy: true,
      timestamp: "2024-06-10T12:30:00.000Z",
      date: "2024-06-10",
    },
    {
      id: "meal_003",
      mealType: "snack",
      foodName: "Çikolata",
      calories: 200,
      portion: "50g",
      isHealthy: false,
      timestamp: "2024-06-10T15:45:00.000Z",
      date: "2024-06-10",
      notes: "Stres yemeği 😅",
    },
  ],

  weightEntries: [
    {
      id: "weight_001",
      weight: 67,
      date: "2024-06-01",
      timestamp: "2024-06-01T07:00:00.000Z",
      notes: "Başlangıç kilosu",
    },
    {
      id: "weight_002",
      weight: 66.2,
      date: "2024-06-08",
      timestamp: "2024-06-08T07:15:00.000Z",
      notes: "İlk hafta sonucu 💪",
    },
    {
      id: "weight_003",
      weight: 65.8,
      date: "2024-06-10",
      timestamp: "2024-06-10T07:00:00.000Z",
      notes: "Devam ediyoruz!",
    },
  ],

  pinkPoints: {
    total: 1250,
    dailyStreak: 5,
    longestStreak: 12,
    lastUpdated: "2024-06-10T23:59:59.000Z",
    achievements: [
      "first_week",
      "water_master",
      "exercise_lover",
      "healthy_eater",
    ],
  },

  motivationMessages: [
    "Sen harikasın! 💪",
    "Her gün biraz daha güçleniyorsun! 🌸",
    "Hedefe odaklan, sen bunu başarabilirsin! ✨",
  ],

  preferences: {
    theme: "pink",
    notifications: {
      water: true,
      exercise: true,
      meals: false,
      motivation: true,
    },
    language: "tr",
    units: {
      weight: "kg",
      water: "ml",
    },
  },

  stats: {
    totalWaterConsumed: 15750, // son 7 günün toplamı
    totalExerciseMinutes: 285, // son 7 günün toplamı
    averageWeeklyWeight: 66.2,
    currentStreak: 5,
    bmi: 23.9,
  },
};
