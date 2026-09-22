import { Request, Response } from 'express';
import { DataService } from '../services/dataService';
import { OrderStatus } from '../models/types';

export const orderController = {
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await DataService.getOrders();
      res.json({ success: true, count: orders.length, data: orders });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch orders', error: err.message });
    }
  },

  async getOrderById(req: Request, res: Response) {
    try {
      const order = await DataService.getOrderById(req.params.id);
      if (!order) {
        res.status(404).json({ success: false, message: 'Order not found' });
        return;
      }
      res.json({ success: true, data: order });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch order', error: err.message });
    }
  },

  async createOrder(req: Request, res: Response) {
    try {
      const { customerName, phone, items, address, pincode } = req.body;
      if (!customerName || !phone || !items || !Array.isArray(items) || items.length === 0 || !address || !pincode) {
        res.status(400).json({
          success: false,
          message: 'Missing required customer details (name, phone, items, address, pincode)'
        });
        return;
      }

      const order = await DataService.createOrder(req.body);
      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: order
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to create order', error: err.message });
    }
  },

  async updateOrderStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const validStatuses: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
      if (!status || !validStatuses.includes(status)) {
        res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
        return;
      }

      const updated = await DataService.updateOrderStatus(req.params.id, status);
      if (!updated) {
        res.status(404).json({ success: false, message: 'Order not found' });
        return;
      }

      res.json({ success: true, message: `Order status updated to ${status}`, data: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to update order status', error: err.message });
    }
  }
};
