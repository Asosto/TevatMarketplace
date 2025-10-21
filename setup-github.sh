#!/bin/bash

# Tevat Marketplace - GitHub Setup Script
echo "🚀 Setting up GitHub for Tevat Marketplace..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Please run 'git init' first."
    exit 1
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"

# Check if remote exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "✅ Remote origin already exists"
else
    echo "⚠️  No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/tevat-marketplace.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
fi

echo ""
echo "🎉 GitHub setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Copy the repository URL"
echo "3. Run these commands:"
echo "   git remote add origin YOUR_GITHUB_REPO_URL"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "🔄 For automatic updates, run:"
echo "   git add ."
echo "   git commit -m 'Your update message'"
echo "   git push"
echo ""
echo "📚 See README.md for detailed setup instructions"
