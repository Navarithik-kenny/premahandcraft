import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { IProduct, ICategory, IOrder, IAdmin, IContact, OrderStatus } from '../models/types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, getInitialAdmin } from '../utils/seedData';
import { ENV } from '../config/env';
import { ProductModel } from '../models/Product';
import { CategoryModel } from '../models/Category';
import { OrderModel } from '../models/Order';
import { AdminModel, ContactModel } from '../models/AdminAndContact';

export let isMongoConnected = false;

export const setMongoConnected = (connected: boolean) => {
  isMongoConnected = connected;
};

// Local JSON Store setup
const DATA_DIR = path.resolve(__dirname, '../../data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

interface IStoreSchema {
  products: IProduct[];
  categories: ICategory[];
  orders: IOrder[];
  admins: IAdmin[];
  contacts: IContact[];
}

const loadStore = (): IStoreSchema => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_PATH)) {
      const data = fs.readFileSync(STORE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading store.json, re-initializing...', err);
  }

  const initialStore: IStoreSchema = {
    products: [...INITIAL_PRODUCTS],
    categories: [...INITIAL_CATEGORIES],
    orders: [
      {
        _id: 'ord_sample_1',
        orderId: 'PHC-2026-1001',
        customerName: 'Ananya Sundaram',
        phone: '+91 98401 23456',
        whatsappNumber: '+91 98401 23456',
        email: 'ananya.sundaram@example.com',
        items: [
          {
            productId: 'prod_1',
            name: 'Traditional South Indian Wire Pooja Kudai',
            price: 420,
            quantity: 1,
            image: '/images/pooja-kudai.jpg',
            knotType: 'Normal Box Knot',
            color: 'Red, Yellow & Gold',
            size: 'Medium'
          },
          {
            productId: 'prod_2',
            name: 'Pastel Biscuit Knot Wire Lunch Kudai',
            price: 549,
            quantity: 1,
            image: '/images/lunch-kudai.jpg',
            knotType: 'Biscuit Knot',
            color: 'Peach & Ivory',
            size: 'Compact Medium'
          }
        ],
        subtotal: 969,
        shippingCharge: 0,
        totalAmount: 969,
        address: 'Flat 4B, Shanti Enclave, Gandhi Road',
        city: 'Coimbatore',
        district: 'Coimbatore',
        state: 'Tamil Nadu',
        pincode: '641001',
        specialInstructions: 'Please pack safely with bubble wrap for festive pooja gift.',
        status: 'Delivered',
        paymentMethod: 'WhatsApp Confirmation',
        createdAt: new Date('2026-02-18').toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'ord_sample_2',
        orderId: 'PHC-2026-1002',
        customerName: 'Karthik Raja',
        phone: '+91 97890 54321',
        whatsappNumber: '+91 97890 54321',
        email: 'karthik.raja@example.com',
        items: [
          {
            productId: 'prod_3',
            name: 'Heavy-Duty Geometric Market Wire Shopping Basket',
            price: 720,
            quantity: 2,
            image: '/images/market-kudai.jpg',
            knotType: 'Double Box Knot',
            color: 'Turquoise, Emerald & Golden Yellow',
            size: 'Large'
          }
        ],
        subtotal: 1440,
        shippingCharge: 0,
        totalAmount: 1440,
        address: 'No. 12, 3rd Cross, Anna Nagar',
        city: 'Madurai',
        district: 'Madurai',
        state: 'Tamil Nadu',
        pincode: '625020',
        specialInstructions: 'Need for daily vegetable shopping.',
        status: 'Processing',
        paymentMethod: 'WhatsApp Confirmation',
        createdAt: new Date('2026-03-01').toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    admins: [getInitialAdmin(ENV.ADMIN_EMAIL, ENV.ADMIN_PASSWORD)],
    contacts: []
  };

  saveStore(initialStore);
  return initialStore;
};

const saveStore = (store: IStoreSchema) => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing store.json:', err);
  }
};

export const DataService = {
  // PRODUCTS
  async getProducts(filter?: {
    category?: string;
    search?: string;
    featured?: boolean;
    popular?: boolean;
    knotType?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  }): Promise<IProduct[]> {
    if (isMongoConnected) {
      try {
        const query: any = {};
        if (filter?.category && filter.category !== 'All') {
          query.category = filter.category;
        }
        if (filter?.featured) query.featured = true;
        if (filter?.popular) query.popular = true;
        if (filter?.knotType) query.knotType = filter.knotType;
        if (filter?.minPrice !== undefined || filter?.maxPrice !== undefined) {
          query.price = {};
          if (filter?.minPrice !== undefined) query.price.$gte = filter.minPrice;
          if (filter?.maxPrice !== undefined) query.price.$lte = filter.maxPrice;
        }
        if (filter?.search) {
          query.$or = [
            { name: { $regex: filter.search, $options: 'i' } },
            { description: { $regex: filter.search, $options: 'i' } },
            { category: { $regex: filter.search, $options: 'i' } }
          ];
        }

        let sortOption: any = { createdAt: -1 };
        if (filter?.sort === 'price-low') sortOption = { price: 1 };
        else if (filter?.sort === 'price-high') sortOption = { price: -1 };
        else if (filter?.sort === 'popular') sortOption = { popular: -1, rating: -1 };
        else if (filter?.sort === 'rating') sortOption = { rating: -1 };

        const items = await ProductModel.find(query).sort(sortOption).lean();
        return items.map((doc: any) => ({ ...doc, _id: doc._id.toString() }));
      } catch (err) {
        console.warn('MongoDB query failed, falling back to local store:', err);
      }
    }

    // Local store fallback
    const store = loadStore();
    let result = [...store.products];

    if (filter?.category && filter.category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === filter.category!.toLowerCase());
    }
    if (filter?.featured) {
      result = result.filter(p => p.featured);
    }
    if (filter?.popular) {
      result = result.filter(p => p.popular);
    }
    if (filter?.knotType) {
      result = result.filter(p => p.knotType.toLowerCase().includes(filter.knotType!.toLowerCase()));
    }
    if (filter?.minPrice !== undefined) {
      result = result.filter(p => (p.discountPrice || p.price) >= filter.minPrice!);
    }
    if (filter?.maxPrice !== undefined) {
      result = result.filter(p => (p.discountPrice || p.price) <= filter.maxPrice!);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.knotType.toLowerCase().includes(q)
      );
    }

    if (filter?.sort === 'price-low') {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (filter?.sort === 'price-high') {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (filter?.sort === 'popular') {
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating);
    } else if (filter?.sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Newest
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  },

  async getProductById(id: string): Promise<IProduct | null> {
    if (isMongoConnected) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const item = await ProductModel.findById(id).lean();
          if (item) return { ...item, _id: (item as any)._id.toString() } as unknown as IProduct;
        }
      } catch (err) {}
    }
    const store = loadStore();
    return store.products.find(p => p._id === id) || null;
  },

  async getProductBySlug(slug: string): Promise<IProduct | null> {
    if (isMongoConnected) {
      try {
        const item = await ProductModel.findOne({ slug }).lean();
        if (item) return { ...item, _id: (item as any)._id.toString() } as unknown as IProduct;
      } catch (err) {}
    }
    const store = loadStore();
    return store.products.find(p => p.slug === slug) || null;
  },

  async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    const slug = productData.slug || (productData.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct: IProduct = {
      _id: 'prod_' + Date.now(),
      name: productData.name || 'Handmade Wire Kudai',
      slug,
      description: productData.description || 'Premium handcrafted wire kudai woven with love.',
      price: Number(productData.price) || 499,
      discountPrice: productData.discountPrice ? Number(productData.discountPrice) : undefined,
      category: productData.category || 'Pooja Baskets',
      images: productData.images && productData.images.length > 0 ? productData.images : ['/images/pooja-kudai.jpg'],
      material: productData.material || 'Heavy-Duty Virgin Plastic Wire',
      size: productData.size || 'Medium',
      color: productData.color || 'Multi-color',
      weight: productData.weight || '400g',
      knotType: productData.knotType || 'Normal Box Knot',
      stock: productData.stock !== undefined ? Number(productData.stock) : 10,
      featured: Boolean(productData.featured),
      popular: Boolean(productData.popular),
      rating: productData.rating || 5.0,
      reviewsCount: productData.reviewsCount || 1,
      dimensions: productData.dimensions || { length: '10 inches', width: '7 inches', height: '8 inches' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isMongoConnected) {
      try {
        const doc = await ProductModel.create(newProduct);
        return { ...doc.toObject(), _id: doc._id.toString() };
      } catch (err) {
        console.warn('Mongo createProduct failed, saving to local store:', err);
      }
    }

    const store = loadStore();
    store.products.unshift(newProduct);
    saveStore(store);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<IProduct>): Promise<IProduct | null> {
    if (isMongoConnected) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const doc = await ProductModel.findByIdAndUpdate(id, { ...updates, updatedAt: new Date().toISOString() }, { new: true }).lean();
          if (doc) return { ...doc, _id: (doc as any)._id.toString() } as unknown as IProduct;
        }
      } catch (err) {}
    }

    const store = loadStore();
    const index = store.products.findIndex(p => p._id === id);
    if (index === -1) return null;

    const updated = {
      ...store.products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    store.products[index] = updated;
    saveStore(store);
    return updated;
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (isMongoConnected) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const res = await ProductModel.findByIdAndDelete(id);
          if (res) return true;
        }
      } catch (err) {}
    }

    const store = loadStore();
    const lenBefore = store.products.length;
    store.products = store.products.filter(p => p._id !== id);
    if (store.products.length !== lenBefore) {
      saveStore(store);
      return true;
    }
    return false;
  },

  // CATEGORIES
  async getCategories(): Promise<ICategory[]> {
    if (isMongoConnected) {
      try {
        const items = await CategoryModel.find().lean();
        if (items.length > 0) {
          return items.map((c: any) => ({ ...c, _id: c._id.toString() }));
        }
      } catch (err) {}
    }
    const store = loadStore();
    return store.categories;
  },

  async createCategory(data: Partial<ICategory>): Promise<ICategory> {
    const slug = data.slug || (data.name || 'category').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat: ICategory = {
      _id: 'cat_' + Date.now(),
      name: data.name || 'New Category',
      slug,
      description: data.description || '',
      image: data.image || '/images/hero.jpg',
      itemCount: 0
    };

    if (isMongoConnected) {
      try {
        const doc = await CategoryModel.create(newCat);
        return { ...doc.toObject(), _id: doc._id.toString() };
      } catch (err) {}
    }

    const store = loadStore();
    store.categories.push(newCat);
    saveStore(store);
    return newCat;
  },

  async updateCategory(id: string, updates: Partial<ICategory>): Promise<ICategory | null> {
    if (isMongoConnected) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const doc = await CategoryModel.findByIdAndUpdate(id, updates, { new: true }).lean();
          if (doc) return { ...doc, _id: (doc as any)._id.toString() } as unknown as ICategory;
        }
      } catch (err) {}
    }

    const store = loadStore();
    const idx = store.categories.findIndex(c => c._id === id);
    if (idx === -1) return null;
    store.categories[idx] = { ...store.categories[idx], ...updates };
    saveStore(store);
    return store.categories[idx];
  },

  async deleteCategory(id: string): Promise<boolean> {
    if (isMongoConnected) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const res = await CategoryModel.findByIdAndDelete(id);
          if (res) return true;
        }
      } catch (err) {}
    }

    const store = loadStore();
    const lenBefore = store.categories.length;
    store.categories = store.categories.filter(c => c._id !== id);
    if (store.categories.length !== lenBefore) {
      saveStore(store);
      return true;
    }
    return false;
  },

  // ORDERS
  async getOrders(): Promise<IOrder[]> {
    if (isMongoConnected) {
      try {
        const items = await OrderModel.find().sort({ createdAt: -1 }).lean();
        return items.map((o: any) => ({ ...o, _id: o._id.toString() }));
      } catch (err) {}
    }
    const store = loadStore();
    return store.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getOrderById(id: string): Promise<IOrder | null> {
    if (isMongoConnected) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const item = await OrderModel.findById(id).lean();
          if (item) return { ...item, _id: (item as any)._id.toString() } as unknown as IOrder;
        }
      } catch (err) {}
    }
    const store = loadStore();
    return store.orders.find(o => o._id === id || o.orderId === id) || null;
  },

  async createOrder(data: Partial<IOrder>): Promise<IOrder> {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: IOrder = {
      _id: 'ord_' + Date.now(),
      orderId: `PHC-2026-${orderNum}`,
      customerName: data.customerName || 'Customer',
      phone: data.phone || '',
      whatsappNumber: data.whatsappNumber || data.phone || '',
      email: data.email || '',
      items: data.items || [],
      subtotal: data.subtotal || 0,
      shippingCharge: data.shippingCharge || 0,
      totalAmount: data.totalAmount || 0,
      address: data.address || '',
      city: data.city || '',
      district: data.district || '',
      state: data.state || 'Tamil Nadu',
      pincode: data.pincode || '',
      specialInstructions: data.specialInstructions || '',
      status: (data.status as OrderStatus) || 'Pending',
      paymentMethod: data.paymentMethod || 'WhatsApp Confirmation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isMongoConnected) {
      try {
        const doc = await OrderModel.create(newOrder);
        return { ...doc.toObject(), _id: doc._id.toString() };
      } catch (err) {}
    }

    const store = loadStore();
    store.orders.unshift(newOrder);
    saveStore(store);
    return newOrder;
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<IOrder | null> {
    if (isMongoConnected) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const doc = await OrderModel.findByIdAndUpdate(id, { status, updatedAt: new Date().toISOString() }, { new: true }).lean();
          if (doc) return { ...doc, _id: (doc as any)._id.toString() } as unknown as IOrder;
        }
      } catch (err) {}
    }

    const store = loadStore();
    const idx = store.orders.findIndex(o => o._id === id || o.orderId === id);
    if (idx === -1) return null;
    store.orders[idx].status = status;
    store.orders[idx].updatedAt = new Date().toISOString();
    saveStore(store);
    return store.orders[idx];
  },

  // CONTACTS
  async saveContact(data: Partial<IContact>): Promise<IContact> {
    const contact: IContact = {
      _id: 'cnt_' + Date.now(),
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      subject: data.subject || 'General Inquiry',
      message: data.message || '',
      status: 'New',
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected) {
      try {
        const doc = await ContactModel.create(contact);
        return { ...doc.toObject(), _id: doc._id.toString() };
      } catch (err) {}
    }

    const store = loadStore();
    store.contacts.unshift(contact);
    saveStore(store);
    return contact;
  },

  async getContacts(): Promise<IContact[]> {
    if (isMongoConnected) {
      try {
        const items = await ContactModel.find().sort({ createdAt: -1 }).lean();
        return items.map((c: any) => ({ ...c, _id: c._id.toString() }));
      } catch (err) {}
    }
    const store = loadStore();
    return store.contacts;
  },

  // ADMIN AUTH
  async findAdminByEmail(email: string): Promise<IAdmin | null> {
    if (isMongoConnected) {
      try {
        const item = await AdminModel.findOne({ email: email.toLowerCase() }).lean();
        if (item) return { ...item, _id: (item as any)._id.toString() } as unknown as IAdmin;
      } catch (err) {}
    }
    const store = loadStore();
    return store.admins.find(a => a.email.toLowerCase() === email.toLowerCase()) || null;
  },

  // STATS
  async getStats() {
    const products = await this.getProducts();
    const orders = await this.getOrders();
    const contacts = await this.getContacts();

    const totalProducts = products.length;
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const completedOrders = orders.filter(o => o.status === 'Delivered').length;
    const processingOrders = orders.filter(o => o.status === 'Processing' || o.status === 'Confirmed' || o.status === 'Shipped').length;
    const totalSales = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const lowStockProducts = products.filter(p => p.stock <= 5);

    return {
      totalProducts,
      totalOrders,
      pendingOrders,
      completedOrders,
      processingOrders,
      totalSales,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
      newInquiries: contacts.filter(c => c.status === 'New').length
    };
  }
};
