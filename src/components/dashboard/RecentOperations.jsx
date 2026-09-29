import { ShoppingCart, Truck, ArrowLeftRight, ClipboardList } from 'lucide-react'
import StatusBadge from '../common/StatusBadge'
import DataTable from '../common/DataTable'

const TYPE_ICONS = {
  Receipt:    { icon: ShoppingCart, bg: 'var(--color-primary-bg)',   color: 'var(--color-primary)' },
  Delivery:   { icon: Truck,        bg: '#e6f5f6',                    color: 'var(--color-secondary)' },
  Transfer:   { icon: ArrowLeftRight, bg: '#f0fdf4',                  color: 'var(--color-success)' },
  Adjustment: { icon: ClipboardList, bg: 'var(--color-warning-bg)',   color: '#B45309' },
}

const COLUMNS = [
  {
    key: 'type',
    label: 'Operation',
    render: (v) => {
      const cfg = TYPE_ICONS[v] || {}
      const Icon = cfg.icon
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {Icon && (
            <span className="op-type-badge" style={{ background: cfg.bg }} aria-hidden="true">
              <Icon size={14} color={cfg.color} />
            </span>
          )}
          <span style={{ fontWeight: 500 }}>{v}</span>
        </div>
      )
    },
  },
  { key: 'ref',       label: 'Reference',  render: (v) => <code style={{ fontSize: 12, color: 'var(--color-primary)', background: 'var(--color-primary-bg)', padding: '1px 5px', borderRadius: 3 }}>{v}</code> },
  { key: 'product',   label: 'Product' },
  { key: 'qty',       label: 'Qty',        render: (v) => <strong style={{ color: v?.toString().startsWith('-') ? 'var(--color-danger)' : 'var(--color-success)' }}>{v}</strong> },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'status',    label: 'Status',     render: (v) => <StatusBadge status={v} /> },
  { key: 'date',      label: 'Date',       render: (v) => <span style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>{v}</span> },
]

export default function RecentOperations({ operations }) {
  return (
    <DataTable
      columns={COLUMNS}
      rows={operations}
      emptyMessage="No recent operations match the current filters."
    />
  )
}
