# 🚀 GitHub Setup Guide for Tevat Marketplace

## 📋 **Step-by-Step GitHub Setup**

### **1. Create GitHub Repository**

1. **Go to GitHub.com** and sign in
2. **Click "New Repository"** (green button)
3. **Repository Settings:**
   - **Name**: `tevat-marketplace`
   - **Description**: `Modern e-commerce platform with real-time product management`
   - **Visibility**: Public (or Private if you prefer)
   - **Initialize**: ❌ Don't check "Add README" (we already have one)
4. **Click "Create Repository"**

### **2. Connect Your Local Project to GitHub**

Run these commands in your project directory:

```bash
# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/tevat-marketplace.git

# Rename default branch to main
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### **3. Automatic Updates Setup**

Every time you make changes, run these commands:

```bash
# Add all changes
git add .

# Commit with a descriptive message
git commit -m "Your update description"

# Push to GitHub
git push
```

### **4. GitHub Actions (Automatic Deployment)**

The project includes GitHub Actions for automatic deployment to Vercel:

1. **Go to your GitHub repository**
2. **Click "Actions" tab**
3. **Enable GitHub Actions** if prompted
4. **Set up secrets** in Settings → Secrets and variables → Actions:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `VERCEL_TOKEN`
   - `ORG_ID`
   - `PROJECT_ID`

### **5. Quick Setup Script**

You can use the included setup script:

```bash
# Make script executable (already done)
chmod +x setup-github.sh

# Run the setup script
./setup-github.sh
```

## 🔄 **Daily Workflow**

### **Making Changes:**
1. **Edit your code** in your favorite editor
2. **Test locally**: `npm run dev`
3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Add new feature: product search"
   git push
   ```
4. **Changes automatically sync** to GitHub!

### **Collaboration:**
- **Pull Requests**: Create PRs for major changes
- **Issues**: Track bugs and feature requests
- **Branches**: Use feature branches for new development

## 🎯 **GitHub Features You'll Use**

### **Repository Management:**
- ✅ **Code Storage**: All your code safely stored
- ✅ **Version History**: Track every change
- ✅ **Backup**: Never lose your work
- ✅ **Collaboration**: Work with others easily

### **Automatic Features:**
- ✅ **Auto-sync**: Changes push to GitHub automatically
- ✅ **Deployment**: Auto-deploy to Vercel (if configured)
- ✅ **CI/CD**: Automatic testing and building
- ✅ **Issues**: Track bugs and features

## 📱 **GitHub Mobile App**

Download the GitHub mobile app to:
- View your code on the go
- Manage issues and PRs
- Get notifications
- Review code changes

## 🔧 **Advanced Setup**

### **Branch Protection:**
1. Go to Settings → Branches
2. Add rule for `main` branch
3. Require pull request reviews
4. Require status checks

### **Environment Variables:**
Set up in GitHub repository settings:
- Go to Settings → Secrets and variables → Actions
- Add your Supabase credentials
- Add Vercel deployment tokens

### **Webhooks:**
- Set up webhooks for automatic deployments
- Connect to Vercel, Netlify, or other platforms
- Get notifications on deployments

## 🚨 **Troubleshooting**

### **Common Issues:**

**"Remote origin already exists"**
```bash
git remote remove origin
git remote add origin YOUR_NEW_URL
```

**"Permission denied"**
- Check your GitHub authentication
- Use Personal Access Token if needed

**"Branch not found"**
```bash
git branch -M main
git push -u origin main
```

### **Reset Repository:**
```bash
# Remove all Git history and start fresh
rm -rf .git
git init
git add .
git commit -m "Fresh start"
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

## 📚 **Useful Git Commands**

```bash
# Check status
git status

# See what changed
git diff

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (lose changes)
git reset --hard HEAD~1

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Merge branch
git merge feature/new-feature
```

## 🎉 **You're All Set!**

Your Tevat Marketplace is now connected to GitHub with:
- ✅ **Version Control**: Track every change
- ✅ **Backup**: Code safely stored
- ✅ **Collaboration**: Easy team work
- ✅ **Deployment**: Automatic updates
- ✅ **Documentation**: Complete setup guides

**Happy coding! 🚀**
