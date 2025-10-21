# Supabase Setup Guide for Tevat Marketplace

## 🚀 Quick Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Note your project URL and API key

### 2. Set Environment Variables
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Database Schema
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database-schema.sql`
4. Run the SQL script

### 4. Enable Real-time
1. In Supabase dashboard, go to Database > Replication
2. Enable real-time for both `products` and `orders` tables

## 🎯 Features

### Admin Dashboard Features
- ✅ **Real-time Updates**: Changes sync instantly across all devices
- ✅ **Product Management**: Add, edit, delete products with full CRUD operations
- ✅ **Order Management**: Update order statuses in real-time
- ✅ **Statistics**: Live stats for products, orders, and revenue
- ✅ **Modern UI**: Clean, visible interface with proper contrast

### Product Management
- Add new products with name, price, category, description, stock
- Edit existing products
- Delete products
- Real-time inventory tracking
- Image URL support

### Order Management
- View all orders with customer details
- Update order status (pending → confirmed → shipped → delivered)
- Real-time order tracking
- Order statistics

## 🔧 Technical Details

### Database Schema
- **Products Table**: Stores product information with real-time updates
- **Orders Table**: Manages customer orders with status tracking
- **Real-time Subscriptions**: Automatic UI updates when data changes

### Real-time Features
- Product changes sync instantly
- Order status updates in real-time
- Statistics update automatically
- No page refresh needed

## 🎨 UI Improvements
- Fixed text visibility issues
- Proper contrast ratios
- Modern tabbed interface
- Responsive design
- Loading states

## 🚀 Getting Started
1. Complete the Supabase setup above
2. Run `npm run dev`
3. Navigate to `/admin-secret-dashboard`
4. Login with admin credentials
5. Start managing your products and orders!

## 📱 Admin Access
- URL: `/admin-secret-dashboard`
- Real-time product management
- Order status management
- Live statistics dashboard
