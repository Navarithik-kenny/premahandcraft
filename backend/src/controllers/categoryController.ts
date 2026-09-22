import { Request, Response } from 'express';
import { DataService } from '../services/dataService';

export const categoryController = {
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await DataService.getCategories();
      res.json({ success: true, count: categories.length, data: categories });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch categories', error: err.message });
    }
  },

  async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ success: false, message: 'Category name is required' });
        return;
      }
      const category = await DataService.createCategory(req.body);
      res.status(201).json({ success: true, message: 'Category created successfully', data: category });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to create category', error: err.message });
    }
  },

  async updateCategory(req: Request, res: Response) {
    try {
      const updated = await DataService.updateCategory(req.params.id, req.body);
      if (!updated) {
        res.status(404).json({ success: false, message: 'Category not found' });
        return;
      }
      res.json({ success: true, message: 'Category updated successfully', data: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to update category', error: err.message });
    }
  },

  async deleteCategory(req: Request, res: Response) {
    try {
      const deleted = await DataService.deleteCategory(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, message: 'Category not found' });
        return;
      }
      res.json({ success: true, message: 'Category deleted successfully' });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to delete category', error: err.message });
    }
  }
};
