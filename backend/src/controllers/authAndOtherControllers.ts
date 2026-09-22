import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { DataService } from '../services/dataService';
import { generateToken, AuthRequest } from '../middleware/authMiddleware';
import { ENV } from '../config/env';

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required' });
        return;
      }

      // Check admin
      const admin = await DataService.findAdminByEmail(email);
      if (!admin) {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
        return;
      }

      const isMatch = bcrypt.compareSync(password, admin.passwordHash);
      if (!isMatch) {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
        return;
      }

      const token = generateToken({
        id: admin._id,
        email: admin.email,
        role: admin.role
      });

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          admin: {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role
          }
        }
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Login failed', error: err.message });
    }
  },

  async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.admin) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }
      const admin = await DataService.findAdminByEmail(req.admin.email);
      if (!admin) {
        res.status(404).json({ success: false, message: 'Admin profile not found' });
        return;
      }

      res.json({
        success: true,
        data: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch profile', error: err.message });
    }
  }
};

export const contactController = {
  async submitContact(req: Request, res: Response) {
    try {
      const { name, phone, message } = req.body;
      if (!name || !phone || !message) {
        res.status(400).json({ success: false, message: 'Name, phone, and message are required' });
        return;
      }
      const contact = await DataService.saveContact(req.body);
      res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully. We will contact you shortly!',
        data: contact
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to send message', error: err.message });
    }
  },

  async getInquiries(req: Request, res: Response) {
    try {
      const contacts = await DataService.getContacts();
      res.json({ success: true, count: contacts.length, data: contacts });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch inquiries', error: err.message });
    }
  }
};

export const statsController = {
  async getDashboardStats(req: Request, res: Response) {
    try {
      const stats = await DataService.getStats();
      res.json({ success: true, data: stats });
    } catch (err: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats', error: err.message });
    }
  }
};
