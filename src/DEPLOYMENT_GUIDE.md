# GSF Vendor Escalation Workflow - AWS Amplify Deployment Guide

## Prerequisites
- AWS Account (use your Amazon corporate account)
- GitHub account
- Git installed on your computer

## Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New Repository" (green button)
3. Name it: `gsf-vendor-escalation-workflow`
4. Select "Public" or "Private" (Private recommended for internal tools)
5. Click "Create repository"

### Step 2: Prepare Your Local Project

1. **Create a new folder on your computer:**
   ```bash
   mkdir gsf-vendor-escalation-workflow
   cd gsf-vendor-escalation-workflow
   ```

2. **Initialize Git:**
   ```bash
   git init
   ```

3. **Copy all project files** (see FILE_STRUCTURE.md for complete list)

4. **Create the exact folder structure:**
   ```
   gsf-vendor-escalation-workflow/
   ├── public/
   │   └── index.html
   ├── src/
   │   ├── app/
   │   │   ├── components/
   │   │   │   ├── ui/
   │   │   │   │   ├── button.tsx
   │   │   │   │   ├── card.tsx
   │   │   │   │   ├── input.tsx
   │   │   │   │   ├── label.tsx
   │   │   │   │   ├── select.tsx
   │   │   │   │   ├── textarea.tsx
   │   │   │   │   ├── badge.tsx
   │   │   │   │   ├── avatar.tsx
   │   │   │   │   └── tabs.tsx
   │   │   │   ├── ticket-list.tsx
   │   │   │   ├── ticket-details.tsx
   │   │   │   ├── email-composer.tsx
   │   │   │   ├── communications.tsx
   │   │   │   ├── information-uploads.tsx
   │   │   │   ├── audit-trail.tsx
   │   │   │   └── event-management.tsx
   │   │   └── App.tsx
   │   ├── styles/
   │   │   ├── theme.css
   │   │   └── fonts.css
   │   └── index.tsx
   ├── package.json
   ├── tsconfig.json
   ├── vite.config.ts
   ├── index.html
   └── README.md
   ```

### Step 3: Install Dependencies Locally (Optional - Test First)

```bash
npm install
```

**Test locally:**
```bash
npm run dev
```

Visit `http://localhost:5173` to verify everything works.

### Step 4: Push to GitHub

1. **Add all files:**
   ```bash
   git add .
   ```

2. **Commit:**
   ```bash
   git commit -m "Initial commit - GSF Vendor Escalation Workflow"
   ```

3. **Connect to GitHub repository:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/gsf-vendor-escalation-workflow.git
   ```

4. **Push to GitHub:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Step 5: Deploy to AWS Amplify

1. **Go to AWS Amplify Console:**
   - Login to [AWS Console](https://console.aws.amazon.com)
   - Search for "Amplify" in the search bar
   - Click "AWS Amplify"

2. **Create New App:**
   - Click "New app" → "Host web app"
   - Select "GitHub" as source
   - Click "Continue"

3. **Authorize GitHub:**
   - Click "Authorize AWS Amplify"
   - Grant permissions

4. **Select Repository:**
   - Find `gsf-vendor-escalation-workflow`
   - Select `main` branch
   - Click "Next"

5. **Configure Build Settings:**
   
   AWS Amplify should auto-detect Vite. The build settings should look like this:

   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

6. **Advanced Settings (Optional):**
   - App name: `GSF Vendor Escalation Workflow`
   - Environment: `production`
   - Click "Next"

7. **Review and Deploy:**
   - Review all settings
   - Click "Save and deploy"

### Step 6: Wait for Deployment

- **Provision**: ~1-2 minutes
- **Build**: ~2-3 minutes  
- **Deploy**: ~1 minute
- **Verify**: ~30 seconds

**Total time: ~5-7 minutes**

### Step 7: Access Your Application

1. Once deployed, you'll see a URL like:
   ```
   https://main.d1234567890.amplifyapp.com
   ```

2. Click the URL to open your application

3. **Share the URL** with your team!

## Continuous Deployment

Every time you push to GitHub, AWS Amplify will automatically rebuild and redeploy your app!

```bash
# Make changes to your code
git add .
git commit -m "Update ticket system"
git push
```

AWS Amplify detects the push and redeploys automatically! 🚀

## Custom Domain (Optional)

1. In Amplify Console, go to "Domain management"
2. Click "Add domain"
3. Enter your domain (e.g., `vendor-escalation.amazon.com`)
4. Follow DNS configuration steps

## Troubleshooting

### Build Fails

**Check Node version in Amplify:**
1. Go to "Build settings"
2. Add to `preBuild`:
   ```yaml
   preBuild:
     commands:
       - nvm use 18
       - npm ci
   ```

### Environment Variables

If you need API keys or environment variables:
1. Go to "Environment variables"
2. Add variables (e.g., `VITE_API_KEY`)
3. Redeploy

### Build Command Issues

Make sure your `package.json` has:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## Cost Estimate

AWS Amplify Free Tier includes:
- ✅ 1,000 build minutes per month
- ✅ 15 GB data transfer per month  
- ✅ 5 GB storage

**For this app:** Essentially FREE for internal use!

## Security Best Practices

1. **Use Private GitHub Repo** for internal Amazon tools
2. **Enable MFA** on AWS account
3. **Set up Access Control** in Amplify (if needed)
4. **Use HTTPS** (enabled by default)

## Support

If you encounter issues:
1. Check AWS Amplify build logs
2. Check GitHub repository
3. Review this deployment guide
4. Contact AWS Support (if using Amazon corporate account)

## Next Steps

Once deployed, you can:
- ✅ Share the URL with your team
- ✅ Set up custom domain
- ✅ Configure authentication (if needed)
- ✅ Add more features and push updates
- ✅ Monitor usage in AWS Console

---

**Ready to deploy?** Follow Step 1 above! 🚀
