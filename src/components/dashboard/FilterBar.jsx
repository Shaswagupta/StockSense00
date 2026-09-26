import { Search, SlidersHorizontal, X } from 'lucide-react'
import Button from '../common/Button'

const DOCTYPE_OPTIONS  = ['All', 'Receipts', 'Delivery', 'Internal', 'Adjustments']
const STATUS_OPTIONS   = ['All', 'Draft', 'Waiting', 'Ready', 'Done', 'Canceled']
const WAREHOUSE_OPTIONS = ['All', 'Main Warehouse', 'Warehouse 2', 'Production Floor']
const CATEGORY_OPTIONS = ['All', 'Electronics', 'Hardware', 'Raw Materials', 'Finished Goods']

// FilterBar — filters on the Dashboard (actually filters displayed tables)
export default function FilterBar({ filters, onChange, onClear }) {
  const handleChange = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className="filter-bar" role="search" aria-label="Filter inventory data">
      <SlidersHorizontal size={15} color="var(--color-text-secondary)" aria-hidden="true" style={{ flexShrink: 0 }} />

      <select
        id="filter-doctype"
        className="filter-select"
        value={filters.docType}
        onChange={e => handleChange('docType', e.target.value)}
        aria-label="Filter by document type"
      >
        {DOCTYPE_OPTIONS.map(o => <option key={o} value={o}>{o === 'All' ? 'All Types' : o}</option>)}
      </select>

      <select
        id="filter-status"
        className="filter-select"
        value={filters.status}
        onChange={e => handleChange('status', e.target.value)}
        aria-label="Filter by status"
      >
        {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o === 'All' ? 'All Statuses' : o}</option>)}
      </select>

      <select
        id="filter-warehouse"
        className="filter-select"
        value={filters.warehouse}
        onChange={e => handleChange('warehouse', e.target.value)}
        aria-label="Filter by warehouse"
      >
        {WAREHOUSE_OPTIONS.map(o => <option key={o} value={o}>{o === 'All' ? 'All Warehouses' : o}</option>)}
      </select>

      <select
        id="filter-category"
        className="filter-select"
        value={filters.category}
        onChange={e => handleChange('category', e.target.value)}
        aria-label="Filter by category"
      >
        {CATEGORY_OPTIONS.map(o => <option key={o} value={o}>{o === 'All' ? 'All Categories' : o}</option>)}
      </select>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 160 }}>
        <Search size={13} color="var(--color-text-secondary)" aria-hidden="true" style={{ flexShrink: 0 }} />
        <input
          id="filter-search"
          type="search"
          className="filter-input"
          placeholder="Search product, SKU, reference…"
          value={filters.search}
          onChange={e => handleChange('search', e.target.value)}
          aria-label="Search"
          style={{ flex: 1 }}
        />
      </div>

      <div className="filter-actions">
        <Button variant="ghost" size="sm" onClick={onClear} aria-label="Clear all filters">
          <X size={13} aria-hidden="true" /> Clear
        </Button>
      </div>
    </div>
  )
}
