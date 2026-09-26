// ─────────────────────────────────────────────────────────────
// StockSense — Central Mock Data Store
// All mock data used across the app lives here, nowhere else.
// ─────────────────────────────────────────────────────────────

// ── Warehouses ────────────────────────────────────────────────
export const warehouses = [
  { id: 'wh1', name: 'Main Warehouse', location: 'Mumbai, MH', totalProducts: 1240, totalStock: 18450, lowStockCount: 14, capacity: 25000 },
  { id: 'wh2', name: 'Warehouse 2',    location: 'Pune, MH',   totalProducts: 780,  totalStock: 9200,  lowStockCount: 7,  capacity: 15000 },
  { id: 'wh3', name: 'Production Floor', location: 'Mumbai, MH', totalProducts: 430, totalStock: 3800, lowStockCount: 3, capacity: 8000 },
]

// ── Categories ────────────────────────────────────────────────
export const categories = ['Electronics', 'Hardware', 'Raw Materials', 'Finished Goods', 'Packaging']

// ── Units of Measure ─────────────────────────────────────────
export const units = ['pcs', 'kg', 'liters', 'meters', 'rolls', 'sets', 'boxes', 'pairs']

// ── Products ─────────────────────────────────────────────────
export const products = [
  { id: 'p01', name: 'Steel Rods',       sku: 'SKU-ST-001', category: 'Raw Materials',  unit: 'kg',   stock: 12,  warehouse: 'Main Warehouse', reorderLevel: 50,  status: 'Low Stock' },
  { id: 'p02', name: 'Industrial Bolts', sku: 'SKU-BL-014', category: 'Hardware',       unit: 'pcs',  stock: 38,  warehouse: 'Warehouse 2',    reorderLevel: 100, status: 'Low Stock' },
  { id: 'p03', name: 'Copper Wire',      sku: 'SKU-CW-032', category: 'Raw Materials',  unit: 'meters', stock: 0, warehouse: 'Main Warehouse', reorderLevel: 200, status: 'Out of Stock' },
  { id: 'p04', name: 'Bearing Set',      sku: 'SKU-BR-008', category: 'Hardware',       unit: 'sets', stock: 5,   warehouse: 'Production Floor', reorderLevel: 20, status: 'Critical' },
  { id: 'p05', name: 'Aluminium Sheets', sku: 'SKU-AS-021', category: 'Raw Materials',  unit: 'pcs',  stock: 25,  warehouse: 'Warehouse 2',    reorderLevel: 60,  status: 'Low Stock' },
  { id: 'p06', name: 'Office Chairs',    sku: 'SKU-OC-055', category: 'Finished Goods', unit: 'pcs',  stock: 148, warehouse: 'Main Warehouse', reorderLevel: 20,  status: 'In Stock' },
  { id: 'p07', name: 'Resistor Pack',    sku: 'SKU-RP-102', category: 'Electronics',    unit: 'pcs',  stock: 500, warehouse: 'Production Floor', reorderLevel: 100, status: 'In Stock' },
  { id: 'p08', name: 'HDMI Cables',      sku: 'SKU-HC-209', category: 'Electronics',    unit: 'pcs',  stock: 220, warehouse: 'Main Warehouse', reorderLevel: 50,  status: 'In Stock' },
  { id: 'p09', name: 'Foam Padding',     sku: 'SKU-FP-318', category: 'Packaging',      unit: 'rolls', stock: 0, warehouse: 'Warehouse 2',    reorderLevel: 10,  status: 'Out of Stock' },
  { id: 'p10', name: 'Motor Controller', sku: 'SKU-MC-401', category: 'Electronics',    unit: 'pcs',  stock: 87,  warehouse: 'Production Floor', reorderLevel: 15, status: 'In Stock' },
  { id: 'p11', name: 'Stainless Pipes',  sku: 'SKU-SP-512', category: 'Raw Materials',  unit: 'meters', stock: 310, warehouse: 'Main Warehouse', reorderLevel: 50, status: 'In Stock' },
  { id: 'p12', name: 'Safety Gloves',    sku: 'SKU-SG-608', category: 'Finished Goods', unit: 'pairs', stock: 72, warehouse: 'Warehouse 2', reorderLevel: 30, status: 'In Stock' },
]

// ── Low Stock Items (Dashboard table subset) ──────────────────
export const lowStockItems = products.filter(p =>
  ['Low Stock', 'Critical', 'Out of Stock'].includes(p.status)
)

// ── Receipts ─────────────────────────────────────────────────
export const receipts = [
  { id: 'r01', ref: 'REC-00124', supplier: 'Tata Steel Ltd',    product: 'Steel Rods',    qty: 50,   warehouse: 'Main Warehouse',  status: 'Done',    date: '2026-09-22' },
  { id: 'r02', ref: 'REC-00125', supplier: 'Reliance Hardware',  product: 'Industrial Bolts', qty: 200, warehouse: 'Warehouse 2', status: 'Waiting', date: '2026-09-23' },
  { id: 'r03', ref: 'REC-00126', supplier: 'Hindalco Industries', product: 'Aluminium Sheets', qty: 80, warehouse: 'Warehouse 2', status: 'Ready',   date: '2026-09-24' },
  { id: 'r04', ref: 'REC-00127', supplier: 'Copper Corp',        product: 'Copper Wire',   qty: 500,  warehouse: 'Main Warehouse',  status: 'Draft',   date: '2026-09-25' },
  { id: 'r05', ref: 'REC-00128', supplier: 'SKF Bearings',       product: 'Bearing Set',   qty: 30,   warehouse: 'Production Floor', status: 'Done',  date: '2026-09-21' },
  { id: 'r06', ref: 'REC-00129', supplier: 'PackagePro',         product: 'Foam Padding',  qty: 40,   warehouse: 'Warehouse 2',     status: 'Waiting', date: '2026-09-26' },
]

// ── Deliveries ────────────────────────────────────────────────
export const deliveries = [
  { id: 'd01', ref: 'DEL-00087', customer: 'Infosys Ltd',      product: 'Office Chairs',    qty: 10,  warehouse: 'Main Warehouse', status: 'Waiting', date: '2026-09-24' },
  { id: 'd02', ref: 'DEL-00088', customer: 'HCL Technologies', product: 'HDMI Cables',      qty: 50,  warehouse: 'Main Warehouse', status: 'Done',    date: '2026-09-22' },
  { id: 'd03', ref: 'DEL-00089', customer: 'Wipro Ltd',        product: 'Safety Gloves',    qty: 20,  warehouse: 'Warehouse 2',    status: 'Ready',   date: '2026-09-25' },
  { id: 'd04', ref: 'DEL-00090', customer: 'ABB India',        product: 'Motor Controller', qty: 5,   warehouse: 'Production Floor', status: 'Draft', date: '2026-09-26' },
  { id: 'd05', ref: 'DEL-00091', customer: 'L&T Construction', product: 'Stainless Pipes',  qty: 100, warehouse: 'Main Warehouse', status: 'Done',    date: '2026-09-20' },
]

// ── Internal Transfers ────────────────────────────────────────
export const transfers = [
  { id: 't01', ref: 'TRF-00031', product: 'Copper Wire',   qty: 100, from: 'Main Warehouse', to: 'Production Floor', status: 'Ready',   date: '2026-09-24' },
  { id: 't02', ref: 'TRF-00032', product: 'Bearing Set',   qty: 15,  from: 'Warehouse 2',    to: 'Production Floor', status: 'Draft',   date: '2026-09-25' },
  { id: 't03', ref: 'TRF-00033', product: 'Resistor Pack', qty: 200, from: 'Production Floor', to: 'Warehouse 2',    status: 'Done',    date: '2026-09-22' },
  { id: 't04', ref: 'TRF-00034', product: 'Steel Rods',    qty: 30,  from: 'Main Warehouse', to: 'Warehouse 2',      status: 'Waiting', date: '2026-09-26' },
  { id: 't05', ref: 'TRF-00035', product: 'Foam Padding',  qty: 20,  from: 'Warehouse 2',    to: 'Main Warehouse',   status: 'Canceled', date: '2026-09-21' },
]

// ── Inventory Adjustments ─────────────────────────────────────
export const adjustments = [
  { id: 'a01', ref: 'ADJ-00012', product: 'Steel Rods',       location: 'Main Warehouse', recorded: 15, physical: 12, diff: -3, reason: 'Physical Count', status: 'Done' },
  { id: 'a02', ref: 'ADJ-00013', product: 'Industrial Bolts', location: 'Warehouse 2',    recorded: 40, physical: 38, diff: -2, reason: 'Damage',        status: 'Done' },
  { id: 'a03', ref: 'ADJ-00014', product: 'Resistor Pack',    location: 'Production Floor', recorded: 490, physical: 500, diff: +10, reason: 'Recount',  status: 'Draft' },
  { id: 'a04', ref: 'ADJ-00015', product: 'Copper Wire',      location: 'Main Warehouse', recorded: 10, physical: 0,  diff: -10, reason: 'Loss',         status: 'Done' },
  { id: 'a05', ref: 'ADJ-00016', product: 'Safety Gloves',    location: 'Warehouse 2',    recorded: 70, physical: 72, diff: +2,  reason: 'Recount',      status: 'Draft' },
]

// ── Move History (combined ledger) ────────────────────────────
export const moveHistory = [
  { id: 'm01', type: 'Receipt',    ref: 'REC-00124', product: 'Steel Rods',       qty: '+50',  warehouse: 'Main Warehouse',  status: 'Done',    date: '2026-09-22' },
  { id: 'm02', type: 'Delivery',   ref: 'DEL-00087', product: 'Office Chairs',    qty: '-10',  warehouse: 'Main Warehouse',  status: 'Waiting', date: '2026-09-24' },
  { id: 'm03', type: 'Transfer',   ref: 'TRF-00031', product: 'Copper Wire',      qty: '100',  warehouse: 'WH1 → Production', status: 'Ready',  date: '2026-09-24' },
  { id: 'm04', type: 'Adjustment', ref: 'ADJ-00012', product: 'Steel Rods',       qty: '-3',   warehouse: 'Main Warehouse',  status: 'Done',    date: '2026-09-23' },
  { id: 'm05', type: 'Delivery',   ref: 'DEL-00088', product: 'HDMI Cables',      qty: '-50',  warehouse: 'Main Warehouse',  status: 'Done',    date: '2026-09-22' },
  { id: 'm06', type: 'Receipt',    ref: 'REC-00125', product: 'Industrial Bolts', qty: '+200', warehouse: 'Warehouse 2',     status: 'Waiting', date: '2026-09-23' },
  { id: 'm07', type: 'Transfer',   ref: 'TRF-00033', product: 'Resistor Pack',    qty: '200',  warehouse: 'Production → WH2', status: 'Done',  date: '2026-09-22' },
  { id: 'm08', type: 'Adjustment', ref: 'ADJ-00013', product: 'Industrial Bolts', qty: '-2',   warehouse: 'Warehouse 2',     status: 'Done',    date: '2026-09-22' },
  { id: 'm09', type: 'Delivery',   ref: 'DEL-00091', product: 'Stainless Pipes',  qty: '-100', warehouse: 'Main Warehouse',  status: 'Done',    date: '2026-09-20' },
  { id: 'm10', type: 'Receipt',    ref: 'REC-00128', product: 'Bearing Set',      qty: '+30',  warehouse: 'Production Floor', status: 'Done',   date: '2026-09-21' },
]

// ── Recent Operations (Dashboard subset) ─────────────────────
export const recentOperations = moveHistory.slice(0, 8)

// ── KPI Summary ───────────────────────────────────────────────
export const kpiData = {
  totalProducts: 2450,
  lowStockItems: 24,
  outOfStockItems: 7,
  pendingReceipts: 12,
  pendingDeliveries: 8,
  scheduledTransfers: 5,
}

// ── Inventory Movement Chart Data (last 30 days) ──────────────
export const inventoryChartData = {
  '7d': [
    { date: 'Sep 20', incoming: 80,  outgoing: 110, adjustments: -10 },
    { date: 'Sep 21', incoming: 50,  outgoing: 70,  adjustments: 0   },
    { date: 'Sep 22', incoming: 130, outgoing: 60,  adjustments: -5  },
    { date: 'Sep 23', incoming: 40,  outgoing: 90,  adjustments: -2  },
    { date: 'Sep 24', incoming: 100, outgoing: 50,  adjustments: 10  },
    { date: 'Sep 25', incoming: 70,  outgoing: 40,  adjustments: 0   },
    { date: 'Sep 26', incoming: 90,  outgoing: 75,  adjustments: -3  },
  ],
  '30d': [
    { date: 'Aug 28', incoming: 60,  outgoing: 80,  adjustments: 0   },
    { date: 'Aug 30', incoming: 90,  outgoing: 50,  adjustments: -5  },
    { date: 'Sep 01', incoming: 110, outgoing: 90,  adjustments: 0   },
    { date: 'Sep 03', incoming: 40,  outgoing: 60,  adjustments: -8  },
    { date: 'Sep 05', incoming: 130, outgoing: 100, adjustments: 2   },
    { date: 'Sep 07', incoming: 70,  outgoing: 40,  adjustments: 0   },
    { date: 'Sep 09', incoming: 85,  outgoing: 110, adjustments: -4  },
    { date: 'Sep 11', incoming: 50,  outgoing: 70,  adjustments: 0   },
    { date: 'Sep 13', incoming: 120, outgoing: 55,  adjustments: 6   },
    { date: 'Sep 15', incoming: 65,  outgoing: 95,  adjustments: -2  },
    { date: 'Sep 17', incoming: 80,  outgoing: 45,  adjustments: 0   },
    { date: 'Sep 19', incoming: 95,  outgoing: 85,  adjustments: -6  },
    { date: 'Sep 21', incoming: 50,  outgoing: 70,  adjustments: 0   },
    { date: 'Sep 23', incoming: 40,  outgoing: 90,  adjustments: -2  },
    { date: 'Sep 25', incoming: 70,  outgoing: 40,  adjustments: 0   },
    { date: 'Sep 26', incoming: 90,  outgoing: 75,  adjustments: -3  },
  ],
}
