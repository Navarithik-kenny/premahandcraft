# PREMAHANDCRAFT — Handmade Wire Kudai & Handcrafted Bags

> **"Handcrafted With Love, Made For You."**  
> *"Tradition Woven Into Every Creation."*

A full-stack, production-grade e-commerce platform and brand identity built for **Prema Handcraft** (`PREMAHANDCRAFT`), celebrating South Indian handmade wire kudai (plastic wire baskets/bags), biscuit knot lunch bags, pooja baskets, market totes, and bespoke handcrafted creations.

---

## 🌟 Business & Brand Overview

- **Business Name**: Prema Handcraft
- **Website Branding**: `PREMAHANDCRAFT`
- **Business Type**: Handmade Wire Kudai, Handcrafted Bags & Traditional Woven Products
- **Primary WhatsApp**: **+91 93612 44779**
- **WhatsApp Link**: [https://wa.me/919361244779](https://wa.me/919361244779)
- **Tagline**: *"Handcrafted With Love, Made For You."*
- **Alternative Tagline**: *"Tradition Woven Into Every Creation."*
- **Design Aesthetic**: Premium handmade boutique identity inspired by natural handicrafts (warm cream, beige, earth brown, soft gold, deep brown, white) with authentic South Indian artisanal photography.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom handicraft tokens (cream, earth, gold, terracotta)
- **Icons**: Lucide React
- **Animations & Effects**: Smooth transitions, canvas confetti for order celebration
- **Mobile First**: 100% responsive across mobile (1-2 cols), tablet (2-3 cols), and desktop (3-4 cols)
- **SEO**: Dynamic title tags (`PREMAHANDCRAFT | Handmade Wire Kudai & Handcrafted Bags`), meta descriptions, OpenGraph tags, sitemap, and robots.txt

### Backend
- **Runtime**: Node.js + Express.js + TypeScript
- **Database**: MongoDB with Mongoose (with automated resilient file/in-memory fallback when mongod is offline)
- **Authentication**: JWT (JSON Web Tokens) + bcrypt password hashing
- **CORS & Security**: Configured for local development and production deployments

---

## 📱 WhatsApp Direct Commerce Integrations

Every user flow on the website connects directly to WhatsApp (**+91 93612 44779** / `https://wa.me/919361244779`):

1. **Floating WhatsApp Button**: Accessible across all pages with instant chat prompt.
2. **Product-Specific Enquiries**:
   ```
   Hello Prema Handcraft, I am interested in [PRODUCT NAME]. Please share the price and availability.
   ```
3. **Product Details Direct Order**:
   ```
   Hello Prema Handcraft, I would like to order the [PRODUCT NAME]. Please provide the details.
   ```
4. **Checkout Order Invoice Slip**:
   ```
   Hello Prema Handcraft,

   I would like to place an order.

   Customer: [NAME]
   Phone: [PHONE]

   Products:
   • [PRODUCT 1] (Qty: [QTY]) - ₹[PRICE]
   • [PRODUCT 2] (Qty: [QTY]) - ₹[PRICE]

   Total: ₹[TOTAL]

   Delivery Address:
   [STREET ADDRESS]
   [CITY], [STATE] - [PINCODE]

   Special Instructions:
   [NOTES]

   Please confirm my order and delivery details.
   ```
5. **Interactive Custom Kudai Designer**:
   Sends customer name, basket type, knot weave, primary/secondary colors, size, handle type, and quantity straight to WhatsApp for immediate quote.

---

## 🛡️ Admin Dashboard & Credentials

A protected admin dashboard is available at `/admin` (or via the Shield icon in the navigation and footer).

- **Admin Email**: `admin@premahandcraft.com`
- **Admin Password**: `Admin@Prema2026`

### Admin Capabilities:
- **Dashboard KPIs**: Live metrics for Total Revenue (₹), Total Orders, Pending Orders, and Low Stock Alerts.
- **Product Management (CRUD)**: Add new wire kudai with image URL, price, discount, dimensions, knot type, stock count, and featured/popular toggles; edit or delete products.
- **Order Management**: View customer name, phone, items ordered, delivery address, and update fulfillment status (`Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).
- **Category Management**: Add, edit, and organize product categories.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+ (tested on Node v24)
- npm v9+
- Optional: Local MongoDB or MongoDB Atlas URI (if not available, the backend automatically runs with persistent local storage)

### 1. Start the Backend API Server

```bash
cd backend
npm install
npm run dev
```

Backend will start on: **`http://localhost:5000`**

Health check:
```bash
curl http://localhost:5000/api/health
```

### 2. Start the Frontend Storefront

In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend will start on: **`http://localhost:5173`**

Open `http://localhost:5173` in your browser to browse the website.

---

## 📂 Project Structure

```
premahandcraft/
├── frontend/
│   ├── public/
│   │   ├── images/               # High-res authentic wire kudai photography
│   │   ├── robots.txt            # SEO crawler configuration
│   │   └── sitemap.xml           # Search engine sitemap
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Navbar, Footer, AnnouncementBar, FloatingWhatsApp
│   │   │   ├── home/             # Hero, Categories, WhyChooseUs, ProcessSection, Reviews, WhatsAppCTA
│   │   │   ├── product/          # ProductCard, ProductFilters, KnotGuide
│   │   │   └── cart/             # CartDrawer
│   │   ├── context/              # CartContext, AuthContext, ToastContext
│   │   ├── data/                 # Seed catalog data
│   │   ├── pages/                # Home, Shop, ProductDetail, Cart, Checkout, CustomOrders, About, Contact, Admin
│   │   ├── services/             # api.ts (REST API wrapper)
│   │   ├── utils/                # whatsapp.ts, formatters.ts
│   │   ├── App.tsx               # Main application router
│   │   └── main.tsx              # Application entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── config/               # db.ts, env.ts
│   │   ├── controllers/          # productController, categoryController, orderController, authController
│   │   ├── middleware/           # authMiddleware (JWT verification)
│   │   ├── models/               # Mongoose schemas & TypeScript types
│   │   ├── routes/               # apiRoutes.ts
│   │   ├── services/             # dataService.ts (unified MongoDB + persistent store)
│   │   ├── utils/                # seedData.ts, jwt.ts
│   │   └── server.ts             # Express server setup
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## 🚢 Production Deployment

### 1. Database (MongoDB Atlas)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and whitelist network access (`0.0.0.0/0`).
3. Copy the connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/premahandcraft?retryWrites=true&w=majority`.

### 2. Backend Deployment (Render / Railway / DigitalOcean)
1. Push this repository to GitHub.
2. Deploy the `backend/` directory as a Node web service.
3. Set environment variables:
   - `PORT=5000`
   - `MONGODB_URI=<your-atlas-connection-string>`
   - `JWT_SECRET=<strong-random-secret-key>`
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-frontend-domain.com`
   - `ADMIN_EMAIL=admin@premahandcraft.com`
   - `ADMIN_PASSWORD=Admin@Prema2026`
4. Build command: `npm run build`
5. Start command: `npm start`

### 3. Frontend Deployment (Vercel / Netlify)
1. Deploy the `frontend/` directory.
2. Set environment variables:
   - `VITE_API_BASE_URL=https://your-backend-domain.com/api`
   - `VITE_WHATSAPP_NUMBER=919361244779`
   - `VITE_BRAND_NAME=Prema Handcraft`
   - `VITE_SITE_NAME=PREMAHANDCRAFT`
3. Build command: `npm run build`
4. Output directory: `dist`

---

## 🧺 Kudai Care Instructions

- **100% Washable**: Wash with cool or lukewarm water and mild dish soap.
- **Sun/Air Dry**: Allow to air-dry for 15 minutes; non-absorbent wire repels water and prevents dampness.
- **Stain Resistant**: Oil, food, and vegetable stains wipe right off.
- **Heavy Load Bearing**: Reinforced double wire handles easily support 10–15+ kg of groceries or temple offerings.

---

© 2026 **PREMAHANDCRAFT** • Handcrafted With Love, Made For You.
