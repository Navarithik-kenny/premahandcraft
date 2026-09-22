import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedKnotType: string;
  onSelectKnotType: (knot: string) => void;
  maxPrice: number;
  onPriceChange: (price: number) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

const KNOT_TYPES = [
  'All',
  'Normal Box Knot',
  'Biscuit Knot',
  'Amla Knot',
  'Sivan Kan',
  'Cross-Cut Lattice'
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedKnotType,
  onSelectKnotType,
  maxPrice,
  onPriceChange,
  sortBy,
  onSortChange,
  onReset
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-cream-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-earth-800" />
          <h3 className="font-serif font-bold text-earth-950 text-base">Filters & Sort</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-earth-500 hover:text-earth-900 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-earth-700">
          Categories
        </label>
        <div className="flex flex-wrap gap-1.5">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-earth-900 text-gold-300 shadow-sm'
                  : 'bg-cream-100 text-earth-700 hover:bg-cream-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Knot Type */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-earth-700">
          Knot / Weave Style
        </label>
        <div className="space-y-1">
          {KNOT_TYPES.map((knot) => (
            <button
              key={knot}
              onClick={() => onSelectKnotType(knot === 'All' ? '' : knot)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                (knot === 'All' && !selectedKnotType) || selectedKnotType === knot
                  ? 'bg-gold-50 text-earth-950 font-bold border border-gold-300'
                  : 'text-earth-600 hover:bg-cream-100'
              }`}
            >
              {knot}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold uppercase tracking-wider text-earth-700">Max Budget</span>
          <span className="font-extrabold text-earth-900">{formatINR(maxPrice)}</span>
        </div>
        <input
          type="range"
          min="300"
          max="2000"
          step="50"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-earth-800 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-earth-400">
          <span>₹300</span>
          <span>₹2,000</span>
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2 pt-2 border-t border-cream-200">
        <label className="text-xs font-bold uppercase tracking-wider text-earth-700">
          Sort Products
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2 px-3 text-xs font-semibold text-earth-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

    </div>
  );
};
