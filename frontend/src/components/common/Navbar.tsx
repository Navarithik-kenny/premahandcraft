import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Shield, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { WHATSAPP_DISPLAY, createWhatsAppUrl } from '../../utils/whatsapp';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
  onSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onSearch }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Categories', page: 'categories' },
    { label: 'Custom Orders', page: 'custom-orders' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
      onNavigate('shop');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-cream-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Branding */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-earth-800 text-gold-400 flex items-center justify-center shadow-soft group-hover:bg-earth-900 group-hover:scale-105 transition-all">
              <span className="font-serif font-bold text-2xl tracking-tighter">P</span>
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-extrabold tracking-wider text-earth-900 group-hover:text-earth-700 transition-colors">
                PREMAHANDCRAFT
              </span>
              <span className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-earth-600">
                Handmade Wire Kudai & Bags
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`text-sm font-semibold tracking-wide transition-all relative py-1 ${
                  currentPage === link.page
                    ? 'text-earth-900 font-bold'
                    : 'text-earth-600 hover:text-earth-950'
                }`}
              >
                {link.label}
                {currentPage === link.page && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search products"
              className="p-2 text-earth-700 hover:text-earth-950 hover:bg-cream-200 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Direct WhatsApp Action */}
            <a
              href={createWhatsAppUrl("Hello Prema Handcraft, I would like to enquire about your handmade wire kudai products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-whatsapp-light hover:bg-whatsapp-dark text-white text-xs font-bold tracking-wide shadow-sm hover:shadow transition-all"
              title={`Direct WhatsApp to ${WHATSAPP_DISPLAY}`}
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping cart"
              className="relative p-2.5 bg-earth-100 hover:bg-earth-200 text-earth-900 rounded-full transition-all group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-600 text-white text-xs font-bold flex items-center justify-center animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Quick Icon */}
            <button
              onClick={() => handleNavClick('admin')}
              title="Admin Portal"
              className={`p-2 rounded-full transition-colors ${
                currentPage.startsWith('admin')
                  ? 'bg-earth-900 text-gold-400'
                  : 'text-earth-500 hover:text-earth-800 hover:bg-cream-200'
              }`}
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-earth-800 hover:bg-cream-200 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Input Bar */}
        {searchOpen && (
          <div className="py-3 border-t border-cream-200 animate-in fade-in slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search wire kudai, lunch bags, pooja baskets, knot type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-white border border-cream-300 rounded-full py-2.5 pl-11 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-inner"
              />
              <Search className="w-4 h-4 text-earth-400 absolute left-4" />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 bg-earth-800 text-white rounded-full text-xs font-semibold hover:bg-earth-900 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cream-200 bg-cream-50 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNavClick(link.page)}
              className={`w-full text-left py-2.5 px-4 rounded-xl text-base font-semibold ${
                currentPage === link.page
                  ? 'bg-earth-900 text-white'
                  : 'text-earth-800 hover:bg-cream-200'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-4 border-t border-cream-200 flex flex-col gap-2">
            <a
              href={createWhatsAppUrl("Hello Prema Handcraft, I would like to order on WhatsApp.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-whatsapp-light text-white font-bold text-sm shadow"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat & Order on WhatsApp</span>
            </a>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-earth-300 text-earth-700 font-semibold text-xs hover:bg-earth-100"
            >
              <Shield className="w-4 h-4" />
              <span>PREMAHANDCRAFT Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
