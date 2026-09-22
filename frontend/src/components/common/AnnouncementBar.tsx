import React from 'react';
import { Sparkles, MessageCircle, Truck } from 'lucide-react';
import { WHATSAPP_DISPLAY, createWhatsAppUrl } from '../../utils/whatsapp';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-earth-900 text-cream-100 text-xs font-medium py-2 px-4 border-b border-gold-600/30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>Handmade South Indian Wire Kudai & Artisan Baskets</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-1.5 text-cream-200">
            <Truck className="w-3.5 h-3.5 text-gold-400" />
            <span>Delivery All Across India</span>
          </div>
          
          <a
            href={createWhatsAppUrl("Hello Prema Handcraft, I'd like to ask about your wire kudai collection.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gold-300 hover:text-white transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-whatsapp-light" />
            <span>WhatsApp Order: <strong className="text-white">{WHATSAPP_DISPLAY}</strong></span>
          </a>
        </div>
      </div>
    </div>
  );
};
