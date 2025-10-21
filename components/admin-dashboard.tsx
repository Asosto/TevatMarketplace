"use client"

import { useState, useEffect } from "react"
import { LogOut, Package, ShoppingCart, DollarSign, TrendingUp, Users, Clock, CheckCircle, Plus, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Link from "next/link"
import Image from "next/image"
import { productService, orderService, Product, Order } from "@/lib/supabase"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showProductDialog, setShowProductDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    image: '',
    category: '',
    description: '',
    stock: 0,
    is_active: true
  })

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
  })

  // Load data on component mount
  useEffect(() => {
    loadData()
  }, [])

  // Set up real-time subscriptions
  useEffect(() => {
    const productSubscription = productService.subscribeToProducts((payload) => {
      console.log('Product change:', payload)
      loadProducts()
    })

    const orderSubscription = orderService.subscribeToOrders((payload) => {
      console.log('Order change:', payload)
      loadOrders()
    })

    return () => {
      productSubscription.unsubscribe()
      orderSubscription.unsubscribe()
    }
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      await Promise.all([loadProducts(), loadOrders()])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadProducts = async () => {
    try {
      // Check if Supabase is configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
        console.warn('Supabase not configured. Using mock data.')
        // Use mock data when Supabase is not configured
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'MacBook Pro 16" M3 Max',
            price: 3499,
            image: '/macbook-pro-16-inch-space-black.jpg',
            category: 'Laptops',
            description: 'The most powerful MacBook Pro ever.',
            stock: 10,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
        setProducts(mockProducts)
        setStats(prev => ({ ...prev, totalProducts: mockProducts.length }))
        return
      }
      
      const data = await productService.getProducts()
      setProducts(data)
      setStats(prev => ({ ...prev, totalProducts: data.length }))
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  const loadOrders = async () => {
    try {
      // Check if Supabase is configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
        console.warn('Supabase not configured. Using mock data.')
        // Use mock data when Supabase is not configured
        const mockOrders: Order[] = [
          {
            id: 'ORD-001',
            customer_name: 'John Doe',
            customer_email: 'john@example.com',
            items: [{ product_id: '1', product_name: 'MacBook Pro', quantity: 1, price: 3499 }],
            total: 3499,
            status: 'pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
        setOrders(mockOrders)
        
        const totalOrders = mockOrders.length
        const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)
        const pendingOrders = mockOrders.filter(o => o.status === 'pending').length
        const completedOrders = mockOrders.filter(o => o.status === 'delivered').length

        setStats(prev => ({
          ...prev,
          totalOrders,
          totalRevenue,
          pendingOrders,
          completedOrders
        }))
        return
      }
      
      const data = await orderService.getOrders()
      setOrders(data)
      
      const totalOrders = data.length
      const totalRevenue = data.reduce((sum, order) => sum + order.total, 0)
      const pendingOrders = data.filter(o => o.status === 'pending').length
      const completedOrders = data.filter(o => o.status === 'delivered').length

      setStats(prev => ({
        ...prev,
        totalOrders,
        totalRevenue,
        pendingOrders,
        completedOrders
      }))
    } catch (error) {
      console.error('Error loading orders:', error)
    }
  }

  // Product management functions
  const handleCreateProduct = async () => {
    try {
      await productService.createProduct(newProduct as Omit<Product, 'id' | 'created_at' | 'updated_at'>)
      setNewProduct({
        name: '',
        price: 0,
        image: '',
        category: '',
        description: '',
        stock: 0,
        is_active: true
      })
      setShowProductDialog(false)
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct) return
    try {
      await productService.updateProduct(editingProduct.id, editingProduct)
      setEditingProduct(null)
      setShowProductDialog(false)
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id)
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const handleUpdateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      await orderService.updateOrderStatus(id, status)
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
      case "confirmed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30"
      case "shipped":
        return "bg-purple-500/10 text-purple-500 border-purple-500/30"
      case "delivered":
        return "bg-green-500/10 text-green-500 border-green-500/30"
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/30"
      default:
        return ""
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10">
                <Image 
                  src="/logo.svg" 
                  alt="Tevat Logo" 
                  width={40} 
                  height={40}
                  className="w-10 h-10"
                />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-foreground">TEVAT</span>
                <Badge variant="secondary" className="ml-3 bg-primary/10 text-primary border-primary/20">
                  Admin
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View Store
              </Link>
              <Button variant="outline" size="sm" onClick={onLogout} className="bg-background border-border hover:bg-muted">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'products'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Orders
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Manage your TEVAT marketplace</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-background border border-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Products</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalProducts}</p>
                </div>
              </div>

              <div className="bg-background border border-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalOrders}</p>
                </div>
              </div>

              <div className="bg-background border border-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-500" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-background border border-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Orders</p>
                  <p className="text-3xl font-bold text-foreground">{stats.pendingOrders}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Product Management</h1>
                <p className="text-muted-foreground">Manage your product inventory</p>
              </div>
              <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingProduct(null)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Product Name</label>
                      <Input
                        value={editingProduct?.name || newProduct.name || ''}
                        onChange={(e) => {
                          if (editingProduct) {
                            setEditingProduct({ ...editingProduct, name: e.target.value })
                          } else {
                            setNewProduct({ ...newProduct, name: e.target.value })
                          }
                        }}
                        placeholder="Enter product name"
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Price</label>
                        <Input
                          type="number"
                          value={editingProduct?.price || newProduct.price || ''}
                          onChange={(e) => {
                            if (editingProduct) {
                              setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                            } else {
                              setNewProduct({ ...newProduct, price: Number(e.target.value) })
                            }
                          }}
                          placeholder="0.00"
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Stock</label>
                        <Input
                          type="number"
                          value={editingProduct?.stock || newProduct.stock || ''}
                          onChange={(e) => {
                            if (editingProduct) {
                              setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })
                            } else {
                              setNewProduct({ ...newProduct, stock: Number(e.target.value) })
                            }
                          }}
                          placeholder="0"
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                      <Select
                        value={editingProduct?.category || newProduct.category || ''}
                        onValueChange={(value) => {
                          if (editingProduct) {
                            setEditingProduct({ ...editingProduct, category: value })
                          } else {
                            setNewProduct({ ...newProduct, category: value })
                          }
                        }}
                      >
                        <SelectTrigger className="bg-background border-border text-foreground">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Laptops">Laptops</SelectItem>
                          <SelectItem value="Audio">Audio</SelectItem>
                          <SelectItem value="Accessories">Accessories</SelectItem>
                          <SelectItem value="Gaming">Gaming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                      <Textarea
                        value={editingProduct?.description || newProduct.description || ''}
                        onChange={(e) => {
                          if (editingProduct) {
                            setEditingProduct({ ...editingProduct, description: e.target.value })
                          } else {
                            setNewProduct({ ...newProduct, description: e.target.value })
                          }
                        }}
                        placeholder="Enter product description"
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Image URL</label>
                      <Input
                        value={editingProduct?.image || newProduct.image || ''}
                        onChange={(e) => {
                          if (editingProduct) {
                            setEditingProduct({ ...editingProduct, image: e.target.value })
                          } else {
                            setNewProduct({ ...newProduct, image: e.target.value })
                          }
                        }}
                        placeholder="Enter image URL"
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setShowProductDialog(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {editingProduct ? 'Update Product' : 'Create Product'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Products List */}
            <div className="bg-background border border-border rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Products ({products.length})</h2>
              </div>
              <div className="divide-y divide-border">
                {products.map((product) => (
                  <div key={product.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover bg-muted"
                      />
                      <div>
                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="text-sm text-muted-foreground">Stock: {product.stock || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${product.price}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.is_active ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingProduct(product)
                            setShowProductDialog(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Order Management</h1>
              <p className="text-muted-foreground">Manage customer orders</p>
            </div>

            {/* Orders List */}
            <div className="bg-background border border-border rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Recent Orders ({orders.length})</h2>
              </div>
              <div className="divide-y divide-border">
                {orders.map((order) => (
                  <div key={order.id} className="p-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Items</p>
                          <p className="font-semibold text-foreground">{order.items.length}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="font-semibold text-lg text-foreground">${order.total}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-semibold text-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Select
                            value={order.status}
                            onValueChange={(status: Order['status']) => handleUpdateOrderStatus(order.id, status)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
