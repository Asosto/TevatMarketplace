#!/bin/bash

# Tevat Marketplace - Supabase Setup Script
echo "🚀 Setting up Supabase for Tevat Marketplace..."
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Supabase Configuration
# Replace with your actual Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EOF
    echo "✅ Created .env.local file"
else
    echo "✅ .env.local file already exists"
fi

echo ""
echo "📋 Next steps:"
echo "1. Go to https://supabase.com and create a new project"
echo "2. Get your Project URL and anon key from Settings → API"
echo "3. Update .env.local with your actual credentials:"
echo "   - NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key"
echo "4. Run the database schema in Supabase SQL Editor"
echo "5. Test your connection: node test-supabase.js"
echo "6. Start your dev server: npm run dev"
echo ""
echo "📚 See SUPABASE_QUICK_SETUP.md for detailed instructions"
