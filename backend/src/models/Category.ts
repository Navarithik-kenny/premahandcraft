import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from './types';

export interface ICategoryDoc extends Omit<ICategory, '_id'>, Document {}

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    itemCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.models.Category || mongoose.model<ICategoryDoc>('Category', CategorySchema);
