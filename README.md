# Diyet Takibi

Kişisel diyet ve sağlık takibi için React + TypeScript ile geliştirilmiş, tamamen tarayıcı tarafında çalışan bir web uygulaması. Sunucu veya veritabanı yok; tüm veriler `localStorage`'da tutulur.

Canlı: https://elifnurdemir.github.io/diet-tracker

## Özellikler

- **Yemek takibi** — haftalık öğün tablosu, öğün detayları
- **Kilo takibi** — kilo girişleri, grafik, motivasyon kartı, fotoğraf galerisi
- **Su takibi** — günlük hedef, içme kaydı, ısı haritası (heatmap)
- **Spor takibi** — antrenman girişleri, takvim görünümü, haftalık grafik
- Açık/koyu tema desteği

## Teknolojiler

- React 19 + TypeScript
- Vite 6
- MUI v7 (`@mui/material`, `@emotion`)
- `recharts` (grafikler)
- `react-router-dom` v7
- `date-fns`

## Kurulum

```bash
npm install
npm run dev
```

## Komutlar

| Komut             | Açıklama                                    |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Geliştirme sunucusunu başlatır              |
| `npm run build`   | Tip kontrolü yapar ve production build alır |
| `npm run lint`    | ESLint ile kod kontrolü yapar               |
| `npm run format`  | Prettier ile kodu biçimlendirir             |
| `npm run test`    | Vitest ile testleri çalıştırır              |
| `npm run preview` | Production build'i yerelde önizler          |
| `npm run deploy`  | `dist` klasörünü GitHub Pages'e yayınlar    |

## Veri Saklama

Uygulama herhangi bir backend'e bağlı değildir. Kullanıcı verileri (profil, kilo, su, spor, yemek girdileri) tarayıcının `localStorage`'ında saklanır. Bu nedenle veriler cihaza/tarayıcıya özeldir ve tarayıcı verileri temizlendiğinde kaybolur.
