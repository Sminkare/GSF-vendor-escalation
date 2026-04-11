# 📁 How to Copy Files from Figma Make

This guide shows you exactly how to get each file from this Figma Make project to your computer.

## Overview

You have **25 files** to copy. Here's the easiest way to do it:

---

## Step-by-Step Process

### Step 1: Create Your Local Project Structure

On your computer, create this folder structure:

```bash
# Create main folder
mkdir gsf-vendor-escalation
cd gsf-vendor-escalation

# Create subfolders
mkdir -p src/app/components/ui
mkdir -p src/styles
```

Now you have the basic structure ready!

---

### Step 2: Copy Root Files (6 files)

#### File 1: package.json
1. In Figma Make, look at the file tree on the left
2. Click on `package.json`
3. Copy ALL the content
4. On your computer, create `package.json`
5. Paste the content
6. Save

#### File 2: tsconfig.json
Same process as above for `tsconfig.json`

#### File 3: vite.config.ts
Same process as above for `vite.config.ts`

#### File 4: index.html
Same process as above for `index.html`

#### File 5: amplify.yml
Same process as above for `amplify.yml`

#### File 6: README.md
Same process as above for `README.md`

---

### Step 3: Copy /src Files (2 files)

#### File 7: src/index.tsx
1. Navigate to `/src/index.tsx` in Figma Make
2. Copy all content
3. Create `src/index.tsx` on your computer
4. Paste and save

---

### Step 4: Copy /src/styles Files (2 files)

#### File 8: src/styles/theme.css
1. Navigate to `/src/styles/theme.css`
2. Copy all content
3. Create `src/styles/theme.css` on your computer
4. Paste and save

#### File 9: src/styles/fonts.css
Same process for `fonts.css`

---

### Step 5: Copy /src/app Files (1 file)

#### File 10: src/app/App.tsx
1. Navigate to `/src/app/App.tsx`
2. Copy all content
3. Create `src/app/App.tsx` on your computer
4. Paste and save

---

### Step 6: Copy Main Components (7 files)

All in `/src/app/components/`:

#### File 11: ticket-list.tsx
1. Navigate to `/src/app/components/ticket-list.tsx`
2. Copy content
3. Create `src/app/components/ticket-list.tsx`
4. Paste and save

#### File 12: ticket-details.tsx
#### File 13: email-composer.tsx
#### File 14: communications.tsx
#### File 15: information-uploads.tsx
#### File 16: audit-trail.tsx
#### File 17: event-management.tsx

Repeat the same process for each file above.

---

### Step 7: Copy UI Components (9 files)

All in `/src/app/components/ui/`:

#### Files 18-25:
- button.tsx
- card.tsx
- input.tsx
- label.tsx
- select.tsx
- textarea.tsx
- badge.tsx
- avatar.tsx
- tabs.tsx

For each file:
1. Navigate to `/src/app/components/ui/[filename].tsx`
2. Copy content
3. Create `src/app/components/ui/[filename].tsx`
4. Paste and save

---

## Quick Copy Method

### If You Can Access the File System:

Many platforms allow you to download the entire project as a ZIP file:

1. Look for "Download" or "Export" button
2. Download as ZIP
3. Extract to your computer
4. Navigate to the extracted folder
5. Delete unnecessary files (node_modules, dist, .git)
6. Keep only the 25 files listed in COPY_CHECKLIST.md

---

## Alternative: Use Git (If Available)

If Figma Make provides a Git repository URL:

```bash
git clone [REPOSITORY_URL] gsf-vendor-escalation
cd gsf-vendor-escalation
```

Then clean up:
```bash
rm -rf node_modules dist .git
```

---

## Verify You Have Everything

### Check File Count:
```bash
# On Mac/Linux
find . -name "*.tsx" -o -name "*.ts" -o -name "*.json" -o -name "*.html" -o -name "*.css" -o -name "*.yml" | wc -l

# Should show: 25
```

### Check Folder Structure:
```bash
tree -L 3
```

Should show:
```
.
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── amplify.yml
├── README.md
└── src
    ├── index.tsx
    ├── app
    │   ├── App.tsx
    │   └── components
    │       ├── ticket-list.tsx
    │       ├── ticket-details.tsx
    │       ├── email-composer.tsx
    │       ├── communications.tsx
    │       ├── information-uploads.tsx
    │       ├── audit-trail.tsx
    │       ├── event-management.tsx
    │       └── ui
    │           ├── button.tsx
    │           ├── card.tsx
    │           ├── input.tsx
    │           ├── label.tsx
    │           ├── select.tsx
    │           ├── textarea.tsx
    │           ├── badge.tsx
    │           ├── avatar.tsx
    │           └── tabs.tsx
    └── styles
        ├── theme.css
        └── fonts.css
```

---

## Test Before Deploying

Once all files are copied:

```bash
# Install dependencies
npm install

# Should complete without errors
# Creates node_modules folder
```

```bash
# Test build
npm run build

# Should create dist/ folder
# No errors in console
```

```bash
# Test locally
npm run dev

# Opens browser at localhost:5173
# App should be fully functional
```

---

## Common Copy Errors

### Error: "Unexpected token"
**Cause:** Incomplete file copy  
**Fix:** Re-copy the file completely

### Error: "Cannot find module"
**Cause:** Missing file or wrong location  
**Fix:** Check file is in correct folder

### Error: "Module not found: Can't resolve './components/...'"
**Cause:** Component file missing  
**Fix:** Make sure all component files are copied

### Blank screen when running
**Cause:** Missing files or syntax errors  
**Fix:** Check browser console, verify all files exist

---

## Time Estimate

**Manual copy:** 15-20 minutes  
**ZIP download:** 2-3 minutes  
**Git clone:** 1-2 minutes  

---

## After Copying

Once all files are on your computer:

✅ **Done copying?** → Follow QUICK_START.md  
✅ **Ready to deploy?** → Follow DEPLOYMENT_GUIDE.md  
✅ **Need help?** → Check COPY_CHECKLIST.md  

---

## Pro Tips

💡 **Use a code editor** like VS Code to copy/paste files  
💡 **Check file extensions** (.tsx not .ts for React components)  
💡 **Preserve indentation** when copying  
💡 **Test locally** before pushing to GitHub  
💡 **Save frequently** as you copy each file  

---

**Ready to start? Begin with Step 1 above!** 🚀
