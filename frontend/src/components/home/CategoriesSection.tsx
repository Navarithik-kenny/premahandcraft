import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Category } from '../../types';

interface CategoriesSectionProps {
  categories: Category[];
  onSelectCategory: (categoryName: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories, onSelectCategory }) => {
  return (
    <section className="py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-1">
              Curated Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-earth-950">
              Explore By Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-earth-600 max-w-md">
            From auspicious temple pooja baskets to heavy-duty market totes and stylish office lunch bags.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-soft hover:shadow-premium cursor-pointer transition-all duration-300"
            >
              {/* Background Image */}
              <img
                src={cat.image || '/images/hero.jpg'}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-earth-950/90 via-earth-950/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Content Box */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-gold-300 uppercase tracking-wider">
                    {cat.itemCount ? `${cat.itemCount} Designs` : 'Handmade Collection'}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-200 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-cream-200 line-clamp-2 leading-relaxed opacity-90">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-gold-300">
                  <span>Browse Designs</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
