export interface Product {
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
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  knotType?: string;
  color?: string;
  size?: string;
}

export interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  phone: string;
  whatsappNumber: string;
  email?: string;
  items: OrderItem[];
  subtotal: number;
  shippingCharge: number;
  totalAmount: number;
  address: string;
  city: string;
  district?: string;
  state: string;
  pincode: string;
  specialInstructions?: string;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  city: string;
}

export interface CustomOrderRequest {
  customerName: string;
  phone: string;
  basketType: string;
  knotStyle: string;
  primaryColor: string;
  secondaryColor: string;
  size: string;
  handleType: string;
  quantity: number;
  specialRequirements: string;
}
