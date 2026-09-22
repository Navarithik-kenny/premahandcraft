import React from 'react';
import { ShoppingBag, MessageCircle, Sparkles, ShieldCheck, Droplets, CheckCircle } from 'lucide-react';
import { WHATSAPP_DISPLAY, createWhatsAppUrl } from '../../utils/whatsapp';

interface HeroSectionProps {
  onShopClick: () => void;
  onCustomClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick, onCustomClick }) => {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Artisan Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-earth-100 border border-gold-400/40 text-earth-900 text-xs font-bold tracking-wide shadow-sm animate-in fade-in">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span>PREMAHANDCRAFT • Authentic South Indian Handcrafts</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-earth-950 leading-[1.15] tracking-tight">
              Handcrafted With Love, <br />
              <span className="text-earth-600 italic">Made To Last.</span>
            </h1>

            {/* Tagline & Subheading */}
            <div className="space-y-2">
              <p className="font-serif text-base sm:text-lg text-gold-700 italic font-medium">
                "Tradition Woven Into Every Creation."
              </p>
              <p className="text-sm sm:text-base text-earth-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover our celebrated collection of handcrafted plastic wire kudai (baskets), lunch bags, pooja baskets, and custom woven accessories. 100% washable, durable for years, and meticulously handcrafted knot by knot.
              </p>
            </div>

            {/* Feature Highlights Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/80 border border-cream-200 shadow-soft">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-earth-900">100% Hand-woven</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/80 border border-cream-200 shadow-soft">
                <Droplets className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-xs font-bold text-earth-900">Washable & Waterproof</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-2.5 rounded-2xl bg-white/80 border border-cream-200 shadow-soft">
                <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
                <span className="text-xs font-bold text-earth-900">Carries 15+ kg</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-8 py-4 bg-earth-900 hover:bg-earth-800 text-white rounded-full font-bold text-sm tracking-wide shadow-premium hover:shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Collection</span>
              </button>

              <a
                href={createWhatsAppUrl("Hello Prema Handcraft, I would like to order handcrafted wire kudai baskets.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-whatsapp-light hover:bg-whatsapp-dark text-white rounded-full font-bold text-sm tracking-wide shadow-premium hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                onClick={onCustomClick}
                className="w-full sm:w-auto px-6 py-4 text-earth-800 hover:text-earth-950 font-bold text-xs tracking-wider uppercase border border-earth-300 hover:border-earth-600 rounded-full transition-all"
              >
                Custom Order →
              </button>
            </div>

            <p className="text-xs text-earth-500 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Artisans actively taking custom color & bulk wedding orders via WhatsApp ({WHATSAPP_DISPLAY})</span>
            </p>

          </div>

          {/* Visual Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative background aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-gold-400/30 to-earth-500/20 rounded-[2.5rem] blur-2xl -z-10" />

              {/* Main Image Frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/hero.jpg"
                  alt="Prema Handcraft artisan wire kudai collection"
                  className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Artisan Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-panel shadow-premium">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-extrabold uppercase text-gold-600 tracking-wider">
                        Handcrafted in India
                      </p>
                      <p className="font-serif text-sm font-bold text-earth-950">
                        Zero Single-Use Plastic • Built For Life
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gold-500 text-earth-950 flex items-center justify-center font-bold text-xs shadow">
                      ★ 4.9
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
