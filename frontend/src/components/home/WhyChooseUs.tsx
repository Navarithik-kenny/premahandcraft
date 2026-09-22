import React from 'react';
import { HeartHandshake, ShieldCheck, Sparkles, RefreshCw, Feather, Users } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: HeartHandshake,
      title: 'Handmade Craftsmanship',
      desc: 'Each kudai is hand-woven by experienced craftswomen, weaving tradition and care into every single knot.'
    },
    {
      icon: RefreshCw,
      title: '100% Washable & Waterproof',
      desc: 'Spills and dirt wash off effortlessly under tap water. Quick to dry and permanently odor-free.'
    },
    {
      icon: ShieldCheck,
      title: 'Heavy-Duty & Long Lasting',
      desc: 'Woven with high-tensile virgin wire capable of holding 15+ kg without deforming. Lasts 10+ years.'
    },
    {
      icon: Sparkles,
      title: 'Custom Colors & Sizes',
      desc: 'Pick your dream color combination, size, and knot weave to match weddings, poojas, or personal style.'
    },
    {
      icon: Feather,
      title: 'Eco-Friendly Reusability',
      desc: 'Say goodbye to flimsy single-use plastic bags. Our wire baskets are the ultimate sustainable lifestyle companion.'
    },
    {
      icon: Users,
      title: 'Direct Artisan Support',
      desc: 'Every purchase directly supports traditional South Indian artisans, preserving rich indigenous weaving heritage.'
    }
  ];

  return (
    <section className="py-20 bg-cream-100/60 border-y border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block">
            The Prema Handcraft Difference
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-earth-950">
            Why Choose Our Handcrafted Wire Kudai?
          </h2>
          <p className="text-sm text-earth-600">
            Thoughtfully woven with premium materials to serve your family across generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-cream-300 shadow-soft hover:shadow-premium transition-all duration-300 hover:-translate-y-1 space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold-100 text-earth-800 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-earth-800" />
                </div>
                <h3 className="font-serif text-lg font-bold text-earth-950">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
