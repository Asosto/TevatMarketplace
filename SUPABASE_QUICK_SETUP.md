# 🚀 Supabase Quick Setup Guide

## ❌ **Current Issue:**
Your admin dashboard isn't working because Supabase isn't properly configured. Let's fix this!

## ✅ **Step-by-Step Fix:**

### **1. Create Supabase Project**

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up/Login** with your account
3. **Click "New Project"**
4. **Project Settings:**
   - **Name**: `tevat-marketplace`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
5. **Click "Create new project"**
6. **Wait 2-3 minutes** for setup to complete

### **2. Get Your Supabase Credentials**

Once your project is ready:

1. **Go to Settings → API**
2. **Copy these values:**
   - **Project URL** (looks like: `https://your-project.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### **3. Set Environment Variables**

Create/update your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Replace with your actual values!**

### **4. Set Up Database Schema**

1. **Go to your Supabase dashboard**
2. **Click "SQL Editor"** in the left sidebar
3. **Click "New Query"**
4. **Copy and paste** the entire contents of `database-schema.sql`
5. **Click "Run"** to execute the SQL

### **5. Enable Real-time**

1. **Go to Database → Replication**
2. **Enable real-time** for:
   - ✅ `products` table
   - ✅ `orders` table

### **6. Test Your Setup**

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Go to `/admin-secret-dashboard`**
3. **Try adding a product**
4. **Check `/marketplace`** - your product should appear!

## 🔧 **Troubleshooting**

### **"Supabase not configured" Error:**
- Check your `.env.local` file has correct values
- Make sure no extra spaces or quotes
- Restart your dev server after changes

### **"Cannot connect to database" Error:**
- Verify your Supabase URL and key are correct
- Check if your Supabase project is active
- Make sure you're using the `anon` key, not the `service_role` key

### **Products not appearing:**
- Check if database schema was run successfully
- Verify real-time is enabled for products table
- Check browser console for errors

### **Admin dashboard not loading:**
- Make sure environment variables are set correctly
- Check if Supabase project is not paused
- Verify the database tables exist

## 📱 **Quick Test Commands**

```bash
# Check if environment variables are loaded
echo $NEXT_PUBLIC_SUPABASE_URL

# Restart dev server
npm run dev

# Check for errors in browser console
# Open DevTools (F12) and look for red errors
```

## 🎯 **Expected Results After Setup:**

1. **Admin Dashboard** (`/admin-secret-dashboard`):
   - ✅ Loads without errors
   - ✅ Shows "Products" tab
   - ✅ Can add/edit/delete products
   - ✅ Real-time updates work

2. **Marketplace** (`/marketplace`):
   - ✅ Shows products from database
   - ✅ New products appear instantly
   - ✅ Search and filter work

3. **Product Pages** (`/product/[id]`):
   - ✅ Load individual products from database
   - ✅ Show correct product information

## 🚀 **Deploy to Production**

Once working locally:

1. **Add environment variables to Vercel:**
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Redeploy:**
   - Push changes to GitHub
   - Vercel will automatically redeploy

## 📞 **Need Help?**

If you're still having issues:

1. **Check the browser console** for error messages
2. **Verify your Supabase project** is not paused
3. **Double-check environment variables** are exactly right
4. **Make sure database schema** was run successfully

**Your Tevat Marketplace will work perfectly once Supabase is configured! 🎉**
