import { useCallback, useEffect, useState } from "react";

type Listener = () => void;
const listeners = new Map<string, Set<Listener>>();

function emit(key: string) {
  listeners.get(key)?.forEach((fn) => fn());
}

function subscribe(key: string, fn: Listener) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  const set = listeners.get(key)!;
  set.add(fn);
  return () => {
    set.delete(fn);
  };
}

function readValue<T>(key: string, initialValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

function writeValue<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage kullanılamıyor olabilir (gizli sekme, kota aşımı vb.)
  }
}

// Bir state'i localStorage ile senkron tutar: ilk render'da okur, her
// değişiminde otomatik olarak yazar. Sayfalarda tekrarlanan
// getItem/setItem + JSON.parse/stringify örüntüsünü tek yerde toplar.
//
// Aynı anahtarı okuyan farklı bileşen örnekleri (ör. kenar çubuğu ile sayfa
// içeriği aynı anda "gym-entries"i okuyabilir) birbirinden habersizdi: biri
// yazınca diğeri yeniden mount olana kadar eski değeri göstermeye devam
// ediyordu. emit/subscribe bu örnekler arasında anlık senkronizasyon sağlar.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readValue(key, initialValue));

  useEffect(() => {
    return subscribe(key, () => {
      setValue(readValue(key, initialValue));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setAndPersist = useCallback(
    (update: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next =
          typeof update === "function"
            ? (update as (prev: T) => T)(prev)
            : update;
        writeValue(key, next);
        return next;
      });
      // Diğer örnekleri render fazının dışında, mevcut senkron işlem
      // bittikten sonra bilgilendir.
      queueMicrotask(() => emit(key));
    },
    [key]
  );

  return [value, setAndPersist] as const;
}
