import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const KnotGuide: React.FC = () => {
  const knots = [
    {
      name: 'Normal Box Knot',
      tamil: 'சாதா முடிச்சு (Sadha Knot)',
      desc: 'The traditional foundation of South Indian wire weaving. Tight, symmetrical square knots providing maximum strength and structural balance.',
      bestFor: 'Daily shopping, pooja baskets, laundry storage',
      durability: '5/5'
    },
    {
      name: 'Biscuit Knot',
      tamil: 'பிஸ்கட் முடிச்சு (Biscuit Knot)',
      desc: 'An intricate, raised 3D diamond pattern that creates a padded, cushioned exterior texture. Highly prized for elegant handbags.',
      bestFor: 'Office lunch bags, picnic totes, fashion handbags',
      durability: '5/5'
    },
    {
      name: 'Amla / Gooseberry Knot',
      tamil: 'நெல்லிக்காய் முடிச்சு (Nellikai Knot)',
      desc: 'A spherical, floral-like knot resembling an Indian amla berry. Adds an exquisite decorative texture and festive charm.',
      bestFor: 'Festival hampers, temple offerings, wedding return gifts',
      durability: '4.8/5'
    },
    {
      name: 'Sivan Kan (Shiva’s Eye)',
      tamil: 'சிவன்கண் முடிச்சு (Sivan Kan)',
      desc: 'A sacred geometric weave where adjacent knots form an eye-like pupil symbol. Demands immense artisan patience and mathematical precision.',
      bestFor: 'Collector baskets, pooja kudai, heirloom gifts',
      durability: '5/5'
    }
  ];

  return (
    <section className="py-16 bg-cream-100 border-y border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-200/70 text-earth-900 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-earth-800" />
            <span>Master Artisan Craftsmanship</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-earth-950">
            South Indian Wire Kudai Knot Guide
          </h2>
          <p className="text-sm text-earth-700 mt-2">
            Every Prema Handcraft wire basket is hand-woven knot by knot using time-honored traditional techniques that ensure each creation withstands decades of daily use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {knots.map((k) => (
            <div
              key={k.name}
              className="bg-white p-6 rounded-3xl border border-cream-300 shadow-soft hover:shadow-premium transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-gold-600 uppercase tracking-wider">
                    {k.tamil}
                  </span>
                  <span className="text-[10px] bg-cream-100 text-earth-800 px-2 py-0.5 rounded-full font-bold">
                    Rating: {k.durability}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-earth-950">
                  {k.name}
                </h3>
                <p className="text-xs text-earth-600 leading-relaxed">
                  {k.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-cream-100 text-xs text-earth-700 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Best For:</strong> {k.bestFor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
