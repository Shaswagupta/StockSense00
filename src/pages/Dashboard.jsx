import { useState, useMemo, useEffect, useRef } from 'react'
import {
  Package, AlertTriangle, XCircle, Inbox, Send, ArrowLeftRight,
  ChevronDown,
} from 'lucide-react'

import StatCard          from '../components/dashboard/StatCard'
import FilterBar         from '../components/dashboard/FilterBar'
import InventoryChart    from '../components/dashboard/InventoryChart'
import LowStockTable     from '../components/dashboard/LowStockTable'
import RecentOperations  from '../components/dashboard/RecentOperations'
import Modal             from '../components/common/Modal'
import Button            from '../components/common/Button'

import {
  kpiData, lowStockItems, recentOperations,
} from '../data/mockData'


// ── Default filter state ───────────────────────────────────────
const DEFAULT_FILTERS = {
  docType: 'All',
  status: 'All',
  warehouse: 'All',
  category: 'All',
  search: '',
}


// ── Warehouse options ─────────────────────────────────────────
const WAREHOUSES = [
  'All',
  'Main Warehouse',
  'Warehouse 2',
  'Production Floor',
]


// ── Quick Action form configs ──────────────────────────────────
const QUICK_ACTIONS = [
  {
    id: 'add-product',
    label: '+ Add Product',
    title: 'Add New Product',
    fields: [
      {
        id: 'pa-name',
        label: 'Product Name',
        type: 'text',
        placeholder: 'e.g. Steel Rods',
        required: true,
      },
      {
        id: 'pa-sku',
        label: 'SKU / Code',
        type: 'text',
        placeholder: 'e.g. SKU-ST-001',
        required: true,
      },
      {
        id: 'pa-category',
        label: 'Category',
        type: 'select',
        options: [
          'Electronics',
          'Hardware',
          'Raw Materials',
          'Finished Goods',
          'Packaging',
        ],
        required: true,
      },
      {
        id: 'pa-unit',
        label: 'Unit of Measure',
        type: 'select',
        options: [
          'pcs',
          'kg',
          'liters',
          'meters',
          'rolls',
          'sets',
          'boxes',
          'pairs',
        ],
        required: true,
      },
      {
        id: 'pa-stock',
        label: 'Initial Stock',
        type: 'number',
        placeholder: '0',
        required: true,
      },
      {
        id: 'pa-reorder',
        label: 'Reorder Level',
        type: 'number',
        placeholder: '10',
        required: true,
      },
      {
        id: 'pa-warehouse',
        label: 'Warehouse',
        type: 'select',
        options: [
          'Main Warehouse',
          'Warehouse 2',
          'Production Floor',
        ],
        required: true,
      },
    ],
  },

  {
    id: 'new-receipt',
    label: '+ New Receipt',
    title: 'Create Receipt',
    fields: [
      {
        id: 'rc-supplier',
        label: 'Supplier',
        type: 'text',
        placeholder: 'Supplier name',
        required: true,
      },
      {
        id: 'rc-product',
        label: 'Product',
        type: 'text',
        placeholder: 'Product name',
        required: true,
      },
      {
        id: 'rc-qty',
        label: 'Quantity',
        type: 'number',
        placeholder: '0',
        required: true,
      },
      {
        id: 'rc-warehouse',
        label: 'Destination Warehouse',
        type: 'select',
        options: [
          'Main Warehouse',
          'Warehouse 2',
          'Production Floor',
        ],
        required: true,
      },
      {
        id: 'rc-date',
        label: 'Expected Date',
        type: 'date',
        required: false,
      },
    ],
  },

  {
    id: 'new-delivery',
    label: '+ New Delivery',
    title: 'Create Delivery Order',
    fields: [
      {
        id: 'dl-customer',
        label: 'Customer / Order Ref',
        type: 'text',
        placeholder: 'Customer name',
        required: true,
      },
      {
        id: 'dl-product',
        label: 'Product',
        type: 'text',
        placeholder: 'Product name',
        required: true,
      },
      {
        id: 'dl-qty',
        label: 'Quantity',
        type: 'number',
        placeholder: '0',
        required: true,
      },
      {
        id: 'dl-warehouse',
        label: 'Source Warehouse',
        type: 'select',
        options: [
          'Main Warehouse',
          'Warehouse 2',
          'Production Floor',
        ],
        required: true,
      },
      {
        id: 'dl-date',
        label: 'Scheduled Date',
        type: 'date',
        required: false,
      },
    ],
  },

  {
    id: 'new-transfer',
    label: '+ Internal Transfer',
    title: 'New Internal Transfer',
    fields: [
      {
        id: 'tr-product',
        label: 'Product',
        type: 'text',
        placeholder: 'Product name',
        required: true,
      },
      {
        id: 'tr-qty',
        label: 'Quantity',
        type: 'number',
        placeholder: '0',
        required: true,
      },
      {
        id: 'tr-from',
        label: 'From Warehouse',
        type: 'select',
        options: [
          'Main Warehouse',
          'Warehouse 2',
          'Production Floor',
        ],
        required: true,
      },
      {
        id: 'tr-to',
        label: 'To Warehouse',
        type: 'select',
        options: [
          'Main Warehouse',
          'Warehouse 2',
          'Production Floor',
        ],
        required: true,
      },
      {
        id: 'tr-date',
        label: 'Scheduled Date',
        type: 'date',
        required: false,
      },
    ],
  },

  {
    id: 'stock-adjustment',
    label: '+ Stock Adjustment',
    title: 'New Stock Adjustment',
    fields: [
      {
        id: 'adj-product',
        label: 'Product',
        type: 'text',
        placeholder: 'Product name',
        required: true,
      },
      {
        id: 'adj-location',
        label: 'Location',
        type: 'select',
        options: [
          'Main Warehouse',
          'Warehouse 2',
          'Production Floor',
        ],
        required: true,
      },
      {
        id: 'adj-recorded',
        label: 'Recorded Qty',
        type: 'number',
        placeholder: '0',
        required: true,
      },
      {
        id: 'adj-physical',
        label: 'Physical Count',
        type: 'number',
        placeholder: '0',
        required: true,
      },
      {
        id: 'adj-reason',
        label: 'Reason',
        type: 'select',
        options: [
          'Physical Count',
          'Damage',
          'Loss',
          'Recount',
          'Other',
        ],
        required: true,
      },
    ],
  },
]


// ── Generic Quick Action Form ──────────────────────────────────
function QuickActionForm({ actionConfig, onClose }) {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = (id, val) => {
    setValues(v => ({
      ...v,
      [id]: val,
    }))

    if (errors[id]) {
      setErrors(e => ({
        ...e,
        [id]: '',
      }))
    }
  }

  const validate = () => {
    const errs = {}

    actionConfig.fields.forEach(field => {
      if (field.required && !values[field.id]) {
        errs[field.id] = `${field.label} is required`
      }
    })

    return errs
  }

  const handleSubmit = () => {
    const errs = validate()

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    // No API — just close the modal (local state only)
    onClose()
  }

  return (
    <>
      <div>
        {actionConfig.fields.map(field => (
          <div className="form-group" key={field.id}>
            <label
              htmlFor={field.id}
              className={`form-label${field.required ? ' required' : ''}`}
            >
              {field.label}
            </label>

            {field.type === 'select' ? (
              <select
                id={field.id}
                className={`form-control${errors[field.id] ? ' error' : ''}`}
                value={values[field.id] || ''}
                onChange={e => handleChange(field.id, e.target.value)}
                aria-describedby={
                  errors[field.id]
                    ? `${field.id}-err`
                    : undefined
                }
                aria-required={field.required}
              >
                <option value="">
                  Select {field.label}…
                </option>

                {field.options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                type={field.type}
                className={`form-control${errors[field.id] ? ' error' : ''}`}
                placeholder={field.placeholder}
                value={values[field.id] || ''}
                onChange={e => handleChange(field.id, e.target.value)}
                aria-describedby={
                  errors[field.id]
                    ? `${field.id}-err`
                    : undefined
                }
                aria-required={field.required}
                min={field.type === 'number' ? 0 : undefined}
              />
            )}

            {errors[field.id] && (
              <p
                id={`${field.id}-err`}
                className="form-error"
                role="alert"
              >
                ⚠ {errors[field.id]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="modal-footer">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </>
  )
}


// ── Filtering logic ─────────────────────────────────────────────
function applyFilters(items, filters, type = 'stock') {
  return items.filter(item => {
    const search = filters.search.toLowerCase()

    // docType filter — map to operation type
    if (type === 'ops' && filters.docType !== 'All') {
      const typeMap = {
        Receipts: 'Receipt',
        Delivery: 'Delivery',
        Internal: 'Transfer',
        Adjustments: 'Adjustment',
      }

      if (item.type !== typeMap[filters.docType]) {
        return false
      }
    }

    // status filter
    if (
      filters.status !== 'All' &&
      item.status !== filters.status
    ) {
      return false
    }

    // warehouse filter
    if (filters.warehouse !== 'All') {
      const wh = item.warehouse || ''

      if (!wh.includes(filters.warehouse)) {
        return false
      }
    }

    // category filter
    if (
      type === 'stock' &&
      filters.category !== 'All' &&
      item.category !== filters.category
    ) {
      return false
    }

    // search
    if (search) {
      const haystack = [
        item.name,
        item.sku,
        item.ref,
        item.product,
        item.type,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      if (!haystack.includes(search)) {
        return false
      }
    }

    return true
  })
}


// ── Dashboard Page ─────────────────────────────────────────────
export default function Dashboard() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const [activeModal, setActiveModal] = useState(null)

  // Warehouse dropdown open/close state
  const [warehouseOpen, setWarehouseOpen] = useState(false)

  // Used to detect clicks outside the dropdown
  const warehouseRef = useRef(null)


  // ── Close warehouse dropdown when clicking outside ──
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        warehouseRef.current &&
        !warehouseRef.current.contains(event.target)
      ) {
        setWarehouseOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])


  // ── Filtered data ──
  const filteredStock = useMemo(
    () =>
      applyFilters(
        lowStockItems,
        filters,
        'stock'
      ),
    [filters]
  )

  const filteredOps = useMemo(
    () =>
      applyFilters(
        recentOperations,
        filters,
        'ops'
      ),
    [filters]
  )


  // ── Modal helpers ──
  const openModal = id => setActiveModal(id)

  const closeModal = () => setActiveModal(null)

  const activeAction = QUICK_ACTIONS.find(
    action => action.id === activeModal
  )


  // ── KPI Cards ──
  const KPI_CARDS = [
    {
      icon: Package,
      label: 'Total Products in Stock',
      value: kpiData.totalProducts,
      accentColor: 'var(--color-primary)',
      accentBg: 'var(--color-primary-bg)',
      trendDir: 'up',
      trendText: '+3.2% from last month',
    },

    {
      icon: AlertTriangle,
      label: 'Low Stock Items',
      value: kpiData.lowStockItems,
      accentColor: '#B45309',
      accentBg: 'var(--color-warning-bg)',
      trendDir: 'down',
      trendText: '↑ 6 since last week',
    },

    {
      icon: XCircle,
      label: 'Out of Stock Items',
      value: kpiData.outOfStockItems,
      accentColor: 'var(--color-danger)',
      accentBg: 'var(--color-danger-bg)',
      trendDir: 'neutral',
      trendText: 'Needs immediate reorder',
    },

    {
      icon: Inbox,
      label: 'Pending Receipts',
      value: kpiData.pendingReceipts,
      accentColor: 'var(--color-secondary)',
      accentBg: 'var(--color-secondary-bg)',
      trendDir: 'neutral',
      trendText: '3 arriving today',
    },

    {
      icon: Send,
      label: 'Pending Deliveries',
      value: kpiData.pendingDeliveries,
      accentColor: '#7C3AED',
      accentBg: '#ede9fe',
      trendDir: 'neutral',
      trendText: '2 overdue',
    },

    {
      icon: ArrowLeftRight,
      label: 'Scheduled Transfers',
      value: kpiData.scheduledTransfers,
      accentColor: 'var(--color-success)',
      accentBg: 'var(--color-success-bg)',
      trendDir: 'neutral',
      trendText: 'Internal movements',
    },
  ]


  return (
    <div>

      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-row">

          <div>
            <h2 className="page-title">
              Inventory Dashboard
            </h2>

            <p className="page-subtitle">
              Monitor your inventory and stock operations.
            </p>
          </div>


          {/* ── Warehouse + Month controls ── */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}
          >

            {/* ── Functional Warehouse Dropdown ── */}
            <div
              ref={warehouseRef}
              style={{
                position: 'relative',
              }}
            >

              <button
                type="button"
                className="warehouse-selector"
                aria-label="Select warehouse"
                aria-haspopup="listbox"
                aria-expanded={warehouseOpen}
                onClick={() =>
                  setWarehouseOpen(
                    previous => !previous
                  )
                }
              >
                <span>
                  {filters.warehouse === 'All'
                    ? 'All Warehouses'
                    : filters.warehouse}
                </span>

                <ChevronDown
                  size={13}
                  color="var(--color-text-secondary)"
                  aria-hidden="true"
                />
              </button>


              {/* ── Dropdown Menu ── */}
              {warehouseOpen && (
                <div
                  role="listbox"
                  aria-label="Warehouse options"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    minWidth: 200,
                    padding: 6,
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    zIndex: 1000,
                  }}
                >

                  {WAREHOUSES.map(warehouse => {
                    const isSelected =
                      filters.warehouse === warehouse

                    return (
                      <button
                        key={warehouse}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setFilters(previous => ({
                            ...previous,
                            warehouse,
                          }))

                          setWarehouseOpen(false)
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '9px 12px',
                          border: 'none',
                          borderRadius: 6,
                          background: isSelected
                            ? 'var(--color-primary-bg)'
                            : 'transparent',
                          color:
                            'var(--color-text-primary)',
                          cursor: 'pointer',
                          fontSize: 13,
                          textAlign: 'left',
                        }}
                      >
                        <span>
                          {warehouse === 'All'
                            ? 'All Warehouses'
                            : warehouse}
                        </span>

                        {isSelected && (
                          <span
                            style={{
                              color:
                                'var(--color-primary)',
                              fontWeight: 600,
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    )
                  })}

                </div>
              )}

            </div>


            {/* ── Month selector ── */}
            <Button
              variant="secondary"
              size="sm"
            >
              Sep 2026
            </Button>

          </div>

        </div>
      </div>


      {/* ── KPI Cards ── */}
      <section
        aria-label="Key performance indicators"
      >
        <div className="kpi-grid">

          {KPI_CARDS.map(card => (
            <StatCard
              key={card.label}
              {...card}
            />
          ))}

        </div>
      </section>


      {/* ── Filter Bar ── */}
      <FilterBar
        filters={filters}
        onChange={setFilters}
        onClear={() =>
          setFilters(DEFAULT_FILTERS)
        }
      />


      {/* ── Quick Actions ── */}
      <section
        aria-label="Quick actions"
        style={{ marginBottom: 20 }}
      >
        <div className="card">

          <div className="card-header">
            <span className="card-title">
              Quick Actions
            </span>
          </div>

          <div className="card-body">

            <div className="quick-actions">

              {QUICK_ACTIONS.map(action => (
                <Button
                  key={action.id}
                  variant="secondary"
                  onClick={() =>
                    openModal(action.id)
                  }
                  aria-haspopup="dialog"
                  id={`qa-${action.id}`}
                >
                  {action.label}
                </Button>
              ))}

            </div>

          </div>
        </div>
      </section>


      {/* ── Chart + Low Stock side-by-side ── */}
      <div className="dashboard-grid">

        {/* ── Inventory Chart ── */}
        <section
          aria-label="Inventory movement chart"
        >
          <div className="card">
            <InventoryChart />
          </div>
        </section>


        {/* ── Stock Health ── */}
        <section
          aria-label="Stock status summary"
        >
          <div
            className="card"
            style={{ height: '100%' }}
          >

            <div className="card-header">
              <span className="card-title">
                Stock Health
              </span>
            </div>

            <div className="card-body">

              {[
                {
                  label: 'In Stock',
                  count:
                    kpiData.totalProducts -
                    kpiData.lowStockItems -
                    kpiData.outOfStockItems,
                  variant: 'success',
                },

                {
                  label: 'Low Stock',
                  count: kpiData.lowStockItems,
                  variant: 'warning',
                },

                {
                  label: 'Out of Stock',
                  count: kpiData.outOfStockItems,
                  variant: 'danger',
                },
              ].map(stock => (

                <div
                  key={stock.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom:
                      '1px solid var(--color-border)',
                  }}
                >

                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 13,
                      color:
                        'var(--color-text-primary)',
                    }}
                  >

                    <span
                      className="badge-dot"
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background:
                          stock.variant === 'success'
                            ? 'var(--color-success)'
                            : stock.variant === 'warning'
                              ? 'var(--color-warning)'
                              : 'var(--color-danger)',
                        display: 'inline-block',
                      }}
                      aria-hidden="true"
                    />

                    {stock.label}

                  </span>


                  <strong
                    style={{
                      fontSize: 14,
                    }}
                  >
                    {stock.count.toLocaleString()}
                  </strong>

                </div>

              ))}


              <div
                style={{
                  marginTop: 16,
                }}
              >

                <div
                  style={{
                    height: 6,
                    borderRadius: 3,
                    background:
                      'var(--color-border)',
                    overflow: 'hidden',
                  }}
                >

                  <div
                    style={{
                      height: '100%',
                      background: `linear-gradient(
                        to right,
                        var(--color-success)
                        ${(
                          (
                            kpiData.totalProducts -
                            kpiData.lowStockItems -
                            kpiData.outOfStockItems
                          ) /
                          kpiData.totalProducts *
                          100
                        ).toFixed(0)}%,

                        var(--color-warning)
                        ${(
                          (
                            kpiData.totalProducts -
                            kpiData.lowStockItems -
                            kpiData.outOfStockItems
                          ) /
                          kpiData.totalProducts *
                          100
                        ).toFixed(0)}%
                        ${(
                          (
                            kpiData.totalProducts -
                            kpiData.outOfStockItems
                          ) /
                          kpiData.totalProducts *
                          100
                        ).toFixed(0)}%,

                        var(--color-danger)
                        ${(
                          (
                            kpiData.totalProducts -
                            kpiData.outOfStockItems
                          ) /
                          kpiData.totalProducts *
                          100
                        ).toFixed(0)}%
                      )`,
                      borderRadius: 3,
                    }}
                    aria-hidden="true"
                  />

                </div>


                <p
                  style={{
                    fontSize: 11,
                    color:
                      'var(--color-text-secondary)',
                    marginTop: 6,
                  }}
                >
                  {(
                    (
                      kpiData.totalProducts -
                      kpiData.lowStockItems -
                      kpiData.outOfStockItems
                    ) /
                    kpiData.totalProducts *
                    100
                  ).toFixed(1)}
                  % products healthy
                </p>

              </div>

            </div>
          </div>
        </section>

      </div>


      {/* ── Low Stock Alerts ── */}
      <section
        aria-label="Low stock alerts"
        className="dashboard-grid-full"
      >
        <div className="card">

          <div className="card-header">

            <span className="card-title">

              Low Stock Alerts

              {filteredStock.length > 0 && (
                <span
                  className="badge badge-danger"
                  style={{ marginLeft: 8 }}
                >
                  {filteredStock.length}
                </span>
              )}

            </span>

          </div>

          <LowStockTable
            items={filteredStock}
          />

        </div>
      </section>


      {/* ── Recent Operations ── */}
      <section
        aria-label="Recent operations"
        className="dashboard-grid-full"
      >
        <div className="card">

          <div className="card-header">

            <span className="card-title">
              Recent Operations
            </span>

            <Button
              variant="ghost"
              size="sm"
            >
              View all →
            </Button>

          </div>

          <RecentOperations
            operations={filteredOps}
          />

        </div>
      </section>


      {/* ── Quick Action Modals ── */}
      {activeAction && (
        <Modal
          isOpen={!!activeModal}
          onClose={closeModal}
          title={activeAction.title}
        >
          <QuickActionForm
            actionConfig={activeAction}
            onClose={closeModal}
          />
        </Modal>
      )}

    </div>
  )
}