import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from './types';

export interface IOrderDoc extends Omit<IOrder, '_id'>, Document {}

const OrderItemSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String, default: '' },
  knotType: { type: String, default: '' },
  color: { type: String, default: '' },
  size: { type: String, default: '' }
});

const OrderSchema: Schema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    shippingCharge: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, default: '' },
    state: { type: String, default: 'Tamil Nadu' },
    pincode: { type: String, required: true },
    specialInstructions: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    paymentMethod: { type: String, default: 'WhatsApp Confirmation' }
  },
  { timestamps: true }
);

export const OrderModel = mongoose.models.Order || mongoose.model<IOrderDoc>('Order', OrderSchema);
