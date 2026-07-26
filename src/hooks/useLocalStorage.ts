import { useEffect, useState } from "react";

function readValue<T>(key: string, initialValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

// Bir state'i localStorage ile senkron tutar: ilk render'da okur, her
// değişiminde otomatik olarak yazar. Sayfalarda tekrarlanan
// getItem/setItem + JSON.parse/stringify örüntüsünü tek yerde toplar.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readValue(key, initialValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage kullanılamıyor olabilir (gizli sekme, kota aşımı vb.)
    }
  }, [key, value]);

  return [value, setValue] as const;
}
