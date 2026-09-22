import React from 'react';
import { MessageCircle, Sparkles, Send } from 'lucide-react';
import { WHATSAPP_DISPLAY, createWhatsAppUrl } from '../../utils/whatsapp';

export const WhatsAppCta: React.FC = () => {
  return (
    <section className="py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-gradient-to-r from-earth-950 via-earth-900 to-earth-950 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-gold-600/30">
          
          {/* Decorative accents */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-whatsapp-light/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-earth-800/90 text-gold-300 text-xs font-bold border border-gold-500/30 shadow-sm">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Direct WhatsApp Commerce</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Looking for a Custom Color, Bulk Order, or Festival Hamper?
            </h2>

            <p className="text-sm sm:text-base text-cream-200 max-w-xl mx-auto leading-relaxed">
              We weave custom sizes, dual-tone palettes, and personalized wedding return gifts. Speak directly with our master artisan on WhatsApp for immediate quotes and photo samples!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={createWhatsAppUrl("Hello Prema Handcraft, I would like to discuss a custom order or bulk inquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-whatsapp-light hover:bg-whatsapp-dark text-white rounded-full font-bold text-sm tracking-wide shadow-premium hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Chat Directly on WhatsApp: {WHATSAPP_DISPLAY}</span>
              </a>
            </div>

            <p className="text-xs text-cream-400">
              ⚡ Typically replies within 15 minutes • Fast dispatch across India
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export const InstagramFeed: React.FC = () => {
  const posts = [
    { image: '/images/hero.jpg', caption: 'Fresh morning batch in our artisan workshop' },
    { image: '/images/pooja-kudai.jpg', caption: 'Auspicious red & gold temple pooja kudai' },
    { image: '/images/lunch-kudai.jpg', caption: 'Pastel biscuit knot lunch kudai styling' },
    { image: '/images/market-kudai.jpg', caption: 'Heavy-duty grocery shopping tote in action' },
    { image: '/images/designer-tote.jpg', caption: 'Pearl handle modern artisan fashion tote' },
    { image: '/images/gift-kudai.jpg', caption: 'Diwali & wedding festive return gift hampers' }
  ];

  return (
    <section className="py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-1">
            @PremaHandcraft
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-earth-950">
            Follow Our Weaving Journey
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-soft cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-earth-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center text-white text-[11px] font-medium">
                {post.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
