import bcrypt from 'bcryptjs';
import { IProduct, ICategory, IAdmin } from '../models/types';

export const INITIAL_CATEGORIES: ICategory[] = [
  {
    _id: 'cat_1',
    name: 'Pooja Baskets',
    slug: 'pooja-baskets',
    description: 'Sacred, colorful baskets crafted for temples, festive poojas, and flower offerings.',
    image: '/images/pooja-kudai.jpg',
    itemCount: 4
  },
  {
    _id: 'cat_2',
    name: 'Lunch Bags',
    slug: 'lunch-bags',
    description: 'Durable, stylish, and easily washable wire lunch bags for daily work and school.',
    image: '/images/lunch-kudai.jpg',
    itemCount: 6
  },
  {
    _id: 'cat_3',
    name: 'Market Baskets',
    slug: 'market-baskets',
    description: 'Heavy-duty eco-friendly grocery baskets that replace single-use plastic bags.',
    image: '/images/market-kudai.jpg',
    itemCount: 5
  },
  {
    _id: 'cat_4',
    name: 'Designer Totes',
    slug: 'designer-totes',
    description: 'Modern boutique style wire handbags featuring pearl handles and metallic weaves.',
    image: '/images/designer-tote.jpg',
    itemCount: 3
  },
  {
    _id: 'cat_5',
    name: 'Gift & Hamper Baskets',
    slug: 'gift-hamper-baskets',
    description: 'Cherished handmade mini baskets for weddings, return gifts, and festival sweets.',
    image: '/images/gift-kudai.jpg',
    itemCount: 8
  },
  {
    _id: 'cat_6',
    name: 'Custom Crafts',
    slug: 'custom-crafts',
    description: 'Personalized sizes, unique knot styles, and bespoke color combinations woven to order.',
    image: '/images/hero.jpg',
    itemCount: 12
  }
];

export const INITIAL_PRODUCTS: IProduct[] = [
  {
    _id: 'prod_1',
    name: 'Traditional South Indian Wire Pooja Kudai',
    slug: 'traditional-wire-pooja-kudai',
    description: 'Handwoven traditional South Indian wire pooja basket crafted with auspicious vermilion red, turmeric yellow, and rich golden plastic wire. Features an ergonomic reinforced curved handle, tight box knot weave, and spacious base. 100% washable and durable for temple visits, festive occasions, and daily pooja.',
    price: 499,
    discountPrice: 420,
    category: 'Pooja Baskets',
    images: ['/images/pooja-kudai.jpg', '/images/hero.jpg'],
    material: 'Virgin Grade High-Tensile Polyethylene Craft Wire',
    size: 'Medium (10 x 8 x 7 inches)',
    color: 'Red, Yellow & Gold',
    weight: '380g',
    knotType: 'Normal Box Knot',
    stock: 25,
    featured: true,
    popular: true,
    rating: 4.9,
    reviewsCount: 28,
    dimensions: {
      length: '10 inches',
      width: '8 inches',
      height: '7 inches'
    },
    createdAt: new Date('2026-01-10').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'prod_2',
    name: 'Pastel Biscuit Knot Wire Lunch Kudai',
    slug: 'pastel-biscuit-knot-wire-lunch-bag',
    description: 'Modern artisanal wire lunch bag handcrafted using the intricate Biscuit Knot technique. Designed with elegant pastel peach and ivory tones, clear transparent protective tubular handles, and brass bottom studs that prevent base wear. Perfect for office, college, and daily lunch box carrying.',
    price: 650,
    discountPrice: 549,
    category: 'Lunch Bags',
    images: ['/images/lunch-kudai.jpg', '/images/hero.jpg'],
    material: 'Washable Eco-Wire with Clear Acrylic Tube Handles',
    size: 'Compact Medium (11 x 5.5 x 9 inches)',
    color: 'Peach & Ivory Dual-Tone',
    weight: '420g',
    knotType: 'Biscuit Knot (Diamond 3D Weave)',
    stock: 18,
    featured: true,
    popular: true,
    rating: 5.0,
    reviewsCount: 34,
    dimensions: {
      length: '11 inches',
      width: '5.5 inches',
      height: '9 inches'
    },
    createdAt: new Date('2026-01-15').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'prod_3',
    name: 'Heavy-Duty Geometric Market Wire Shopping Basket',
    slug: 'heavy-duty-market-wire-shopping-basket',
    description: 'Extra-strong, spacious South Indian grocery and vegetable market wire basket. Woven with double-strand turquoise blue, emerald green, and golden yellow plastic wire in a geometric tribal pattern. Unbreakable, carries over 15kg easily, washable with soap and water.',
    price: 850,
    discountPrice: 720,
    category: 'Market Baskets',
    images: ['/images/market-kudai.jpg', '/images/hero.jpg'],
    material: 'Double Wire Heavy-Duty Virgin Plastic',
    size: 'Large (16 x 9 x 12 inches)',
    color: 'Turquoise, Emerald & Golden Yellow',
    weight: '650g',
    knotType: 'Double Box Knot',
    stock: 15,
    featured: true,
    popular: false,
    rating: 4.8,
    reviewsCount: 19,
    dimensions: {
      length: '16 inches',
      width: '9 inches',
      height: '12 inches'
    },
    createdAt: new Date('2026-01-20').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'prod_4',
    name: 'Boutique Handcrafted Designer Wire Tote with Pearl Handle',
    slug: 'designer-wire-tote-pearl-handle',
    description: 'Luxury artisan fashion wire tote woven with fine metallic copper, blush pink, and ivory wires. Accented with an exquisite polished faux pearl beaded handle. Combines traditional South Indian wire craft with modern contemporary chic. Lightweight yet sturdy.',
    price: 999,
    discountPrice: 849,
    category: 'Designer Totes',
    images: ['/images/designer-tote.jpg', '/images/hero.jpg'],
    material: 'Metallic Craft Wire with Polished Pearl Beads',
    size: 'Medium Tote (12 x 4.5 x 10 inches)',
    color: 'Blush Rose, Copper & Ivory',
    weight: '390g',
    knotType: 'Cross-Cut Lattice Weave',
    stock: 12,
    featured: true,
    popular: true,
    rating: 4.9,
    reviewsCount: 22,
    dimensions: {
      length: '12 inches',
      width: '4.5 inches',
      height: '10 inches'
    },
    createdAt: new Date('2026-02-01').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'prod_5',
    name: 'Festive Miniature Wire Kudai Gift & Hamper Baskets (Set of 2)',
    slug: 'festive-mini-wire-kudai-gift-hamper-baskets',
    description: 'Delightful pair of miniature handcrafted wire baskets finished with radiant gold satin ribbons. Designed for wedding return gifts, Diwali hampers, baby showers, and festive sweets distribution. Durable keepsake baskets that guests cherish for years.',
    price: 599,
    discountPrice: 499,
    category: 'Gift & Hamper Baskets',
    images: ['/images/gift-kudai.jpg', '/images/hero.jpg'],
    material: 'Glitter Finish Craft Wire with Satin Ribbon',
    size: 'Small (6 x 6 x 5 inches each)',
    color: 'Mango Yellow & Magenta Pink',
    weight: '240g',
    knotType: 'Amla (Gooseberry) Knot Weave',
    stock: 30,
    featured: false,
    popular: true,
    rating: 4.9,
    reviewsCount: 41,
    dimensions: {
      length: '6 inches',
      width: '6 inches',
      height: '5 inches'
    },
    createdAt: new Date('2026-02-10').toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: 'prod_6',
    name: 'Classic Sivan Kan Sacred Diamond Weave Wire Kudai',
    slug: 'classic-sivan-kan-diamond-wire-basket',
    description: "Authentic South Indian Sivan Kan (Lord Shiva's eye) pattern wire kudai. The sacred geometric eye pattern requires immense artisan skill and patience. Ideal for multipurpose storage, temple visits, and family gatherings.",
    price: 750,
    discountPrice: 629,
    category: 'Market Baskets',
    images: ['/images/hero.jpg', '/images/market-kudai.jpg'],
    material: 'High Quality Durable Plastic Wire',
    size: 'Medium-Large (14 x 7.5 x 11 inches)',
    color: 'Royal Blue & Sunshine Yellow',
    weight: '510g',
    knotType: 'Sivan Kan (Shiva Eye) Knot',
    stock: 8,
    featured: true,
    popular: false,
    rating: 4.8,
    reviewsCount: 15,
    dimensions: {
      length: '14 inches',
      width: '7.5 inches',
      height: '11 inches'
    },
    createdAt: new Date('2026-02-15').toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const getHashedPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

export const getInitialAdmin = (email: string, pass: string): IAdmin => {
  return {
    _id: 'admin_1',
    username: 'prema_admin',
    email: email.toLowerCase(),
    passwordHash: getHashedPassword(pass),
    role: 'admin',
    createdAt: new Date().toISOString()
  };
};
