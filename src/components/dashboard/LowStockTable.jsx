import StatusBadge from '../common/StatusBadge'
import DataTable from '../common/DataTable'
import Button from '../common/Button'
import { AlertTriangle } from 'lucide-react'

const COLUMNS = [
  { key: 'name',         label: 'Product' },
  { key: 'sku',          label: 'SKU' },
  { key: 'category',     label: 'Category' },
  { key: 'warehouse',    label: 'Warehouse' },
  { key: 'stock',        label: 'Current Stock', render: (v) => <strong>{v}</strong> },
  { key: 'reorderLevel', label: 'Reorder Level' },
  { key: 'status',       label: 'Status', render: (v) => <StatusBadge status={v} /> },
  {
    key: 'id',
    label: 'Action',
    render: (_, row) => (
      <Button variant="secondary" size="sm" aria-label={`Reorder ${row.name}`}>
        Reorder
      </Button>
    ),
  },
]

export default function LowStockTable({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <AlertTriangle size={36} className="empty-state-icon" aria-hidden="true" />
        <p className="empty-state-title">No low-stock items right now</p>
        <p className="empty-state-desc">All products are above their reorder levels.</p>
      </div>
    )
  }

  return <DataTable columns={COLUMNS} rows={items} emptyMessage="No low-stock items match the current filters." />
}
