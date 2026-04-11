# 🚀 Quick Start - Deploy to AWS in 15 Minutes

Follow these exact steps to get your app live on AWS Amplify.

## Step 1: Create Local Project (5 minutes)

### On Your Computer:

1. **Create folder:**
   ```bash
   mkdir gsf-vendor-escalation
   cd gsf-vendor-escalation
   ```

2. **Copy ALL files from Figma Make:**
   - Every file in this project
   - Maintain exact folder structure
   - See FILE_STRUCTURE.md for complete list

3. **Verify you have these key files:**
   ```
   ✓ package.json
   ✓ vite.config.ts
   ✓ index.html
   ✓ src/app/App.tsx
   ✓ amplify.yml (new file for AWS)
   ```

## Step 2: Test Locally (Optional - 3 minutes)

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` - Should see your app working!

Press `Ctrl+C` to stop the server.

## Step 3: Push to GitHub (3 minutes)

1. **Initialize Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository:**
   - Go to github.com
   - Click "New repository"
   - Name: `gsf-vendor-escalation`
   - Click "Create repository"

3. **Push code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/gsf-vendor-escalation.git
   git branch -M main
   git push -u origin main
   ```

## Step 4: Deploy to AWS Amplify (4 minutes)

1. **Open AWS Console:**
   - Login: https://console.aws.amazon.com
   - Search: "Amplify"
   - Click: "AWS Amplify"

2. **Create New App:**
   - Click: "New app" → "Host web app"
   - Select: "GitHub"
   - Click: "Continue"

3. **Authorize GitHub:**
   - Click: "Authorize AWS Amplify"
   - Grant permissions

4. **Select Repository:**
   - Repository: `gsf-vendor-escalation`
   - Branch: `main`
   - Click: "Next"

5. **Build Settings:**
   - Should auto-detect Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Click: "Next"

6. **Review & Deploy:**
   - Click: "Save and deploy"

## Step 5: Wait for Deployment (5 minutes)

Watch the progress:
1. ⏳ Provision (1-2 min)
2. ⏳ Build (2-3 min)
3. ⏳ Deploy (1 min)
4. ✅ Verify (30 sec)

## Step 6: Access Your App! 🎉

Once complete, you'll see a URL like:
```
https://main.d1234567890abc.amplifyapp.com
```

**Click it - your app is LIVE!**

---

## Troubleshooting

### Build fails?
Check the build log in Amplify Console. Common fixes:

**Node version issue:**
Edit `amplify.yml` and add:
```yaml
preBuild:
  commands:
    - nvm use 18
    - npm ci
```

**Missing dependencies:**
Check `package.json` has all packages listed.

### Can't find repository?
Make sure:
1. Repository is public OR
2. AWS Amplify has access to private repos

### Build succeeds but app won't load?
1. Check browser console for errors
2. Verify `index.html` is in root directory
3. Check build output directory is `dist`

---

## What's Next?

✅ **Share the URL** with your team  
✅ **Set up custom domain** (optional)  
✅ **Enable auto-deploy** on GitHub push  
✅ **Add authentication** (if needed)  
✅ **Monitor usage** in AWS Console  

## Auto-Deploy (Already Enabled!)

Every time you push to GitHub:
```bash
git add .
git commit -m "Added new feature"
git push
```

AWS Amplify automatically rebuilds and redeploys! 🚀

---

## Cost

**AWS Amplify Free Tier:**
- ✅ 1,000 build minutes/month
- ✅ 15 GB data transfer/month
- ✅ 5 GB storage

**Your app:** Basically FREE for internal use!

---

## Need Help?

1. Check AWS Amplify build logs
2. Review DEPLOYMENT_GUIDE.md
3. Check FILE_STRUCTURE.md
4. Contact AWS Support

---

**Total Time: ~15 minutes**  
**Difficulty: Easy** ⭐⭐☆☆☆

Let's go! 🚀
