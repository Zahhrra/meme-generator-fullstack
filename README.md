# 🎭 Meme Generator

Meme yaratmaq və saxlamaq üçün fullstack tətbiq.

**Çətinlik:** ⭐⭐ Orta  
**Təxmini Müddət:** 8-12 saat  
**Backend Port:** 3000

## Layihə Haqqında

Bu layihə istifadəçilərə hazır meme template-lərindən istifadə edərək öz meme-lərini yaratmağa imkan verir. İstifadəçilər yuxarı və aşağı mətn əlavə edərək şəkillər üzərində yaradıcı ola bilərlər.

## Texnologiyalar

**Backend:**

- Node.js + Express
- TypeScript
- Zod (validation)
- Pino (logging)
- In-memory storage (Map)

**Frontend:**

- HTML5
- CSS3
- Vanilla JavaScript

## Quraşdırma

### 1. Asılılıqları yükləyin

```bash
cd backend
npm install
```

### 2. .env faylı yaradın

```bash
cp .env.example .env
```

### 3. Tətbiqi işə salın

```bash
npm run dev
```

Tətbiq `http://localhost:3000` ünvanında açılacaq.

## Layihə Strukturu

```
01-meme-generator/
├── backend/
│   ├── src/
│   │   ├── types/          # TypeScript interface-lər
│   │   ├── validators/     # Zod validation schema-lar
│   │   ├── storage/        # In-memory data storage
│   │   ├── controllers/    # Request handler-lər
│   │   ├── routes/         # Express route-lar
│   │   └── server.ts       # Əsas server faylı
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── index.html         # Əsas HTML
│   ├── style.css          # CSS stilləri
│   └── app.js             # Frontend JavaScript
├── README.md              # Bu fayl
├── TASKS.md              # Tapşırıqlar siyahısı
└── EXAMPLE.md            # API istifadə nümunələri
```

## Əsas Xüsusiyyətlər

- ✨ Meme template-lərini göstərmək
- 🎨 Yuxarı və aşağı mətn əlavə etmək
- 💾 Yaradılmış meme-ləri saxlamaq
- 🎲 Random meme göstərmək
- 📱 Responsive dizayn

## Öyrənmə Məqsədləri

Bu layihədə siz öyrənəcəksiniz:

1. **Backend Development**
   - Express server yaratmaq
   - TypeScript ilə type-safe kod yazmaq
   - REST API dizaynı
   - Zod ilə validation
   - Pino ilə logging
   - In-memory data management

2. **Frontend Development**
   - Fetch API ilə backend ilə əlaqə
   - DOM manipulyasiyası
   - Event handling
   - Form validation
   - Responsive CSS

3. **Fullstack Integration**
   - Frontend və backend inteqrasiyası
   - Static file serving
   - CORS konfiqurasiyası
   - Error handling

## 📚 Kömək və Resurslar

### Backend Resurslar

- [Express.js Docs](https://expressjs.com/) - Express framework sənədləri
- [Express Routing Guide](https://expressjs.com/en/guide/routing.html) - Route yaratmaq
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript öyrənmək
- [Zod Documentation](https://zod.dev/) - Validation schema-lar
- [Pino Logger](https://getpino.io/) - Logging

### Frontend Resurslar

- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - API request-lər
- [MDN DOM Manipulation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents) - DOM idarəetməsi
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - Layout dizaynı
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) - Grid layout

### REST API Resurslar

- [REST API Tutorial](https://restfulapi.net/) - REST prinsipləri
- [HTTP Status Codes](https://httpstatuses.com/) - Status kodları

### Faydalı Videolar

- [Express.js Crash Course](https://www.youtube.com/results?search_query=express+js+tutorial) - YouTube
- [TypeScript Basics](https://www.youtube.com/results?search_query=typescript+tutorial) - YouTube

## 💡 İpuçları

1. **Addım-addım işləyin** - TASKS.md-dəki sıranı izləyin
2. **Console-da yoxlayın** - Browser DevTools və terminal log-larına baxın
3. **Postman istifadə edin** - API-nı test etmək üçün
4. **Git commit edin** - Hər funksiya hazır olanda commit edin
5. **Error mesajlarını oxuyun** - Error-lar sizə nə etməli olduğunuzu göstərir

## ❓ Tez-tez Verilən Suallar

**S: Port artıq istifadədədir error-u alıram?**  
C: .env faylında PORT-u dəyişdirin və ya `lsof -ti:3000 | xargs kill` ilə portu azad edin.

**S: CORS error-u nədir?**  
C: Backend-də `cors()` middleware əlavə etdiyinizdən əmin olun.

**S: TypeScript error-ları alıram?**  
C: `npm install` edib dependencies yüklədiyinizdən əmin olun.

## Müəllim Qeydləri

Tələbələr TASKS.md faylındakı tapşırıqları ardıcıl olaraq yerinə yetirməlidirlər. Hər tapşırıq əvvəlki tapşırığın üzərinə qurulmuşdur.
