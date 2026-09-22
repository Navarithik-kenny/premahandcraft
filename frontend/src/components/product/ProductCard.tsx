import React from 'react';
import { ShoppingBag, MessageCircle, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { formatINR } from '../../utils/formatters';
import { getProductEnquiryUrl } from '../../utils/whatsapp';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added ${product.name} to your cart!`, 'success');
  };

  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getProductEnquiryUrl(product.name);
    window.open(url, '_blank');
  };

  const price = product.discountPrice || product.price;
  const originalPrice = product.discountPrice ? product.price : null;
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onViewDetails(product.slug)}
      className="group bg-white rounded-3xl border border-cream-200 overflow-hidden shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
        <img
          src={product.images[0] || '/images/pooja-kudai.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.featured && (
            <span className="px-2.5 py-1 rounded-full bg-earth-900/90 text-gold-300 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm">
              Artisan Choice
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-terracotta-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Stock / Availability */}
        <div className="absolute top-3 right-3 z-10">
          {product.stock > 0 ? (
            <span className="px-2 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800 text-[10px] font-bold border border-emerald-300">
              In Stock
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-red-100/90 text-red-800 text-[10px] font-bold border border-red-300">
              Made to Order
            </span>
          )}
        </div>

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(product.slug);
          }}
          className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/90 hover:bg-white text-earth-800 shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category & Knot Type */}
          <div className="flex items-center justify-between gap-2 text-[11px] font-semibold text-earth-500 mb-1.5">
            <span className="uppercase tracking-wider">{product.category}</span>
            <span className="bg-cream-100 px-2 py-0.5 rounded text-earth-700 font-medium">
              {product.knotType}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-earth-950 group-hover:text-earth-700 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-earth-600">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
            </div>
            <span className="font-bold text-earth-900">{product.rating}</span>
            <span className="text-earth-400">({product.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 border-t border-cream-200">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-serif text-xl font-extrabold text-earth-950">
              {formatINR(price)}
            </span>
            {originalPrice && (
              <span className="text-xs text-earth-400 line-through">
                {formatINR(originalPrice)}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-2.5 px-3 bg-earth-800 hover:bg-earth-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full py-2.5 px-2 bg-whatsapp-light/10 hover:bg-whatsapp-light text-whatsapp-teal hover:text-white border border-whatsapp-light/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              title="Order / Enquiry on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
