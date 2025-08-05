# دليل رفع المشروع على GitHub ونشره على Netlify

## الخطوة 1: إنشاء Repository على GitHub

1. اذهب إلى [github.com](https://github.com)
2. اضغط على "New repository" (أخضر)
3. اختر اسم للمشروع مثل: `lordx679-portfolio`
4. اجعل Repository عام (Public)
5. لا تضع أي ملفات افتراضية (README, .gitignore, etc.)
6. اضغط "Create repository"

## الخطوة 2: رفع الملفات

### الطريقة الأولى: رفع مباشر عبر الويب

1. في صفحة Repository الجديد، اضغط "uploading an existing file"
2. اسحب وأفلت جميع ملفات المشروع (ما عدا مجلد node_modules)
3. أو اضغط "choose your files" واختر الملفات
4. اكتب commit message: "Initial commit - Portfolio with File Uploader"
5. اضغط "Commit changes"

### الطريقة الثانية: استخدام Git Commands (إذا كان متوفر)

```bash
git remote add origin https://github.com/USERNAME/lordx679-portfolio.git
git branch -M main
git add .
git commit -m "Initial commit - Portfolio with File Uploader"
git push -u origin main
```

## الخطوة 3: نشر على Netlify

### من GitHub (الطريقة المفضلة)

1. اذهب إلى [app.netlify.com](https://app.netlify.com)
2. اضغط "New site from Git"
3. اختر GitHub واربط حسابك
4. اختر Repository الذي أنشأته
5. إعدادات البناء ستكون تلقائية من ملف `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
6. اضغط "Deploy site"

### أو النشر المباشر

1. قم بتشغيل `npm run build` على جهازك
2. اسحب وأفلت مجلد `dist/public` إلى Netlify
3. سيتم النشر فوراً

## الخطوة 4: إعداد Environment Variables (اختياري)

في لوحة تحكم Netlify:
1. اذهب إلى Site settings > Environment variables
2. أضف:
   - `DISCORD_BOT_TOKEN`: للحصول على صورة Discord الحقيقية
   - `DISCORD_AVATAR_HASH`: إذا كنت تعرف hash الصورة

## ملفات المشروع الجاهزة للرفع

المشروع يحتوي على:
- ✅ Portfolio كامل مع تصميم ديناميكي
- ✅ محمل ملفات متطور
- ✅ API لصورة Discord
- ✅ إعدادات Netlify جاهزة
- ✅ SEO مُحسّن
- ✅ متوافق مع الجوال

## ملاحظات مهمة

1. **لا ترفع مجلد `node_modules`** - سيتم تثبيت الحزم تلقائياً
2. **تأكد من رفع ملف `netlify.toml`** - يحتوي على إعدادات مهمة
3. **جميع الملفات جاهزة للنشر** - لا تحتاج تعديلات إضافية

## GitHub Token للمطورين

إذا كنت تستخدم GitHub token:

```bash
git clone https://YOUR_GITHUB_TOKEN@github.com/USERNAME/REPO_NAME.git
```

تأكد من عدم مشاركة التوكن مع أي شخص آخر.

## الرابط النهائي

بعد النشر، ستحصل على رابط مثل:
`https://lordx679-portfolio.netlify.app`

يمكنك تخصيص النطاق من إعدادات Netlify.