import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import { Product, Category, Order, OrderStatus } from '../types';
import { formatINR, formatDate } from '../utils/formatters';
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Layers,
  Phone,
  MessageSquare,
  Search,
  X,
  ExternalLink,
  Store
} from 'lucide-react';

interface AdminDashboardPageProps {
  onBackToStore: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onBackToStore }) => {
  const { admin, logout } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'categories' | 'inquiries'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search in admin
  const [adminSearch, setAdminSearch] = useState('');

  // Modals
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, prods, ords, cats] = await Promise.all([
        api.getDashboardStats().catch(() => null),
        api.getProducts(),
        api.getOrders().catch(() => []),
        api.getCategories()
      ]);

      if (statsData) setStats(statsData);
      setProducts(prods);
      setOrders(ords);
      setCategories(cats);
    } catch (err: any) {
      console.error('Error loading admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Product CRUD
  const handleOpenNewProduct = () => {
    setEditingProduct({
      name: '',
      slug: '',
      description: '',
      price: 499,
      discountPrice: 420,
      category: categories[0]?.name || 'Pooja Baskets',
      images: ['/images/pooja-kudai.jpg'],
      material: 'Virgin Grade Heavy-Duty Plastic Wire',
      size: 'Medium (10x8x7 inches)',
      color: 'Multi-color',
      weight: '400g',
      knotType: 'Normal Box Knot',
      stock: 15,
      featured: true,
      popular: false
    });
    setProductModalOpen(true);
  };

  const handleEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price) {
      showToast('Name and price are required', 'error');
      return;
    }

    try {
      if (editingProduct._id) {
        await api.updateProduct(editingProduct._id, editingProduct);
        showToast('Product updated successfully!', 'success');
      } else {
        await api.createProduct(editingProduct);
        showToast('Product created successfully!', 'success');
      }
      setProductModalOpen(false);
      setEditingProduct(null);
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Error saving product', 'error');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(id);
      showToast('Product deleted', 'success');
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Error deleting product', 'error');
    }
  };

  // Order Status Update
  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      showToast(`Order status changed to ${newStatus}`, 'success');
      setOrders(prev =>
        prev.map(o => (o._id === orderId || o.orderId === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err: any) {
      showToast(err.message || 'Failed to update order status', 'error');
    }
  };

  // Category CRUD
  const handleOpenNewCategory = () => {
    setEditingCategory({
      name: '',
      slug: '',
      description: '',
      image: '/images/hero.jpg',
      itemCount: 0
    });
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name) {
      showToast('Category name is required', 'error');
      return;
    }

    try {
      if (editingCategory._id) {
        await api.updateCategory(editingCategory._id, editingCategory);
        showToast('Category updated!', 'success');
      } else {
        await api.createCategory(editingCategory);
        showToast('Category added!', 'success');
      }
      setCategoryModalOpen(false);
      setEditingCategory(null);
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Failed to save category', 'error');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await api.deleteCategory(id);
      showToast('Category deleted', 'success');
      loadData();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete category', 'error');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.knotType.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    o.customerName.toLowerCase().includes(adminSearch.toLowerCase()) ||
    o.orderId.toLowerCase().includes(adminSearch.toLowerCase()) ||
    o.phone.includes(adminSearch)
  );

  return (
    <div className="min-h-screen bg-cream-100/60 pb-16">
      
      {/* Top Admin Header */}
      <header className="bg-earth-950 text-white border-b border-gold-500/40 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-500 text-earth-950 flex items-center justify-center font-bold text-lg font-serif">
              P
            </div>
            <div>
              <span className="font-serif font-bold text-lg tracking-wider text-white">
                PREMAHANDCRAFT
              </span>
              <span className="block text-[10px] text-gold-400 font-mono tracking-widest uppercase">
                Admin Management Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-earth-800 hover:bg-earth-700 text-cream-200 text-xs font-semibold transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-semibold transition-colors border border-red-700/50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div className="bg-white border-b border-cream-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-earth-900 text-gold-300 shadow'
                : 'text-earth-700 hover:bg-cream-100'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-earth-900 text-gold-300 shadow'
                : 'text-earth-700 hover:bg-cream-100'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-earth-900 text-gold-300 shadow'
                : 'text-earth-700 hover:bg-cream-100'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'categories'
                ? 'bg-earth-900 text-gold-300 shadow'
                : 'text-earth-700 hover:bg-cream-100'
            }`}
          >
            Categories ({categories.length})
          </button>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-earth-500">Total Sales</p>
                  <p className="font-serif text-2xl font-extrabold text-earth-950 mt-1">
                    {formatINR(stats?.totalSales || orders.reduce((sum, o) => sum + o.totalAmount, 0))}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1">Confirmed & Processing</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-earth-500">Total Orders</p>
                  <p className="font-serif text-2xl font-extrabold text-earth-950 mt-1">
                    {orders.length}
                  </p>
                  <p className="text-[11px] text-earth-600 mt-1">All time</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gold-100 text-earth-800 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-earth-800" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-earth-500">Pending Orders</p>
                  <p className="font-serif text-2xl font-extrabold text-amber-600 mt-1">
                    {orders.filter(o => o.status === 'Pending').length}
                  </p>
                  <p className="text-[11px] text-amber-700 font-semibold mt-1">Awaiting confirmation</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-earth-500">Catalog Products</p>
                  <p className="font-serif text-2xl font-extrabold text-earth-950 mt-1">
                    {products.length}
                  </p>
                  <p className="text-[11px] text-earth-600 mt-1">Across {categories.length} categories</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-cream-200 text-earth-800 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick Actions & Recent Orders Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Recent Orders List */}
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-cream-200">
                  <h3 className="font-serif text-lg font-bold text-earth-950">Recent Customer Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-gold-600 hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-cream-200 text-earth-500 font-bold uppercase">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Items</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o._id} className="hover:bg-cream-50 transition-colors">
                          <td className="py-3 font-mono font-bold text-earth-900">{o.orderId}</td>
                          <td className="py-3 font-medium text-earth-950">{o.customerName}</td>
                          <td className="py-3 text-earth-600">{o.items.length} item(s)</td>
                          <td className="py-3 font-extrabold text-earth-900">{formatINR(o.totalAmount)}</td>
                          <td className="py-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                              o.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : o.status === 'Pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Admin Actions Box */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
                <h3 className="font-serif text-lg font-bold text-earth-950 pb-3 border-b border-cream-200">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={handleOpenNewProduct}
                    className="w-full py-3 px-4 bg-earth-900 hover:bg-earth-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Wire Kudai Product</span>
                  </button>
                  <button
                    onClick={handleOpenNewCategory}
                    className="w-full py-3 px-4 bg-gold-500 hover:bg-gold-400 text-earth-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Category</span>
                  </button>
                  <a
                    href="https://wa.me/919361244779"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-whatsapp-light hover:bg-whatsapp-dark text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow"
                  >
                    <Phone className="w-4 h-4 fill-white" />
                    <span>Open Business WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-cream-200">
              <div>
                <h2 className="font-serif text-2xl font-bold text-earth-950">Catalog Products</h2>
                <p className="text-xs text-earth-600">Manage prices, descriptions, images, knot types, and stock</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Filter products..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="bg-cream-50 border border-cream-300 rounded-xl py-2 px-3 text-xs w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <button
                  onClick={handleOpenNewProduct}
                  className="px-4 py-2 bg-earth-900 hover:bg-earth-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-cream-200 text-earth-500 font-bold uppercase">
                    <th className="pb-3">Image</th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Knot Type</th>
                    <th className="pb-3">Price (₹)</th>
                    <th className="pb-3">Stock</th>
                    <th className="pb-3">Badges</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-100">
                  {filteredProducts.map(p => (
                    <tr key={p._id} className="hover:bg-cream-50 transition-colors">
                      <td className="py-3">
                        <img
                          src={p.images[0] || '/images/pooja-kudai.jpg'}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover border border-cream-200"
                        />
                      </td>
                      <td className="py-3 font-bold text-earth-950 max-w-xs">{p.name}</td>
                      <td className="py-3 text-earth-600">{p.category}</td>
                      <td className="py-3 text-earth-700 font-medium">{p.knotType}</td>
                      <td className="py-3 font-extrabold text-earth-900">
                        {formatINR(p.discountPrice || p.price)}
                        {p.discountPrice && (
                          <span className="block text-[10px] text-earth-400 line-through">
                            {formatINR(p.price)}
                          </span>
                        )}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          p.stock <= 5 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 space-x-1">
                        {p.featured && <span className="text-[10px] bg-gold-100 text-gold-900 px-1.5 py-0.5 rounded font-bold">Featured</span>}
                        {p.popular && <span className="text-[10px] bg-earth-100 text-earth-900 px-1.5 py-0.5 rounded font-bold">Popular</span>}
                      </td>
                      <td className="py-3 text-right space-x-2">
                        <button
                          onClick={() => handleEditProduct(p)}
                          className="p-1.5 text-earth-700 hover:text-earth-950 hover:bg-cream-200 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-cream-200">
              <div>
                <h2 className="font-serif text-2xl font-bold text-earth-950">Customer Orders</h2>
                <p className="text-xs text-earth-600">Track and fulfill WhatsApp and storefront orders</p>
              </div>

              <input
                type="text"
                placeholder="Search orders by customer or ID..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="bg-cream-50 border border-cream-300 rounded-xl py-2 px-3 text-xs w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-cream-200 text-earth-500 font-bold uppercase">
                    <th className="pb-3">Order ID & Date</th>
                    <th className="pb-3">Customer Details</th>
                    <th className="pb-3">Items Ordered</th>
                    <th className="pb-3">Delivery Address</th>
                    <th className="pb-3">Total (₹)</th>
                    <th className="pb-3">Order Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-100">
                  {filteredOrders.map(o => (
                    <tr key={o._id} className="hover:bg-cream-50 transition-colors">
                      <td className="py-3">
                        <span className="font-mono font-bold text-earth-950 block">{o.orderId}</span>
                        <span className="text-[10px] text-earth-500">{formatDate(o.createdAt)}</span>
                      </td>
                      <td className="py-3">
                        <span className="font-bold text-earth-950 block">{o.customerName}</span>
                        <span className="text-[11px] text-earth-600 block">{o.phone}</span>
                        <a
                          href={`https://wa.me/${o.whatsappNumber.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-whatsapp-teal hover:underline font-bold"
                        >
                          Chat on WhatsApp
                        </a>
                      </td>
                      <td className="py-3 max-w-xs">
                        <div className="space-y-1">
                          {o.items.map((item, idx) => (
                            <div key={idx} className="text-[11px] text-earth-700">
                              • {item.name} x{item.quantity} ({formatINR(item.price)})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 text-[11px] text-earth-600 max-w-xs">
                        {o.address}, {o.city} - {o.pincode}
                        {o.specialInstructions && (
                          <span className="block italic text-gold-700 mt-1">
                            Note: {o.specialInstructions}
                          </span>
                        )}
                      </td>
                      <td className="py-3 font-extrabold text-earth-950">
                        {formatINR(o.totalAmount)}
                      </td>
                      <td className="py-3">
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o._id, e.target.value as OrderStatus)}
                          className={`text-xs font-bold py-1.5 px-2.5 rounded-lg border focus:outline-none ${
                            o.status === 'Delivered'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : o.status === 'Pending'
                              ? 'bg-amber-50 border-amber-300 text-amber-800'
                              : o.status === 'Cancelled'
                              ? 'bg-red-50 border-red-300 text-red-800'
                              : 'bg-blue-50 border-blue-300 text-blue-800'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-cream-200">
              <div>
                <h2 className="font-serif text-2xl font-bold text-earth-950">Categories</h2>
                <p className="text-xs text-earth-600">Add or edit wire kudai collections</p>
              </div>
              <button
                onClick={handleOpenNewCategory}
                className="px-4 py-2 bg-earth-900 hover:bg-earth-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(c => (
                <div key={c._id} className="p-4 rounded-2xl border border-cream-200 bg-cream-50 space-y-3">
                  <img src={c.image || '/images/hero.jpg'} alt={c.name} className="w-full h-32 object-cover rounded-xl" />
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-base text-earth-950">{c.name}</h3>
                    <button
                      onClick={() => handleDeleteCategory(c._id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-earth-600 line-clamp-2">{c.description}</p>
                </div>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* Add / Edit Product Modal */}
      {productModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-earth-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-cream-200 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="font-serif text-xl font-bold text-earth-950">
                {editingProduct._id ? 'Edit Product' : 'Add New Wire Kudai'}
              </h3>
              <button onClick={() => setProductModalOpen(false)} className="p-1 text-earth-400 hover:text-earth-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-earth-700 uppercase mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-bold text-earth-700 uppercase mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-bold text-earth-700 uppercase mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.discountPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, discountPrice: Number(e.target.value) })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-bold text-earth-700 uppercase mb-1">Category</label>
                  <select
                    value={editingProduct.category || categories[0]?.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl p-2.5"
                  >
                    {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-earth-700 uppercase mb-1">Knot Type</label>
                  <select
                    value={editingProduct.knotType || 'Normal Box Knot'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, knotType: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl p-2.5"
                  >
                    <option value="Normal Box Knot">Normal Box Knot</option>
                    <option value="Biscuit Knot (Diamond Weave)">Biscuit Knot</option>
                    <option value="Amla (Gooseberry) Knot Weave">Amla Knot</option>
                    <option value="Sivan Kan (Shiva Eye) Knot">Sivan Kan Knot</option>
                    <option value="Cross-Cut Lattice Weave">Cross-Cut Lattice</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-earth-700 uppercase mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingProduct.stock || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-bold text-earth-700 uppercase mb-1">Size / Dimensions</label>
                  <input
                    type="text"
                    value={editingProduct.size || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, size: e.target.value })}
                    placeholder="Medium (10x8x7 inches)"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl p-2.5"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-earth-700 uppercase mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    value={editingProduct.images?.[0] || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                    placeholder="/images/pooja-kudai.jpg"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl p-2.5"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-earth-700 uppercase mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingProduct.description || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl p-2.5"
                  />
                </div>

                <div className="sm:col-span-2 flex gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={editingProduct.featured || false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                      className="rounded accent-earth-900"
                    />
                    <span>Mark as Featured</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={editingProduct.popular || false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, popular: e.target.checked })}
                      className="rounded accent-earth-900"
                    />
                    <span>Mark as Popular</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-cream-200">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 text-earth-600 hover:text-earth-900 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-earth-900 text-white rounded-xl font-bold shadow hover:bg-earth-800"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {categoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-earth-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-cream-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200">
              <h3 className="font-serif text-lg font-bold text-earth-950">Add Category</h3>
              <button onClick={() => setCategoryModalOpen(false)} className="p-1 text-earth-400 hover:text-earth-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-earth-700 uppercase mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  placeholder="e.g. Wedding Gift Kudai"
                  className="w-full bg-cream-50 border border-cream-300 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-earth-700 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="Short description of this collection..."
                  className="w-full bg-cream-50 border border-cream-300 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-earth-700 uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingCategory.image || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                  placeholder="/images/hero.jpg"
                  className="w-full bg-cream-50 border border-cream-300 rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-4 py-2 text-earth-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-earth-900 text-white rounded-xl font-bold shadow hover:bg-earth-800"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
