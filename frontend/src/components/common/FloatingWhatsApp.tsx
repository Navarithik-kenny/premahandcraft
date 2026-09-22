import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_DISPLAY, createWhatsAppUrl } from '../../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="WhatsApp live chat" className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-none">
      {/* Tooltip message */}
      {showTooltip && (
        <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-2xl shadow-premium border border-cream-300 text-xs text-earth-900 animate-in fade-in slide-in-from-right-4">
          <div>
            <p className="font-bold text-earth-950">Chat with Prema Handcraft</p>
            <p className="text-earth-600 text-[11px]">Instant quotes & custom orders: {WHATSAPP_DISPLAY}</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Close tooltip"
            className="text-earth-400 hover:text-earth-700 ml-1 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={createWhatsAppUrl("Hello Prema Handcraft, I would like to enquire about your handmade wire kudai products.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto relative w-14 h-14 rounded-full bg-whatsapp-light hover:bg-whatsapp-dark text-white flex items-center justify-center shadow-premium hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <span className="absolute inset-0 rounded-full bg-whatsapp-light opacity-75 animate-ping -z-10 group-hover:opacity-0 transition-opacity" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </aside>
  );
};
