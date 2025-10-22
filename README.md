# Tevat Marketplace

e-commerce platform built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Real-time Product Management** - Add, edit, delete products with instant updates
- **Modern UI/UX** 
- **Admin Dashboard** - Complete product and order management system
- **Mobile Responsive** - Works perfectly on all devices
- **Real-time Updates** - Changes sync instantly across all pages
- **Product Categories** - Organized by Laptops, Audio, Accessories, Gaming
- **Search & Filter** - product search and filtering


## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Radix UI, Lucide React
- **Deployment**: Vercel 

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tevat-marketplace.git
   cd tevat-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL script from `database-schema.sql`
   - Enable real-time for `products` and `orders` tables

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Usage

### **Customer Experience**
- **Home Page** (`/`) - Featured products and company info
- **Marketplace** (`/marketplace`) - Browse all products with search/filter
- **Product Details** (`/product/[id]`) - Individual product pages
- **Shopping Cart** (`/cart`) - Cart management

### **Admin Dashboard**
- **Access**: `/admin-secret-dashboard`
- **Features**:
  - Add/Edit/Delete products
  - Manage product inventory
  - Track orders and revenue
  - Real-time statistics
  - Order status management

## Database Schema

### Products Table
- `id` - Unique product identifier
- `name` - Product name
- `price` - Product price
- `image` - Product image URL
- `category` - Product category
- `description` - Product description
- `stock` - Inventory count
- `is_active` - Product status
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Orders Table
- `id` - Unique order identifier
- `customer_name` - Customer name
- `customer_email` - Customer email
- `items` - Order items (JSON)
- `total` - Order total
- `status` - Order status
- `created_at` - Order timestamp
- `updated_at` - Last update timestamp

## Development

### **Project Structure**
```
tevat-marketplace/
├── app/                    # Next.js app directory
│   ├── admin-secret-dashboard/  # Admin dashboard
│   ├── marketplace/        # Marketplace page
│   ├── product/[id]/      # Product detail pages
│   └── cart/              # Shopping cart
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── lib/                  # Utility functions
│   └── supabase.ts       # Database configuration
├── public/               # Static assets
└── styles/              # Global styles
```

### **Key Components**
- `Navigation` - Main navigation with logo and cart
- `MarketplaceView` - Product grid with search/filter
- `ProductDetail` - Individual product pages
- `AdminDashboard` - Admin management interface
- `CartView` - Shopping cart functionality




##  Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Lucide React](https://lucide.dev/) - Icons

