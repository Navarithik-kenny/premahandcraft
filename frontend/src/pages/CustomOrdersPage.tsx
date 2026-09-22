import React, { useState } from 'react';
import { Sparkles, MessageCircle, CheckCircle2, Palette, Ruler, Package, Layers } from 'lucide-react';
import { getCustomOrderUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';
import { useToast } from '../context/ToastContext';

export const CustomOrdersPage: React.FC = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    basketType: 'Pooja Kudai',
    knotStyle: 'Biscuit Knot',
    primaryColor: 'Vermilion Red',
    secondaryColor: 'Golden Yellow',
    size: 'Medium (10 x 8 x 7 inches)',
    handleType: 'Reinforced Clear Tube Handle',
    quantity: 1,
    specialRequirements: ''
  });

  const basketTypes = ['Pooja Kudai', 'Office Lunch Bag', 'Market Shopping Basket', 'Modern Handbag / Tote', 'Wedding Gift & Hamper Baskets', 'Multipurpose Storage Basket'];
  const knotStyles = ['Biscuit Knot (Diamond Weave)', 'Normal Box Knot (Tight Classical)', 'Amla / Nellikai Knot (Floral Berry)', 'Sivan Kan (Sacred Eye Geometric)', 'Cross-Cut Lattice Weave'];
  const colorOptions = ['Vermilion Red', 'Turmeric Yellow', 'Emerald Green', 'Royal Blue', 'Pastel Peach', 'Ivory / Cream', 'Magenta Pink', 'Sunshine Orange', 'Metallic Copper / Gold', 'Lavender Violet', 'Deep Black', 'Dual-Tone Custom'];
  const sizeOptions = ['Small (Keepsake / Gift)', 'Medium (Pooja / Lunch Box)', 'Large (Grocery / Market Shopping)', 'Extra Large (Heavy Duty Storage)'];
  const handleOptions = ['Reinforced Clear Tube Handle', 'Woven Flat Double Wire Handle', 'Curved Arched Single Handle', 'Faux Pearl Beaded Handle'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.phone.trim()) {
      showToast('Please enter your name and phone number.', 'error');
      return;
    }

    const url = getCustomOrderUrl(formData);
    showToast('Opening WhatsApp to discuss your custom kudai...', 'success');
    window.open(url, '_blank');
  };

  return (
    <div className="py-12 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100 text-earth-900 text-xs font-bold tracking-wider uppercase border border-gold-300">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Artisan Custom Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-earth-950">
            Design Your Custom Wire Kudai
          </h1>
          <p className="text-sm sm:text-base text-earth-700 leading-relaxed">
            Can't find the exact size or color combination in our catalog? Our master artisans handcraft personalized wire baskets for weddings, pooja festivals, school/office lunch bags, and bulk corporate gifts.
          </p>
        </div>

        {/* Studio Form & Live Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Customizer Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-cream-200 shadow-soft space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-cream-200">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Sangeetha"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 93612 44779"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Basket Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-earth-700 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-earth-800" />
                  <span>1. Basket Purpose / Type</span>
                </label>
                <select
                  value={formData.basketType}
                  onChange={(e) => setFormData({ ...formData, basketType: e.target.value })}
                  className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                >
                  {basketTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Knot Weave */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-earth-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-earth-800" />
                  <span>2. Knot / Weaving Style</span>
                </label>
                <select
                  value={formData.knotStyle}
                  onChange={(e) => setFormData({ ...formData, knotStyle: e.target.value })}
                  className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                >
                  {knotStyles.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>

              {/* Wire Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-earth-700 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-earth-800" />
                    <span>3. Primary Wire Color</span>
                  </label>
                  <select
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  >
                    {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-earth-700 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-earth-800" />
                    <span>Secondary Wire Color</span>
                  </label>
                  <select
                    value={formData.secondaryColor}
                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  >
                    {colorOptions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Size & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-earth-700 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-earth-800" />
                    <span>4. Desired Size</span>
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  >
                    {sizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-earth-700">
                    5. Handle Type
                  </label>
                  <select
                    value={formData.handleType}
                    onChange={(e) => setFormData({ ...formData, handleType: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  >
                    {handleOptions.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-earth-700">
                  6. Quantity Needed (Single piece or Bulk / Wedding quantity)
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-full sm:w-40 bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                />
              </div>

              {/* Special Requirements */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-earth-700">
                  7. Special Details / Reference Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  placeholder="e.g. Need matching pooja bell ring, specific measurements for my lunch box, wedding date deadline, etc."
                  className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                />
              </div>

              {/* Submit to WhatsApp */}
              <button
                type="submit"
                className="w-full py-4 bg-whatsapp-light hover:bg-whatsapp-dark text-white rounded-2xl font-bold text-sm tracking-wide shadow-premium hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Discuss Your Custom Order on WhatsApp ({WHATSAPP_DISPLAY})</span>
              </button>

            </form>
          </div>

          {/* Live Preview & Guarantee Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-600">
                Live Specification Summary
              </span>
              <h2 className="font-serif text-xl font-bold text-earth-950">
                {formData.basketType || 'Custom Wire Kudai'}
              </h2>

              <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200 space-y-2.5 text-xs text-earth-800">
                <div className="flex justify-between">
                  <span className="text-earth-500">Weave Style:</span>
                  <span className="font-bold">{formData.knotStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-500">Colors:</span>
                  <span className="font-bold">{formData.primaryColor} + {formData.secondaryColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-500">Size:</span>
                  <span className="font-bold">{formData.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-500">Handle:</span>
                  <span className="font-bold">{formData.handleType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-500">Quantity:</span>
                  <span className="font-bold">{formData.quantity} unit(s)</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-earth-600 space-y-2">
                <p className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Handcrafted by skilled Tamil Nadu craftswomen</span>
                </p>
                <p className="flex items-center gap-2 text-earth-700">
                  <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Instant quote & photo samples sent on WhatsApp</span>
                </p>
                <p className="flex items-center gap-2 text-earth-700">
                  <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Special bulk discount on 10+ wedding hamper baskets</span>
                </p>
              </div>
            </div>

            {/* Artisan Photo Callout */}
            <div className="relative rounded-3xl overflow-hidden shadow-soft border border-cream-200">
              <img
                src="/images/weaving-process.jpg"
                alt="Artisan wire crafting"
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-950/80 via-earth-950/30 to-transparent p-6 flex flex-col justify-end text-white">
                <p className="text-xs font-bold text-gold-300">Prema Handcraft Artisans</p>
                <p className="text-sm font-serif font-bold">Woven with devotion, delivered with love.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
