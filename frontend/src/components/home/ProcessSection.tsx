import React from 'react';
import { Palette, Scissors, Sparkles, CheckSquare, Package, Truck } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Design & Color Selection',
      icon: Palette,
      desc: 'Pattern planning, measuring wire gauges, and curating harmonious South Indian color palettes.'
    },
    {
      step: '02',
      title: 'Precision Wire Crafting',
      icon: Scissors,
      desc: 'Skilled artisans meticulously hand-weave knot-by-knot on sturdy wooden frames over several days.'
    },
    {
      step: '03',
      title: 'Finishing & Handle Shaping',
      icon: Sparkles,
      desc: 'Adding reinforced clear tube handles, brass base studs, and tucking in loose wire ends seamlessly.'
    },
    {
      step: '04',
      title: 'Quality Check & Tension Test',
      icon: CheckSquare,
      desc: 'Every kudai undergoes weight-bearing tests and knot tightness inspection before approval.'
    },
    {
      step: '05',
      title: 'Protective Packaging',
      icon: Package,
      desc: 'Wrapped in multi-layer protective materials to ensure the basket preserves its shape during transit.'
    },
    {
      step: '06',
      title: 'Safe Doorstep Delivery',
      icon: Truck,
      desc: 'Dispatched via trusted courier partners across Tamil Nadu and all Indian states.'
    }
  ];

  return (
    <section className="py-20 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block">
              The Artisan Journey
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-earth-950">
              How Every Prema Handcraft Kudai Comes to Life
            </h2>
            <p className="text-sm text-earth-600 leading-relaxed">
              We take pride in keeping traditional South Indian hand-weaving techniques alive. Unlike factory-molded plastic goods, each Prema Handcraft wire basket is created by human hands with immense devotion and patience.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-premium border-2 border-white">
              <img
                src="/images/weaving-process.jpg"
                alt="South Indian artisan weaving wire kudai"
                className="w-full h-72 sm:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-950/70 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs font-medium italic">
                  "Every single knot tells a story of patience, skill, and South Indian heritage."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft hover:shadow-premium transition-all space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-earth-900 text-gold-400 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <span className="font-serif font-extrabold text-2xl text-cream-300 group-hover:text-gold-500 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-earth-950 pt-2">
                  {item.title}
                </h3>
                <p className="text-xs text-earth-600 leading-relaxed">
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
