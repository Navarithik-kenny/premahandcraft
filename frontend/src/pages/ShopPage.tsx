import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFilters } from '../components/product/ProductFilters';
import { Product, Category } from '../types';
import { Search, X, SlidersHorizontal, PackageOpen } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
  initialSearch?: string;
  onSelectProduct: (slug: string) => void;
  onCustomOrderClick: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  categories,
  initialCategory = 'All',
  initialSearch = '',
  onSelectProduct,
  onCustomOrderClick
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedKnotType, setSelectedKnotType] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category if initialCategory changes
  React.useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Sync search if initialSearch changes
  React.useEffect(() => {
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialSearch]);

  const categoryNames = categories.map(c => c.name);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Category
        if (selectedCategory && selectedCategory !== 'All') {
          if (p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        }
        // Knot
        if (selectedKnotType) {
          if (!p.knotType.toLowerCase().includes(selectedKnotType.toLowerCase())) return false;
        }
        // Price
        const effPrice = p.discountPrice || p.price;
        if (effPrice > maxPrice) return false;
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchKnot = p.knotType.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchKnot) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating;
        if (sortBy === 'rating') return b.rating - a.rating;
        // newest
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
  }, [products, selectedCategory, selectedKnotType, maxPrice, sortBy, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedKnotType('');
    setMaxPrice(2000);
    setSortBy('newest');
    setSearchQuery('');
  };

  return (
    <div className="py-10 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-earth-500 uppercase tracking-wider">
            <span>PREMAHANDCRAFT</span>
            <span>/</span>
            <span className="text-earth-900 font-bold">Handmade Wire Kudai Shop</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-earth-950">
                Artisan Wire Kudai & Bags
              </h1>
              <p className="text-xs sm:text-sm text-earth-600 mt-1">
                Showing {filteredProducts.length} authentic handcrafted creations
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-cream-300 rounded-2xl text-xs font-bold text-earth-900 shadow-soft"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter & Sort Products</span>
            </button>
          </div>
        </div>

        {/* Search & Active Filters Bar */}
        <div className="bg-white p-4 rounded-3xl border border-cream-200 shadow-soft mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search by name, knot, or occasion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cream-50 border border-cream-300 rounded-full py-2.5 pl-10 pr-10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            <Search className="w-4 h-4 text-earth-400 absolute left-3.5 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-earth-400 hover:text-earth-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-earth-100 text-earth-900 text-xs font-semibold">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedKnotType && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-earth-900 text-xs font-semibold">
                Knot: {selectedKnotType}
                <button onClick={() => setSelectedKnotType('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {(selectedCategory !== 'All' || selectedKnotType || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-red-600 hover:underline font-semibold ml-2"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Main Shop Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <ProductFilters
              categories={categoryNames}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedKnotType={selectedKnotType}
              onSelectKnotType={setSelectedKnotType}
              maxPrice={maxPrice}
              onPriceChange={setMaxPrice}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onReset={handleResetFilters}
            />

            {/* Custom Order Box */}
            <div className="mt-6 p-6 rounded-3xl bg-earth-900 text-white space-y-3 shadow-premium">
              <h3 className="font-serif font-bold text-base text-gold-300">
                Want a Bespoke Kudai?
              </h3>
              <p className="text-xs text-cream-200 leading-relaxed">
                Choose your custom size, knot weave, and dream wire colors with our interactive designer.
              </p>
              <button
                onClick={onCustomOrderClick}
                className="w-full py-2.5 bg-gold-500 hover:bg-gold-400 text-earth-950 font-bold text-xs rounded-xl transition-all shadow"
              >
                Design Custom Kudai →
              </button>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-cream-200 space-y-4 shadow-soft">
                <div className="w-16 h-16 rounded-full bg-cream-200 text-earth-500 mx-auto flex items-center justify-center">
                  <PackageOpen className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-earth-950">
                  No matching wire kudai found
                </h3>
                <p className="text-xs sm:text-sm text-earth-600 max-w-md mx-auto">
                  Try adjusting your search criteria or resetting your filters to explore our full handcrafted collection.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-earth-800 text-white text-xs font-bold rounded-full shadow"
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={onCustomOrderClick}
                    className="px-6 py-2.5 border border-earth-300 text-earth-800 text-xs font-bold rounded-full"
                  >
                    Request Custom Kudai
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onViewDetails={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Slide-over Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden animate-in fade-in">
          <div
            className="absolute inset-0 bg-earth-950/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-cream-50 p-6 overflow-y-auto shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-cream-300">
                <h3 className="font-serif font-bold text-lg text-earth-950">Filter Products</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-earth-500 hover:text-earth-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProductFilters
                categories={categoryNames}
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setMobileFilterOpen(false);
                }}
                selectedKnotType={selectedKnotType}
                onSelectKnotType={(k) => {
                  setSelectedKnotType(k);
                  setMobileFilterOpen(false);
                }}
                maxPrice={maxPrice}
                onPriceChange={setMaxPrice}
                sortBy={sortBy}
                onSortChange={(s) => {
                  setSortBy(s);
                  setMobileFilterOpen(false);
                }}
                onReset={() => {
                  handleResetFilters();
                  setMobileFilterOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
