import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/premahandcraft',
  JWT_SECRET: process.env.JWT_SECRET || 'prema_handcraft_default_jwt_secret_key_2026',
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@premahandcraft.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'Admin@Prema2026'
};
