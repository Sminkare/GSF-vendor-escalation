# 📋 File Copy Checklist

Use this checklist to ensure you copy ALL necessary files to your local computer.

## Root Directory Files

```
□ package.json                  ← Dependencies and scripts
□ tsconfig.json                ← TypeScript configuration
□ vite.config.ts               ← Vite build configuration
□ index.html                   ← Main HTML file
□ amplify.yml                  ← AWS Amplify build settings
□ README.md                    ← Project documentation
```

---

## /src Directory

```
□ src/index.tsx                ← Application entry point
```

---

## /src/styles Directory

```
□ src/styles/theme.css         ← Tailwind theme and tokens
□ src/styles/fonts.css         ← Font imports
```

---

## /src/app Directory

```
□ src/app/App.tsx              ← Main application component
```

---

## /src/app/components Directory

### Main Components
```
□ src/app/components/ticket-list.tsx           ← Ticket list and filtering
□ src/app/components/ticket-details.tsx        ← Ticket details display
□ src/app/components/email-composer.tsx        ← Email templates
□ src/app/components/communications.tsx        ← Internal communications
□ src/app/components/information-uploads.tsx   ← File uploads
□ src/app/components/audit-trail.tsx           ← Audit history
□ src/app/components/event-management.tsx      ← Event scheduling
```

### UI Components (/src/app/components/ui)
```
□ src/app/components/ui/button.tsx            ← Button component
□ src/app/components/ui/card.tsx              ← Card component
□ src/app/components/ui/input.tsx             ← Input component
□ src/app/components/ui/label.tsx             ← Label component
□ src/app/components/ui/select.tsx            ← Select dropdown
□ src/app/components/ui/textarea.tsx          ← Textarea component
□ src/app/components/ui/badge.tsx             ← Badge component
□ src/app/components/ui/avatar.tsx            ← Avatar component
□ src/app/components/ui/tabs.tsx              ← Tabs component
```

---

## Total Files to Copy: 25

---

## How to Copy Each File

### Method 1: Read and Copy/Paste
For each file above:
1. Use the READ tool or view the file
2. Copy the entire contents
3. Create the same file on your computer
4. Paste the contents
5. Save the file
6. Check off the box ✓

### Method 2: Download Project
If you can download the entire project:
1. Download as ZIP
2. Extract to your computer
3. Verify all 25 files exist
4. Check off all boxes ✓

---

## Folder Structure to Create

```
gsf-vendor-escalation/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── ui/
│   │   └── App.tsx
│   ├── styles/
│   └── index.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── amplify.yml
```

---

## Verification Steps

After copying all files:

### 1. File Count Check
```bash
# Should show 25 files
find . -type f -name "*.tsx" -o -name "*.ts" -o -name "*.json" -o -name "*.html" -o -name "*.css" -o -name "*.yml" | wc -l
```

### 2. Install Dependencies
```bash
npm install
```
Should complete without errors.

### 3. Build Test
```bash
npm run build
```
Should create a `dist/` folder.

### 4. Local Test
```bash
npm run dev
```
Should open at http://localhost:5173

### 5. Visual Check
- ✅ See ticket list on left
- ✅ See ticket details on right
- ✅ Can switch between tickets
- ✅ Can see all 5 tabs
- ✅ No console errors

---

## Common Issues

### "Cannot find module"
**Fix:** Check that all files are in correct folders

### "npm install fails"
**Fix:** Make sure package.json is copied correctly

### "Blank screen"
**Fix:** Check browser console for errors, verify all component files exist

### "Build fails"
**Fix:** Check tsconfig.json and vite.config.ts are present

---

## Files to IGNORE (Don't Copy)

```
✗ node_modules/          ← Will be created by npm install
✗ dist/                  ← Will be created by npm run build
✗ .git/                  ← Will be created fresh
✗ pnpm-lock.yaml         ← Not needed
```

---

## Ready to Deploy?

Once all 25 boxes are checked:
1. ✅ All files copied
2. ✅ Folder structure correct
3. ✅ `npm install` successful
4. ✅ `npm run dev` works
5. ✅ Ready for GitHub!

**Next Step:** Follow QUICK_START.md or DEPLOYMENT_GUIDE.md

---

## Quick Reference

**Total files:** 25  
**Total folders:** 4  
**Estimated copy time:** 10-15 minutes  
**Difficulty:** Easy ⭐⭐☆☆☆

---

**Good luck! 🚀**
