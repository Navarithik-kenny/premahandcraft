import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './types';

export interface IProductDoc extends Omit<IProduct, '_id'>, Document {}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: 0 },
    category: { type: String, required: true },
    images: [{ type: String, required: true }],
    material: { type: String, default: 'High Grade Heavy-Duty Polyethylene Craft Wire' },
    size: { type: String, default: 'Medium' },
    color: { type: String, default: 'Multi-color' },
    weight: { type: String, default: '450g' },
    knotType: { type: String, default: 'Normal Box Knot' },
    stock: { type: Number, default: 10, min: 0 },
    featured: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 12 },
    dimensions: {
      length: { type: String, default: '12 inches' },
      width: { type: String, default: '6 inches' },
      height: { type: String, default: '10 inches' }
    }
  },
  { timestamps: true }
);

export const ProductModel = mongoose.models.Product || mongoose.model<IProductDoc>('Product', ProductSchema);
