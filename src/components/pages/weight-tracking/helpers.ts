export const getMotivation = (week: number) => {
  const messages = [
    "Seninle gurur duyuyorum!",
    "İstikrarlı gitmek kazandırır.",
    "Bugün en iyi versiyonun için çalış!",
    "Vücudun sana teşekkür edecek.",
    "Küçük adımlar büyük fark yaratır!",
    "Her gün daha güçlüsün.",
    "Harika ilerliyorsun, pes etme!",
  ];
  return messages[week % messages.length];
};
