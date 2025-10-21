# 🛍️ Tevat Marketplace

A modern, real-time e-commerce platform built with Next.js, Supabase, and Tailwind CSS.

## ✨ Features

- 🛒 **Real-time Product Management** - Add, edit, delete products with instant updates
- 🎨 **Modern UI/UX** - Beautiful, responsive design with glassmorphism effects
- 🔐 **Admin Dashboard** - Complete product and order management system
- 🛍️ **Shopping Cart** - Full cart functionality with local storage
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Real-time Updates** - Changes sync instantly across all pages
- 🎯 **Product Categories** - Organized by Laptops, Audio, Accessories, Gaming
- 🔍 **Search & Filter** - Advanced product search and filtering
- 📊 **Analytics Dashboard** - Order tracking and revenue statistics

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Radix UI, Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

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

## 🎯 Usage

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

## 🗄️ Database Schema

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

## 🔧 Development

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

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every push

### **Other Platforms**
- **Netlify**: Connect GitHub repo and set environment variables
- **Railway**: Deploy with database integration
- **DigitalOcean**: Manual deployment with custom domain

## 📱 Features Overview

### **Customer Features**
- ✅ Browse products by category
- ✅ Search and filter products
- ✅ Add products to cart
- ✅ View product details
- ✅ Responsive design
- ✅ Fast loading

### **Admin Features**
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ Real-time statistics
- ✅ Inventory tracking
- ✅ Order status updates
- ✅ Revenue analytics

## 🔒 Security

- Environment variables for sensitive data
- Supabase Row Level Security (RLS)
- Input validation and sanitization
- Secure authentication for admin access

## 📈 Performance

- Next.js 15 with App Router
- Image optimization
- Code splitting
- Static generation where possible
- Real-time updates with Supabase

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Lucide React](https://lucide.dev/) - Icons

## 📞 Support

For support, email support@tevat.com or create an issue in this repository.

---

**Built with ❤️ by the Tevat Team**
