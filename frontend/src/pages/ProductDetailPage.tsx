import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Star, ShieldCheck, Droplets, ArrowLeft, Check, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/formatters';
import { getProductOrderUrl } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/product/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (slug: string) => void;
  onNavigateCheckout: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBack,
  onSelectProduct,
  onNavigateCheckout
}) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || '/images/pooja-kudai.jpg');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>(product.color);

  // Sync image if product changes
  React.useEffect(() => {
    setSelectedImage(product.images[0] || '/images/pooja-kudai.jpg');
    setQuantity(1);
    setSelectedColor(product.color);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const price = product.discountPrice || product.price;
  const originalPrice = product.discountPrice ? product.price : null;
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    showToast(`Added ${quantity}x ${product.name} to cart!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    onNavigateCheckout();
  };

  const handleWhatsAppOrder = () => {
    const url = getProductOrderUrl(product, quantity, { color: selectedColor, size: product.size });
    window.open(url, '_blank');
  };

  const relatedProducts = allProducts
    .filter(p => p._id !== product._id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="py-10 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-earth-700 hover:text-earth-950 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Wire Kudai</span>
        </button>

        {/* Main Product Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-200 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-cream-100 border border-cream-200 shadow-soft">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === img
                          ? 'border-earth-900 ring-2 ring-gold-400'
                          : 'border-cream-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} thumbnail ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Kudai Guarantee Box */}
              <div className="grid grid-cols-3 gap-3 pt-4 text-center">
                <div className="p-3 rounded-2xl bg-cream-50 border border-cream-200">
                  <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-earth-900">100% Washable</p>
                  <p className="text-[10px] text-earth-500">Wash with soap water</p>
                </div>
                <div className="p-3 rounded-2xl bg-cream-50 border border-cream-200">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-earth-900">Heavy-Duty Wire</p>
                  <p className="text-[10px] text-earth-500">Carries 15+ kg</p>
                </div>
                <div className="p-3 rounded-2xl bg-cream-50 border border-cream-200">
                  <Truck className="w-5 h-5 text-gold-600 mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-earth-900">All India Delivery</p>
                  <p className="text-[10px] text-earth-500">Safe packaging</p>
                </div>
              </div>
            </div>

            {/* Product Details Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Badges & Category */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cream-100 text-earth-800 text-xs font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-gold-100 text-earth-950 text-xs font-bold border border-gold-300">
                  Knot: {product.knotType}
                </span>
                {product.stock > 0 ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    ✓ In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                    Custom Order (3-5 days crafting)
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-earth-950">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <span className="font-bold text-earth-900">{product.rating}</span>
                <span className="text-earth-500">({product.reviewsCount} customer reviews)</span>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-cream-100/70 border border-cream-200 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-extrabold text-earth-950">
                  {formatINR(price)}
                </span>
                {originalPrice && (
                  <>
                    <span className="text-sm text-earth-400 line-through">
                      {formatINR(originalPrice)}
                    </span>
                    <span className="text-xs font-extrabold text-terracotta-500 bg-terracotta-50 px-2 py-0.5 rounded-full border border-terracotta-200">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-earth-700 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-earth-800 uppercase tracking-wider">
                  Color Combination: <span className="font-normal text-earth-600">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[product.color, 'Red & Gold', 'Turquoise & Yellow', 'Peach & Ivory'].map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        selectedColor === col
                          ? 'border-earth-900 bg-earth-900 text-white font-bold'
                          : 'border-cream-300 text-earth-700 hover:bg-cream-100'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications Table */}
              <div className="border border-cream-200 rounded-2xl overflow-hidden text-xs">
                <div className="grid grid-cols-2 p-2.5 bg-cream-50 border-b border-cream-200">
                  <span className="font-bold text-earth-700">Material</span>
                  <span className="text-earth-950">{product.material}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5 bg-white border-b border-cream-200">
                  <span className="font-bold text-earth-700">Size / Capacity</span>
                  <span className="text-earth-950">{product.size}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5 bg-cream-50 border-b border-cream-200">
                  <span className="font-bold text-earth-700">Approx. Weight</span>
                  <span className="text-earth-950">{product.weight}</span>
                </div>
                <div className="grid grid-cols-2 p-2.5 bg-white">
                  <span className="font-bold text-earth-700">Knot Technique</span>
                  <span className="text-earth-950">{product.knotType}</span>
                </div>
              </div>

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-earth-700 uppercase tracking-wider">Quantity:</span>
                  <div className="flex items-center border border-cream-300 rounded-xl bg-cream-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-sm font-bold text-earth-700 hover:bg-cream-200 rounded-l-xl"
                    >
                      -
                    </button>
                    <span className="px-4 text-xs font-extrabold text-earth-950">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-sm font-bold text-earth-700 hover:bg-cream-200 rounded-r-xl"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Button Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3.5 bg-earth-900 hover:bg-earth-800 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-premium hover:scale-[1.01] transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-earth-950 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-premium hover:scale-[1.01] transition-all"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Direct WhatsApp Ordering Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 bg-whatsapp-light hover:bg-whatsapp-dark text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow hover:scale-[1.01] transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Order on WhatsApp (Instant Response)</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-earth-950">
              Related Handcrafted Creations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard
                  key={p._id}
                  product={p}
                  onViewDetails={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
