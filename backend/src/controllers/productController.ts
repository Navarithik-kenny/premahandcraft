import { Request, Response } from 'express';
import { DataService } from '../services/dataService';

export const productController = {
  async getAllProducts(req: Request, res: Response) {
    try {
      const { category, search, featured, popular, knotType, minPrice, maxPrice, sort } = req.query;
      const products = await DataService.getProducts({
        category: category ? String(category) : undefined,
        search: search ? String(search) : undefined,
        featured: featured === 'true',
        popular: popular === 'true',
        knotType: knotType ? String(knotType) : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sort: sort ? String(sort) : undefined
      });
      res.json({ success: true, count: products.length, data: products });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch products', error: err.message });
    }
  },

  async getProductById(req: Request, res: Response) {
    try {
      const product = await DataService.getProductById(req.params.id);
      if (!product) {
        res.status(404).json({ success: false, message: 'Product not found' });
        return;
      }
      res.json({ success: true, data: product });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch product', error: err.message });
    }
  },

  async getProductBySlug(req: Request, res: Response) {
    try {
      const product = await DataService.getProductBySlug(req.params.slug);
      if (!product) {
        res.status(404).json({ success: false, message: 'Product not found' });
        return;
      }
      res.json({ success: true, data: product });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch product', error: err.message });
    }
  },

  async createProduct(req: Request, res: Response) {
    try {
      const { name, price, category } = req.body;
      if (!name || price === undefined || !category) {
        res.status(400).json({ success: false, message: 'Name, price, and category are required' });
        return;
      }
      const product = await DataService.createProduct(req.body);
      res.status(201).json({ success: true, message: 'Product created successfully', data: product });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to create product', error: err.message });
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const product = await DataService.updateProduct(req.params.id, req.body);
      if (!product) {
        res.status(404).json({ success: false, message: 'Product not found' });
        return;
      }
      res.json({ success: true, message: 'Product updated successfully', data: product });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to update product', error: err.message });
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const deleted = await DataService.deleteProduct(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Product not found' });
        return;
      }
      res.json({ success: true, message: 'Product deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to delete product', error: err.message });
    }
  }
};
