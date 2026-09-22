import { CartItem, CustomOrderRequest, Product } from '../types';

export const WHATSAPP_PHONE = '919361244779';
export const WHATSAPP_DISPLAY = '+91 93612 44779';
export const BRAND_NAME = 'Prema Handcraft';

/**
 * Creates a raw WhatsApp URL with encoded message
 */
export const createWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};

/**
 * Product-specific enquiry
 * "Hello Prema Handcraft, I am interested in [PRODUCT NAME]. Please share the price and availability."
 */
export const getProductEnquiryUrl = (productName: string): string => {
  const message = `Hello ${BRAND_NAME}, I am interested in ${productName}. Please share the price and availability.`;
  return createWhatsAppUrl(message);
};

/**
 * Direct Order on WhatsApp for a single product
 * "Hello Prema Handcraft, I would like to order the [PRODUCT NAME]. Please provide the details."
 */
export const getProductOrderUrl = (product: Product, quantity = 1, options?: { color?: string; size?: string }): string => {
  const price = product.discountPrice || product.price;
  let message = `Hello ${BRAND_NAME},\n\nI would like to order the ${product.name}.\n`;
  message += `Quantity: ${quantity}\n`;
  message += `Price: ₹${price * quantity}\n`;
  if (options?.color) message += `Color: ${options.color}\n`;
  if (options?.size) message += `Size: ${options.size}\n`;
  message += `\nPlease provide the details and delivery availability.`;
  return createWhatsAppUrl(message);
};

/**
 * Checkout Order WhatsApp Invoice URL
 */
export const getCheckoutOrderUrl = (orderData: {
  customerName: string;
  phone: string;
  items: CartItem[];
  totalAmount: number;
  address: string;
  city: string;
  state?: string;
  pincode: string;
  specialInstructions?: string;
}): string => {
  let message = `Hello ${BRAND_NAME},\n\nI would like to place an order.\n\n`;
  message += `Customer: ${orderData.customerName}\n`;
  message += `Phone: ${orderData.phone}\n\n`;
  message += `Products:\n`;

  orderData.items.forEach(item => {
    const price = item.product.discountPrice || item.product.price;
    message += `• ${item.product.name} (Qty: ${item.quantity}) - ₹${price * item.quantity}\n`;
    if (item.selectedColor) message += `  Color: ${item.selectedColor}\n`;
  });

  message += `\nTotal: ₹${orderData.totalAmount}\n\n`;
  message += `Delivery Address:\n`;
  message += `${orderData.address}\n`;
  message += `${orderData.city}, ${orderData.state || 'Tamil Nadu'} - ${orderData.pincode}\n`;

  if (orderData.specialInstructions && orderData.specialInstructions.trim()) {
    message += `\nSpecial Instructions:\n${orderData.specialInstructions.trim()}\n`;
  }

  message += `\nPlease confirm my order and delivery details.`;

  return createWhatsAppUrl(message);
};

/**
 * Custom Kudai Order Request WhatsApp URL
 */
export const getCustomOrderUrl = (customData: CustomOrderRequest): string => {
  let message = `Hello ${BRAND_NAME},\n\nI would like to discuss a custom handmade wire kudai / bag:\n\n`;
  message += `Customer: ${customData.customerName}\n`;
  message += `Phone: ${customData.phone}\n`;
  message += `Basket Type: ${customData.basketType}\n`;
  message += `Knot Style: ${customData.knotStyle}\n`;
  message += `Colors: ${customData.primaryColor} + ${customData.secondaryColor}\n`;
  message += `Size: ${customData.size}\n`;
  message += `Handle Style: ${customData.handleType}\n`;
  message += `Quantity: ${customData.quantity}\n`;

  if (customData.specialRequirements && customData.specialRequirements.trim()) {
    message += `Requirements: ${customData.specialRequirements.trim()}\n`;
  }

  message += `\nPlease share the quote, making timeframe, and delivery options.`;

  return createWhatsAppUrl(message);
};

/**
 * General Contact WhatsApp URL
 */
export const getGeneralWhatsAppUrl = (): string => {
  const message = `Hello ${BRAND_NAME}, I would like to know more about your handmade wire kudai baskets and handcrafted collections.`;
  return createWhatsAppUrl(message);
};
