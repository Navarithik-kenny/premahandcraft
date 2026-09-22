import mongoose, { Schema, Document } from 'mongoose';
import { IAdmin, IContact } from './types';

export interface IAdminDoc extends Omit<IAdmin, '_id'>, Document {}
export interface IContactDoc extends Omit<IContact, '_id'>, Document {}

const AdminSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: 'admin' }
  },
  { timestamps: true }
);

const ContactSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    phone: { type: String, required: true, trim: true },
    subject: { type: String, default: 'General Inquiry' },
    message: { type: String, required: true },
    status: { type: String, enum: ['New', 'Read', 'Replied'], default: 'New' }
  },
  { timestamps: true }
);

export const AdminModel = mongoose.models.Admin || mongoose.model<IAdminDoc>('Admin', AdminSchema);
export const ContactModel = mongoose.models.Contact || mongoose.model<IContactDoc>('Contact', ContactSchema);
