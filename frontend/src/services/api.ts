import { Product, Category, Order, OrderStatus } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

const getHeaders = (isAuth = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (isAuth) {
    const token = localStorage.getItem('prema_admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const api = {
  // Products
  async getProducts(params?: {
    category?: string;
    search?: string;
    featured?: boolean;
    popular?: boolean;
    knotType?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== 'All') query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.featured) query.append('featured', 'true');
    if (params?.popular) query.append('popular', 'true');
    if (params?.knotType) query.append('knotType', params.knotType);
    if (params?.minPrice !== undefined) query.append('minPrice', String(params.minPrice));
    if (params?.maxPrice !== undefined) query.append('maxPrice', String(params.maxPrice));
    if (params?.sort) query.append('sort', params.sort);

    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.data;
  },

  async getProductBySlug(slug: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/slug/${slug}`);
    if (!res.ok) throw new Error('Product not found');
    const data = await res.json();
    return data.data;
  },

  async getProductById(id: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    const data = await res.json();
    return data.data;
  },

  async createProduct(product: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(product)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to create product');
    }
    const data = await res.json();
    return data.data;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to update product');
    }
    const data = await res.json();
    return data.data;
  },

  async deleteProduct(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to delete product');
    }
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return data.data;
  },

  async createCategory(cat: Partial<Category>): Promise<Category> {
    const res = await fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(cat)
    });
    if (!res.ok) throw new Error('Failed to create category');
    const data = await res.json();
    return data.data;
  },

  async updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update category');
    const data = await res.json();
    return data.data;
  },

  async deleteCategory(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    if (!res.ok) throw new Error('Failed to delete category');
  },

  // Orders
  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to place order');
    }
    const data = await res.json();
    return data.data;
  },

  async getOrders(): Promise<Order[]> {
    const res = await fetch(`${API_BASE}/orders`, {
      headers: getHeaders(true)
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    const data = await res.json();
    return data.data;
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update order status');
    const data = await res.json();
    return data.data;
  },

  // Contact
  async submitContact(data: { name: string; phone: string; email?: string; subject?: string; message: string }): Promise<void> {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to send message');
    }
  },

  // Stats
  async getDashboardStats() {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: getHeaders(true)
    });
    if (!res.ok) throw new Error('Failed to fetch stats');
    const data = await res.json();
    return data.data;
  },

  // Admin Auth
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Invalid credentials');
    }
    return await res.json();
  },

  async getProfile() {
    const res = await fetch(`${API_BASE}/admin/profile`, {
      headers: getHeaders(true)
    });
    if (!res.ok) throw new Error('Unauthorized');
    return await res.json();
  }
};
