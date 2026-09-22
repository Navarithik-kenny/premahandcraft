import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatINR } from '../utils/formatters';
import { getCheckoutOrderUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';
import { api } from '../services/api';
import { ShoppingBag, MessageCircle, CheckCircle2, ArrowLeft, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutPageProps {
  onBackToShop: () => void;
  onNavigateHome: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBackToShop, onNavigateHome }) => {
  const { cart, cartSubtotal, clearCart } = useCart();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    whatsappNumber: '',
    email: '',
    address: '',
    city: '',
    district: '',
    state: 'Tamil Nadu',
    pincode: '',
    specialInstructions: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const shippingCharge = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 60;
  const grandTotal = cartSubtotal + shippingCharge;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // If whatsappNumber is empty and phone is being typed, sync it
      ...(name === 'phone' && !prev.whatsappNumber ? { whatsappNumber: value } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.pincode.trim()) {
      showToast('Please fill in all required delivery fields.', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Your cart is empty.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit order to backend
      const orderPayload = {
        customerName: formData.customerName,
        phone: formData.phone,
        whatsappNumber: formData.whatsappNumber || formData.phone,
        email: formData.email,
        items: cart.map(item => ({
          productId: item.product._id,
          name: item.product.name,
          price: item.product.discountPrice || item.product.price,
          quantity: item.quantity,
          image: item.product.images[0] || '',
          knotType: item.product.knotType,
          color: item.selectedColor || item.product.color,
          size: item.selectedSize || item.product.size
        })),
        subtotal: cartSubtotal,
        shippingCharge,
        totalAmount: grandTotal,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
        specialInstructions: formData.specialInstructions,
        status: 'Pending' as const,
        paymentMethod: 'WhatsApp Confirmation'
      };

      const savedOrder = await api.createOrder(orderPayload).catch(err => {
        console.warn('Backend order recording notice:', err);
        return {
          ...orderPayload,
          orderId: `PHC-2026-${Math.floor(1000 + Math.random() * 9000)}`
        };
      });

      // 2. Format and open WhatsApp message
      const whatsappUrl = getCheckoutOrderUrl({
        customerName: formData.customerName,
        phone: formData.phone,
        items: cart,
        totalAmount: grandTotal,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        specialInstructions: formData.specialInstructions
      });

      // Trigger confetti
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch {}

      setCompletedOrder(savedOrder);
      clearCart();
      showToast('Order generated! Opening WhatsApp...', 'success');

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
    } catch (err: any) {
      showToast(err.message || 'Error processing order', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If order completed modal
  if (completedOrder) {
    return (
      <div className="py-16 bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="max-w-lg w-full mx-4 bg-white rounded-3xl p-8 border border-cream-200 shadow-premium text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block">
              PREMAHANDCRAFT Order Confirmation
            </span>
            <h1 className="font-serif text-2xl font-extrabold text-earth-950">
              Thank You, {formData.customerName}!
            </h1>
            <p className="text-xs font-mono bg-cream-100 py-1.5 px-3 rounded-lg text-earth-800 inline-block">
              Order ID: <strong>{completedOrder.orderId || completedOrder.data?.orderId || 'PHC-2026'}</strong>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            Your handcrafted order has been drafted for WhatsApp confirmation. Our artisan team will reply on WhatsApp to confirm delivery scheduling and packaging.
          </p>

          <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 text-left text-xs space-y-2 text-earth-700">
            <div className="flex justify-between">
              <span>Customer:</span>
              <strong className="text-earth-950">{formData.customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <strong className="text-earth-950">{formatINR(grandTotal)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Delivery To:</span>
              <span className="text-right max-w-xs">{formData.address}, {formData.city} - {formData.pincode}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <a
              href={`https://wa.me/919361244779?text=${encodeURIComponent(`Hello Prema Handcraft, Checking status of my Order: ${completedOrder.orderId || completedOrder.data?.orderId}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-whatsapp-light hover:bg-whatsapp-dark text-white rounded-full text-xs font-bold shadow flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Message Us on WhatsApp ({WHATSAPP_DISPLAY})</span>
            </a>

            <button
              onClick={onNavigateHome}
              className="py-3 px-6 bg-earth-900 hover:bg-earth-800 text-white rounded-full text-xs font-bold shadow"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="py-20 bg-cream-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white rounded-3xl p-8 border border-cream-200 shadow-soft text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-cream-200 text-earth-500 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-earth-950">Your Cart is Empty</h2>
          <p className="text-xs text-earth-600">
            Please add some of our authentic South Indian wire kudai to proceed with checkout.
          </p>
          <button
            onClick={onBackToShop}
            className="px-6 py-3 bg-earth-900 text-white text-xs font-bold rounded-full shadow hover:bg-earth-800 transition-all"
          >
            Explore Wire Kudai Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 text-xs font-bold text-earth-700 hover:text-earth-950 mb-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shopping</span>
          </button>
          <h1 className="font-serif text-3xl font-extrabold text-earth-950">
            Order Checkout & WhatsApp Confirmation
          </h1>
          <p className="text-xs sm:text-sm text-earth-600 mt-1">
            Complete your delivery details to generate your customized WhatsApp order invoice.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Delivery Details Column */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6">
              
              <div className="flex items-center gap-2 pb-4 border-b border-cream-200">
                <Truck className="w-5 h-5 text-earth-800" />
                <h2 className="font-serif text-lg font-bold text-earth-950">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g. Priya Sundaram"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    required
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    Complete Street Address *
                  </label>
                  <textarea
                    rows={3}
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Flat number, Street name, Landmark..."
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Coimbatore / Chennai"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="e.g. Madurai"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Tamil Nadu"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="641001"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    Special Packaging / Occasion Instructions
                  </label>
                  <input
                    type="text"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    placeholder="e.g. Gift wrap with ribbon for wedding / fragile packaging"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Order Summary Column */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
                <h2 className="font-serif text-lg font-bold text-earth-950 pb-3 border-b border-cream-200">
                  Order Summary ({cart.length} items)
                </h2>

                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {cart.map(item => {
                    const price = item.product.discountPrice || item.product.price;
                    return (
                      <div key={item.product._id} className="flex gap-3 text-xs items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.images[0] || '/images/pooja-kudai.jpg'}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-cream-200"
                          />
                          <div>
                            <p className="font-bold text-earth-950 line-clamp-1">{item.product.name}</p>
                            <p className="text-[11px] text-earth-500">
                              Qty: {item.quantity} • {item.product.knotType}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-earth-950 shrink-0">
                          {formatINR(price * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-cream-200 space-y-2 text-xs">
                  <div className="flex justify-between text-earth-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-earth-900">{formatINR(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-earth-600">
                    <span>Delivery Charge</span>
                    <span className="font-semibold text-emerald-700">
                      {shippingCharge === 0 ? 'FREE' : formatINR(shippingCharge)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-earth-950 pt-2 border-t border-cream-200">
                    <span>Grand Total</span>
                    <span>{formatINR(grandTotal)}</span>
                  </div>
                </div>

                {/* Primary WhatsApp Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-whatsapp-light hover:bg-whatsapp-dark text-white rounded-2xl font-bold text-sm tracking-wide shadow-premium hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{isSubmitting ? 'Generating Order...' : 'Order on WhatsApp (+91 93612 44779)'}</span>
                </button>

                <p className="text-[11px] text-center text-earth-500 leading-relaxed">
                  Clicking will open WhatsApp with your pre-formatted order slip and address details. Prema Handcraft will confirm order receipt immediately!
                </p>
              </div>

              {/* Trust Badge */}
              <div className="p-4 rounded-2xl bg-earth-900 text-cream-100 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-gold-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Genuine Handcrafted Guarantee</p>
                  <p className="text-cream-300 text-[11px]">Direct artisan pricing with zero middleman markup.</p>
                </div>
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
