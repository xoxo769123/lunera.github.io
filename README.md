# Lunéra — The Moon in a Bottle 🌙

موقع صفحة هبوط لبراند عطور Lunéra، مبني بـ HTML / CSS / JavaScript خالص (بدون أي مكتبات خارجية)، جاهز للرفع مباشرة على GitHub Pages.

## هيكل الملفات

```
lunera-site/
├── index.html              الصفحة الرئيسية
├── css/
│   └── style.css           كل التنسيقات
├── js/
│   └── script.js           التفاعلية + نموذج الطلب + واتساب
└── assets/
    └── images/
        ├── hero-main.png         غلاف الصفحة الرئيسية
        ├── brand-story.png       صورة قسم "قصتنا"
        ├── collection-group.png  صورة المجموعة الكاملة
        ├── product-sora.png      عطر SORA
        ├── product-aera.png      عطر AERA (الذهبي)
        └── product-vera.png      عطر VERA (الأسود)
```

## قبل الرفع — خطوة مهمة

افتحي ملف `js/script.js` وعدّلي هذا السطر بحساب إنستقرام حسابكم الحقيقي:

```js
const INSTAGRAM_URL = "#"; // ضعي رابط حسابكم هنا، مثال:
// const INSTAGRAM_URL = "https://instagram.com/lunera.perfumes";
```

رقم الواتساب مضبوط مسبقاً على: **966596032819+**
لتغييره لاحقاً، عدّلي المتغير `WHATSAPP_NUMBER` في أول ملف `script.js`.

## الرفع على GitHub Pages

1. أنشئي مستودع (Repository) جديد على GitHub.
2. ارفعي كل محتويات هذا المجلد (بما فيها مجلدات `css` و `js` و `assets`) إلى المستودع.
3. من إعدادات المستودع (Settings) → Pages → اختاري branch الـ `main` والمجلد `/root`.
4. بعد دقيقة أو دقيقتين سيكون موقعك متاحاً على رابط شبيه بـ:
   `https://your-username.github.io/repo-name/`

## المحتوى الذي يمكنك تعديله بسهولة

- **الأسعار والأوصاف والمكونات**: داخل `index.html`، كل عطر له `<article class="product">` منفصل.
- **آراء العملاء**: داخل `index.html` قسم `<section class="reviews">`، كل رأي هو `<div class="review-card">`.
- **الألوان**: من أول ملف `css/style.css`، داخل `:root{ ... }` (متغيرات CSS باسم `--gold-400`, `--midnight-900` إلخ).
- **نص نموذج واتساب المُرسل**: داخل `js/script.js` في دالة `initOrderForm()`.

بالتوفيق مع Lunéra 🌙
