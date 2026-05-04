# Zenith Market - E-Commerce Platform

Zenith Market is a modern, high-performance e-commerce platform built as an end-semester project. It features a curated minimalist storefront, a comprehensive administrative dashboard for catalog management, and a real-time shopping cart experience.

## 🚀 Features

### Core Storefront
- **Dynamic Product Discovery**: Browse a curated list of premium items with high-resolution imagery and detailed metadata.
- **Micro-interactions**: Smooth hover effects and entry animations powered by Framer Motion.
- **Inventory Awareness**: Real-time display of low-stock warnings (e.g., "Only 5 left").

### Product Management (CRUD)
- **Create**: Add new products to the catalog via a centralized modal interface.
- **Read**: View comprehensive product listings in a data-dense administrative grid.
- **Update**: Modify product details, pricing, and stock levels with instant UI updates.
- **Delete**: Safely remove discontinued items from the catalog with confirmation prompts.

### Shopping Experience
- **Interactive Bag**: Add/remove items and adjust quantities in a persistent shopping cart.
- **State Persistence**: Catalog and cart data are synchronized with `localStorage`, ensuring data survival across sessions.
- **Responsive Summary**: Real-time subtotal calculations and checkout flow simulation.

## 🛠️ Technical Stack

- **Framework**: React 19 (Functional Components & Hooks)
- **Styling**: Tailwind CSS (Utility-first, responsive design)
- **Routing**: React Router DOM (Declarative client-side routing)
- **Animations**: Framer Motion (Orchestrated UI transitions)
- **Icons**: Lucide React
- **Data Architecture**: Immutable state management with persistent LocalStorage synchronization.

## 📦 Project Structure

```text
/src
  ├── components/    # Modular UI elements
  ├── lib/           # Styling & merging utilities
  ├── types.ts       # Centralized TypeScript interfaces
  ├── constants.ts   # Initial seed data and global constants
  └── App.tsx        # Main application logic & routing
```

## 🛠️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Navigate to Zenith**:
   - Storefront: `http://localhost:3000/`
   - Admin Dashboard: `http://localhost:3000/admin`

---

*Developed for Academic Final Semester Project - 2024*
