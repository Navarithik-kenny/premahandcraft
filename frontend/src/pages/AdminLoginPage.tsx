import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onBackToHome }) => {
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('admin@premahandcraft.com');
  const [password, setPassword] = useState('Admin@Prema2026');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      showToast('Welcome back, Admin!', 'success');
      onLoginSuccess();
    } catch (err: any) {
      showToast(err.message || 'Invalid admin credentials', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@premahandcraft.com');
    setPassword('Admin@Prema2026');
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-cream-200 shadow-premium space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-earth-900 text-gold-400 mx-auto flex items-center justify-center shadow">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl font-extrabold text-earth-950">
            PREMAHANDCRAFT
          </h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-earth-500">
            Secure Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-earth-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-earth-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Quick Credential Hint */}
          <div className="p-3 bg-gold-50 rounded-xl border border-gold-200 text-xs text-earth-800 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[11px] uppercase tracking-wider text-gold-800">Demo Admin Access</span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[11px] text-earth-900 font-bold underline hover:text-earth-700"
              >
                Auto-Fill
              </button>
            </div>
            <p className="text-[11px] text-earth-600 font-mono">admin@premahandcraft.com / Admin@Prema2026</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-earth-900 hover:bg-earth-800 text-white rounded-xl font-bold text-xs tracking-wider uppercase shadow-premium hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <button
            onClick={onBackToHome}
            className="text-xs font-semibold text-earth-500 hover:text-earth-900 transition-colors"
          >
            ← Back to Storefront
          </button>
        </div>

      </div>
    </div>
  );
};
