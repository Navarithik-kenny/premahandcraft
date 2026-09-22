export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  material: string;
  size: string;
  color: string;
  weight: string;
  knotType: string;
  stock: number;
  featured: boolean;
  popular: boolean;
  rating: number;
  reviewsCount: number;
  dimensions?: {
    length: string;
    width: string;
    height: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  knotType?: string;
  color?: string;
  size?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface IOrder {
  _id: string;
  orderId: string;
  customerName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  items: IOrderItem[];
  subtotal: number;
  shippingCharge: number;
  totalAmount: number;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  specialInstructions?: string;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAdmin {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin';
  createdAt: string;
}

export interface IContact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'Read' | 'Replied';
  createdAt: string;
}
