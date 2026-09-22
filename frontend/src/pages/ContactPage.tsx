import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_DISPLAY, createWhatsAppUrl } from '../utils/whatsapp';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Order Enquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      showToast('Please fill in your name, phone, and message.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.submitContact(formData);
      setSubmitted(true);
      showToast('Thank you! Your message has been received.', 'success');
      setFormData({ name: '', phone: '', email: '', subject: 'Order Enquiry', message: '' });
    } catch (err: any) {
      showToast(err.message || 'Failed to send message. Please message us on WhatsApp!', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block">
            We Would Love to Hear From You
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-earth-950">
            Contact Prema Handcraft
          </h1>
          <p className="text-sm text-earth-600">
            Have a question about sizes, custom knot styles, delivery across India, or bulk wedding orders? Reach out directly via WhatsApp or message form.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Quick Contact Cards Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Priority Card */}
            <div className="bg-earth-900 text-white p-8 rounded-3xl shadow-premium border border-gold-600/30 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-whatsapp-light text-white flex items-center justify-center shadow">
                <MessageCircle className="w-6 h-6 fill-white" />
              </div>
              <h2 className="font-serif text-xl font-bold text-white">
                Fastest Response: WhatsApp
              </h2>
              <p className="text-xs text-cream-200 leading-relaxed">
                For instant quotes, sharing photo references of your desired basket, and immediate order tracking, chat with us on WhatsApp.
              </p>
              <div className="pt-2">
                <a
                  href={createWhatsAppUrl("Hello Prema Handcraft, I would like to get in touch with you.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 bg-whatsapp-light hover:bg-whatsapp-dark text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp: {WHATSAPP_DISPLAY}</span>
                </a>
              </div>
            </div>

            {/* Direct Phone & Details */}
            <div className="bg-white p-8 rounded-3xl border border-cream-200 shadow-soft space-y-6 text-xs text-earth-800">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-100 text-earth-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-earth-800" />
                </div>
                <div>
                  <h3 className="font-bold text-earth-950 text-sm">Direct Phone & WhatsApp</h3>
                  <p className="text-earth-600 mt-0.5">{WHATSAPP_DISPLAY}</p>
                  <a href="tel:+919361244779" className="text-gold-600 hover:underline font-semibold block mt-1">
                    Call Now →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-100 text-earth-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-earth-800" />
                </div>
                <div>
                  <h3 className="font-bold text-earth-950 text-sm">Artisan Workshop</h3>
                  <p className="text-earth-600 mt-0.5">Tamil Nadu, India</p>
                  <p className="text-earth-500 text-[11px]">Safe courier dispatch across all Indian states</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-100 text-earth-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-earth-800" />
                </div>
                <div>
                  <h3 className="font-bold text-earth-950 text-sm">Business Hours</h3>
                  <p className="text-earth-600 mt-0.5">Monday – Saturday: 9:00 AM – 8:00 PM</p>
                  <p className="text-earth-500 text-[11px]">WhatsApp inquiries welcome 24/7</p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-cream-200 shadow-soft space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-earth-950">
                Send Us an Online Inquiry
              </h2>
              <p className="text-xs text-earth-600 mt-1">
                Fill in your details below and our team will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-emerald-950">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you for reaching out to Prema Handcraft. We will review your message and contact you via phone or WhatsApp shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-emerald-700 text-white rounded-full text-xs font-bold shadow"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anusha Nair"
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                      Phone / WhatsApp Number *
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                    >
                      <option value="Order Enquiry">Order Enquiry</option>
                      <option value="Custom Design Request">Custom Design Request</option>
                      <option value="Bulk Wedding Hampers">Bulk Wedding Hampers</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-earth-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what product you are looking for, color choices, or delivery requirements..."
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl py-2.5 px-4 text-xs font-medium focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-earth-900 hover:bg-earth-800 text-white rounded-xl font-bold text-xs tracking-wider uppercase shadow-premium hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Submit Message to Prema Handcraft'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
