import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import { connectDB } from './config/db';
import apiRoutes from './routes/apiRoutes';

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (ENV.NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString().slice(11, 19)}] ${req.method} ${req.url}`);
  }
  next();
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    brand: 'PREMAHANDCRAFT',
    businessName: 'Prema Handcraft',
    tagline: 'Handcrafted With Love, Made For You',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[SERVER ERROR]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler for unknown routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Server Initialization
const startServer = async () => {
  await connectDB();

  app.listen(ENV.PORT, () => {
    console.log('====================================================');
    console.log(`✨ PREMAHANDCRAFT Backend API Server Running!`);
    console.log(`📡 URL: http://localhost:${ENV.PORT}`);
    console.log(`🛡️  Admin Account: ${ENV.ADMIN_EMAIL}`);
    console.log(`📱 WhatsApp Commerce: +91 93612 44779`);
    console.log('====================================================');
  });
};

startServer().catch(err => {
  console.error('Failed to start server:', err);
});

export default app;
