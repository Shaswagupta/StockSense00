# StockSense — Inventory Management System (IMS)
Deployed link: ("https://stock-sense00-9vwu8c14j-shaswagupta.vercel.app/dashboard")

A modular Inventory Management System built for the **Odoo Hackathon**, designed to digitize and streamline stock-related operations for a business — replacing manual registers, Excel sheets, and scattered tracking with a centralized, real-time, easy-to-use app.

---

## 🎯 Problem Statement

Build an IMS that lets **Inventory Managers** and **Warehouse Staff** manage incoming/outgoing stock, transfers, adjustments, and multi-warehouse operations from a single dashboard — with dynamic filters, low-stock alerts, and a full movement ledger.

---

## 🧱 Tech Stack

- **React** (Vite)
- **Tailwind CSS v4** (CSS-first `@theme` config)
- **Recharts** — charts (inventory trends, stock distribution)
- **Lucide React** — icons
- No backend — fully mocked data layer (`src/data/mockData.js`), local component state only

---

## ✅ Features Implemented

### Dashboard
- KPI cards: Total Products, Low Stock, Out of Stock, Pending Receipts, Pending Deliveries, Scheduled Transfers
- Dynamic filters: document type, status, warehouse, category
- Inventory movement chart + Stock Health summary
- Low Stock Alerts table
- Recent Operations feed
- Quick Actions (Add Product, New Receipt, New Delivery, Internal Transfer, Stock Adjustment) via modal forms

### Products
- Full CRUD (Add / Edit / Delete)
- Fields: Name, SKU, Category, Unit of Measure, Stock, Reorder Level, Warehouse
- Auto-computed status (In Stock / Low Stock / Critical / Out of Stock)
- Search + category/warehouse filters

### Operations
- **Receipts** — incoming stock from suppliers, stock increases on validation
- **Delivery Orders** — outgoing stock to customers, stock decreases on validation
- **Internal Transfers** — move stock between warehouses with route view (From → To)
- **Inventory Adjustments** — reconcile recorded vs. physical count, auto-computed difference
- **Move History** — full ledger of every stock movement across all operation types

### Warehouse Management
- Per-warehouse cards: products, total stock, low stock count, capacity utilization bar
- Add new warehouse (name, location, capacity)
- Stock distribution pie chart across warehouses
- Recent warehouse activity table, filterable by location

### Settings
- Company profile, timezone, currency
- Default warehouse & valuation method (FIFO/LIFO/Average Cost)
- Notification toggles (low stock email, daily digest) + configurable threshold
- **Theme Mode** — Light / Dark / System (persisted via `localStorage`)
- **Table Density** — Compact / Comfortable / Spacious (applies live across all data tables)
- Date format preference

### Profile
- User identity card, account details, security & notification preferences
- Recent activity feed, monthly operational metrics

### UI/UX
- Consistent design system via CSS custom properties (`--color-*`, `--spacing-*`, `--radius-*`)
- Reusable `DataTable`, `Modal`, `Button`, `StatusBadge` components shared across all pages
- Status shown via icon + label + color (not color alone) for accessibility
- Responsive sidebar (collapsible on desktop, overlay drawer on mobile)
- Skeleton loaders and empty states for tables

---

## 🚧 Known Gaps / In Progress

- **Authentication** — signup/login and OTP-based password reset are not yet implemented (planned as a mocked flow, no real backend validation, per hackathon scope)
- Minor mobile polish pending on the sidebar drawer overlay

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── common/       # DataTable, Modal, Button, StatusBadge, EmptyState
│   └── dashboard/     # StatCard, FilterBar, InventoryChart, LowStockTable, RecentOperations
├── context/           # ThemeContext (theme + table density)
├── data/              # mockData.js — all mock records (products, receipts, deliveries, etc.)
├── pages/             # Dashboard, Products, Receipts, Deliveries, Transfers, Adjustments,
│                      # MoveHistory, Warehouse, Settings, Profile
├── App.jsx
├── main.jsx
└── index.css          # Design tokens, layout, component styles, dark theme + density overrides
```

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

---

## 📌 Scope Note

This build has **no backend** by design — all data is mocked and operations (create/edit/delete) persist only in local React state for the duration of the session. This was a deliberate hackathon-scope decision to focus on UI/UX and workflow completeness within the time available.
