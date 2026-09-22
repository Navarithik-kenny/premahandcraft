import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { CartDrawer } from './components/cart/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CustomOrdersPage } from './pages/CustomOrdersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { useAuth } from './context/AuthContext';
import { api } from './services/api';
import { Product, Category } from './types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from './data/initialData';

export const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [globalSearch, setGlobalSearch] = useState<string>('');

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS as any);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES as any);
  const [loading, setLoading] = useState(true);

  // Load products and categories from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodList, catList] = await Promise.all([
          api.getProducts().catch(() => INITIAL_PRODUCTS as any),
          api.getCategories().catch(() => INITIAL_CATEGORIES as any)
        ]);
        if (prodList && prodList.length > 0) setProducts(prodList);
        if (catList && catList.length > 0) setCategories(catList);
      } catch (err) {
        console.warn('Using seeded data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNavigate = (page: string, param?: string) => {
    if (page === 'categories') {
      setSelectedCategoryFilter('All');
      setCurrentPage('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (param) {
      setSelectedCategoryFilter(param);
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (slug: string) => {
    setSelectedProductSlug(slug);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setGlobalSearch(query);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing admin page
  if (currentPage === 'admin') {
    if (isAuthenticated) {
      return (
        <AdminDashboardPage onBackToStore={() => handleNavigate('home')} />
      );
    } else {
      return (
        <AdminLoginPage
          onLoginSuccess={() => handleNavigate('admin')}
          onBackToHome={() => handleNavigate('home')}
        />
      );
    }
  }

  const selectedProduct = products.find(p => p.slug === selectedProductSlug) || products[0];

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-earth-950 font-sans selection:bg-gold-500 selection:text-white">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer onNavigate={handleNavigate} />

      {/* Page Routing */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            categories={categories}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            products={products}
            categories={categories}
            initialCategory={selectedCategoryFilter}
            initialSearch={globalSearch}
            onSelectProduct={handleSelectProduct}
            onCustomOrderClick={() => handleNavigate('custom-orders')}
          />
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            onBack={() => handleNavigate('shop')}
            onSelectProduct={handleSelectProduct}
            onNavigateCheckout={() => handleNavigate('checkout')}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onBackToShop={() => handleNavigate('shop')}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'custom-orders' && (
          <CustomOrdersPage />
        )}

        {currentPage === 'about' && (
          <AboutPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Floating WhatsApp Action (+91 93612 44779) */}
      <FloatingWhatsApp />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
