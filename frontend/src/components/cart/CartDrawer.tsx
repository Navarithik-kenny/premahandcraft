import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, MessageCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';
import { getCheckoutOrderUrl } from '../../utils/whatsapp';

interface CartDrawerProps {
  onNavigate: (page: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartSubtotal, cartCount } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppInstantOrder = () => {
    if (cart.length === 0) return;
    const url = getCheckoutOrderUrl({
      customerName: 'Customer',
      phone: 'WhatsApp User',
      items: cart,
      totalAmount: cartSubtotal,
      address: 'Delivery address to be provided on WhatsApp',
      city: 'Tamil Nadu',
      pincode: '600001'
    });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-earth-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 shadow-2xl flex flex-col border-l border-cream-200">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-cream-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-earth-800" />
              <h2 className="font-serif text-lg font-bold text-earth-950">
                Shopping Cart ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-earth-500 hover:text-earth-900 hover:bg-cream-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body / Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-200 text-earth-400 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-earth-900">Your cart is empty</h3>
                <p className="text-xs text-earth-600 max-w-xs">
                  Discover our handmade South Indian wire kudai baskets, lunch bags, and handcrafted collections.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('shop');
                  }}
                  className="px-6 py-2.5 bg-earth-800 hover:bg-earth-900 text-white rounded-full text-xs font-semibold tracking-wide transition-all shadow"
                >
                  Explore Kudai Collection
                </button>
              </div>
            ) : (
              cart.map(item => {
                const price = item.product.discountPrice || item.product.price;
                return (
                  <div
                    key={item.product._id}
                    className="flex gap-4 p-3.5 bg-white rounded-2xl border border-cream-200 shadow-soft"
                  >
                    <img
                      src={item.product.images[0] || '/images/pooja-kudai.jpg'}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover border border-cream-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-earth-950 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-earth-500 font-medium">
                          {item.product.knotType} • {item.selectedColor || item.product.color}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-extrabold text-earth-900">
                          {formatINR(price * item.quantity)}
                        </span>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-cream-300 rounded-lg bg-cream-50">
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                              className="p-1 hover:bg-cream-200 text-earth-700 transition-colors"
                              title="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-earth-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                              className="p-1 hover:bg-cream-200 text-earth-700 transition-colors"
                              title="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product._id)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-cream-200 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-earth-600">Subtotal</span>
                <span className="font-extrabold text-lg text-earth-950">
                  {formatINR(cartSubtotal)}
                </span>
              </div>

              {cartSubtotal >= 999 ? (
                <p className="text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-medium text-center">
                  🎉 You qualify for <strong>FREE Delivery</strong> across India!
                </p>
              ) : (
                <p className="text-[11px] text-earth-600 text-center">
                  Add <strong>{formatINR(999 - cartSubtotal)}</strong> more for Free Delivery
                </p>
              )}

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('checkout');
                  }}
                  className="w-full py-3 px-4 bg-earth-900 hover:bg-earth-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-premium transition-all hover:scale-[1.01]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppInstantOrder}
                  className="w-full py-3 px-4 bg-whatsapp-light hover:bg-whatsapp-dark text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order Directly on WhatsApp</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
