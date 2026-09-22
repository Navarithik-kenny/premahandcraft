import React from 'react';
import { MessageCircle, Phone, MapPin, Heart, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { WHATSAPP_DISPLAY, createWhatsAppUrl } from '../../utils/whatsapp';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-earth-950 text-cream-100 pt-16 pb-8 border-t-4 border-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-earth-800">
          
          {/* Column 1: Brand & Taglines */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500 text-earth-950 flex items-center justify-center font-serif font-bold text-2xl">
                P
              </div>
              <span className="font-serif text-2xl font-extrabold tracking-wider text-white">
                PREMAHANDCRAFT
              </span>
            </div>
            
            <p className="text-sm text-cream-300 italic font-serif">
              "Handcrafted With Love, Made For You."
            </p>
            <p className="text-xs text-cream-400 font-serif">
              "Tradition Woven Into Every Creation."
            </p>
            <p className="text-xs text-cream-400 leading-relaxed">
              Authentic South Indian handmade wire kudai baskets, lunch bags, pooja baskets, and bespoke handcrafted accessories built to last a lifetime.
            </p>

            <div className="pt-2">
              <a
                href={createWhatsAppUrl("Hello Prema Handcraft, I would like to connect with you.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-whatsapp-light hover:bg-whatsapp-dark text-white text-xs font-bold transition-colors shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-gold-400 uppercase tracking-wider">
              Explore Collections
            </h3>
            <ul className="space-y-2 text-xs text-cream-300">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  All Wire Kudai & Bags
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  Pooja Kudai & Baskets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  Biscuit Knot Lunch Bags
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  Heavy-Duty Market Totes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  Mini Gift & Hamper Kudai
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('custom-orders')} className="text-gold-400 hover:text-gold-300 font-semibold transition-colors">
                  Custom Kudai Designer →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Kudai Care & Craft Features */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-gold-400 uppercase tracking-wider">
              Why Wire Kudai?
            </h3>
            <ul className="space-y-2.5 text-xs text-cream-300">
              <li className="flex items-start gap-2">
                <RefreshCw className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span><strong>100% Washable:</strong> Simply wash with mild soap and water; dries instantly.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span><strong>Heavy-Duty Strength:</strong> Carries 10-15+ kg with zero tearing or stretching.</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span><strong>Eco-Friendly Alternative:</strong> Reusable for 10+ years instead of disposable plastic.</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Order Assistance */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-gold-400 uppercase tracking-wider">
              Direct Contact
            </h3>
            <div className="space-y-2 text-xs text-cream-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{WHATSAPP_DISPLAY}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Tamil Nadu, India — Shipping Across All States</span>
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-2 border border-cream-700 hover:border-gold-400 rounded-lg text-xs text-cream-200 hover:text-white transition-colors"
                >
                  Send Direct Inquiry
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400">
          <p className="flex items-center gap-1.5">
            © 2026 <strong>PREMAHANDCRAFT</strong>. Handcrafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> in India.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors"
            >
              Our Story
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="text-earth-400 hover:text-gold-400 transition-colors font-mono text-[11px]"
            >
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
