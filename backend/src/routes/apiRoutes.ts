import { Router } from 'express';
import { productController } from '../controllers/productController';
import { categoryController } from '../controllers/categoryController';
import { orderController } from '../controllers/orderController';
import { authController, contactController, statsController } from '../controllers/authAndOtherControllers';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// --- Product Routes ---
router.get('/products', productController.getAllProducts);
router.get('/products/slug/:slug', productController.getProductBySlug);
router.get('/products/:id', productController.getProductById);
router.post('/products', authMiddleware, productController.createProduct);
router.put('/products/:id', authMiddleware, productController.updateProduct);
router.delete('/products/:id', authMiddleware, productController.deleteProduct);

// --- Category Routes ---
router.get('/categories', categoryController.getAllCategories);
router.post('/categories', authMiddleware, categoryController.createCategory);
router.put('/categories/:id', authMiddleware, categoryController.updateCategory);
router.delete('/categories/:id', authMiddleware, categoryController.deleteCategory);

// --- Order Routes ---
router.post('/orders', orderController.createOrder); // Public checkout
router.get('/orders', authMiddleware, orderController.getAllOrders); // Admin protected
router.get('/orders/:id', orderController.getOrderById);
router.put('/orders/:id', authMiddleware, orderController.updateOrderStatus);

// --- Auth Routes ---
router.post('/admin/login', authController.login);
router.get('/admin/profile', authMiddleware, authController.getProfile);

// --- Contact Routes ---
router.post('/contact', contactController.submitContact);
router.get('/contact', authMiddleware, contactController.getInquiries);

// --- Dashboard Stats Routes ---
router.get('/stats', authMiddleware, statsController.getDashboardStats);

export default router;
