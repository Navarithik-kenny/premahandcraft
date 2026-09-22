import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ProcessSection } from '../components/home/ProcessSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { WhatsAppCta, InstagramFeed } from '../components/home/HomeExtras';
import { KnotGuide } from '../components/product/KnotGuide';
import { ProductCard } from '../components/product/ProductCard';
import { Product, Category } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  categories: Category[];
  onNavigate: (page: string, param?: string) => void;
  onSelectProduct: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  categories,
  onNavigate,
  onSelectProduct
}) => {
  const [activeTab, setActiveTab] = useState<'featured' | 'popular'>('featured');

  const displayedProducts = products
    .filter(p => (activeTab === 'featured' ? p.featured : p.popular))
    .slice(0, 6);

  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <HeroSection
        onShopClick={() => onNavigate('shop')}
        onCustomClick={() => onNavigate('custom-orders')}
      />

      {/* Featured & Popular Products Showcase */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-1">
                Handcrafted Highlights
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-earth-950">
                Trending Wire Kudai Creations
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex items-center p-1.5 bg-cream-200/70 rounded-full border border-cream-300">
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'featured'
                    ? 'bg-earth-900 text-gold-300 shadow'
                    : 'text-earth-700 hover:text-earth-950'
                }`}
              >
                Featured Collections
              </button>
              <button
                onClick={() => setActiveTab('popular')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'popular'
                    ? 'bg-earth-900 text-gold-300 shadow'
                    : 'text-earth-700 hover:text-earth-950'
                }`}
              >
                Most Popular
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                onViewDetails={onSelectProduct}
              />
            ))}
          </div>

          {/* View Full Shop Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-earth-900 hover:bg-earth-800 text-white rounded-full text-xs font-bold tracking-wider uppercase shadow-premium hover:scale-105 transition-all"
            >
              <span>View All Handcrafted Baskets</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection
        categories={categories}
        onSelectCategory={(catName) => onNavigate('shop', catName)}
      />

      {/* Traditional Kudai Knot Guide */}
      <KnotGuide />

      {/* Why Choose Prema Handcraft */}
      <WhyChooseUs />

      {/* 6-Step Artisan Process */}
      <ProcessSection />

      {/* Customer Testimonials */}
      <TestimonialsSection />

      {/* High-Converting WhatsApp CTA Banner */}
      <WhatsAppCta />

      {/* Artisan Workshop Instagram Feed */}
      <InstagramFeed />

    </div>
  );
};
