import React from 'react';
import { Heart, Sparkles, ShieldCheck, RefreshCw, Feather, Users, Award, MessageCircle } from 'lucide-react';
import { ProcessSection } from '../components/home/ProcessSection';
import { KnotGuide } from '../components/product/KnotGuide';
import { createWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100 text-earth-900 text-xs font-bold tracking-wider uppercase border border-gold-300">
            <Heart className="w-4 h-4 text-red-600 fill-red-600" />
            <span>Handcrafted In South India</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-earth-950">
            About Prema Handcraft
          </h1>
          <p className="font-serif text-lg text-gold-700 italic">
            "Handcrafted With Love, Made For You."
          </p>
          <p className="text-sm sm:text-base text-earth-700 leading-relaxed">
            Welcome to PREMAHANDCRAFT. We are a family of passionate artisans from Tamil Nadu, India, dedicated to the timeless art of handmade plastic wire weaving. Every basket, bag, and tote we produce is handcrafted knot-by-knot without machines, delivering unmatched durability, vivid beauty, and authentic Indian soul.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 sm:p-12 rounded-[2.5rem] border border-cream-200 shadow-soft">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block">
              Our Artisan Heritage
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-earth-950">
              Preserving Tradition Woven Into Every Creation
            </h2>
            <p className="text-sm text-earth-700 leading-relaxed">
              Growing up in South Indian households, the woven wire kudai was a cherished staple. Mothers took them to morning vegetable markets, grandmothers carried fragrant jasmine and coconuts to the temple in them, and children carried warm lunches wrapped inside them.
            </p>
            <p className="text-sm text-earth-700 leading-relaxed">
              Unlike modern synthetic bags that fray within weeks, a genuine wire kudai lasts for decades. When the influx of single-use thin plastic bags began replacing this indigenous craft, Prema Handcraft was born to revive, celebrate, and modernize traditional wire weaving.
            </p>
            <p className="text-sm text-earth-700 leading-relaxed">
              Today, our craftswomen blend nostalgic box knots, biscuit weaves, and sacred Sivan Kan geometry with modern colors and contemporary designs like pearl handle totes and office lunch carriers.
            </p>

            <div className="pt-2">
              <a
                href={createWhatsAppUrl("Hello Prema Handcraft, I'd like to learn more about your artisan story.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-whatsapp-light hover:bg-whatsapp-dark text-white rounded-full text-xs font-bold shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Connect With Our Artisans: {WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-premium border-2 border-white">
              <img
                src="/images/hero.jpg"
                alt="Prema Handcraft workshop"
                className="w-full h-96 object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-panel shadow-soft text-center">
                <p className="font-serif text-sm font-bold text-earth-950">
                  "Every knot woven is a salute to women empowerment and sustainable living."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-cream-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-100 text-earth-900 flex items-center justify-center">
              <Award className="w-6 h-6 text-earth-800" />
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-950">Uncompromising Quality</h3>
            <p className="text-xs text-earth-600 leading-relaxed">
              We exclusively utilize high-tensile virgin wire that never cracks under sunlight or heavy moisture. Handles are reinforced with clear acrylic tubing for maximum comfort.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-cream-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Feather className="w-6 h-6 text-emerald-800" />
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-950">Sustainable & Eco-Friendly</h3>
            <p className="text-xs text-earth-600 leading-relaxed">
              One Prema Handcraft basket eliminates thousands of single-use polythene bags over its 10+ year lifespan. Completely washable, hygienic, and reusable forever.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-cream-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-terracotta-600" />
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-950">Empowering Craftswomen</h3>
            <p className="text-xs text-earth-600 leading-relaxed">
              Our weaving collective provides fair, dignified work to talented homemakers and rural artisans in Tamil Nadu, fostering economic independence through art.
            </p>
          </div>
        </div>

        {/* 6 Step Process */}
        <ProcessSection />

        {/* Kudai Knot Guide */}
        <KnotGuide />

      </div>
    </div>
  );
};
