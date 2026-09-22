import mongoose from 'mongoose';
import { ENV } from './env';
import { setMongoConnected } from '../services/dataService';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, getInitialAdmin } from '../utils/seedData';
import { ProductModel } from '../models/Product';
import { CategoryModel } from '../models/Category';
import { AdminModel } from '../models/AdminAndContact';

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    console.log(`[DB] Attempting connection to MongoDB at: ${ENV.MONGODB_URI}`);

    // Set a 3-second connection timeout
    await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000
    });

    setMongoConnected(true);
    console.log('[DB] ✅ Connected to MongoDB successfully.');

    // Auto-seed if database is empty
    const productCount = await ProductModel.countDocuments();
    if (productCount === 0) {
      console.log('[DB] Seeding initial products & categories to MongoDB...');
      await ProductModel.insertMany(INITIAL_PRODUCTS.map(p => ({ ...p, _id: new mongoose.Types.ObjectId() })));
      await CategoryModel.insertMany(INITIAL_CATEGORIES.map(c => ({ ...c, _id: new mongoose.Types.ObjectId() })));
      const adminCount = await AdminModel.countDocuments();
      if (adminCount === 0) {
        const adminData = getInitialAdmin(ENV.ADMIN_EMAIL, ENV.ADMIN_PASSWORD);
        await AdminModel.create({ ...adminData, _id: new mongoose.Types.ObjectId() });
      }
      console.log('[DB] ✅ MongoDB seed complete.');
    }
  } catch (error: any) {
    setMongoConnected(false);
    console.warn(`[DB] ⚠️ MongoDB not available (${error.message}). Running with persistent file/memory JSON store fallback.`);
  }
};
