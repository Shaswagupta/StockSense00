import { useState, useMemo } from 'react'
import { Search, ShoppingCart, Truck, ArrowLeftRight, ClipboardList } from 'lucide-react'
import DataTable   from '../components/common/DataTable'
import StatusBadge from '../components/common/StatusBadge'
import Button      from '../components/common/Button'
import { moveHistory } from '../data/mockData'

const TYPE_ICONS = {
  Receipt:    { icon: ShoppingCart,  bg: 'var(--color-primary-bg)',  color: 'var(--color-primary)' },
  Delivery:   { icon: Truck,         bg: 'var(--color-secondary-bg)', color: 'var(--color-secondary)' },
  Transfer:   { icon: ArrowLeftRight, bg: '#ede9fe',                  color: '#7C3AED' },
  Adjustment: { icon: ClipboardList, bg: 'var(--color-warning-bg)',   color: '#B45309' },
}

const COLUMNS = [
  {
    key: 'type',
    label: 'Type',
    render: (v) => {
      const cfg = TYPE_ICONS[v] || {}
      const Icon = cfg.icon
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {Icon && <span style={{ background: cfg.bg, borderRadius: 4, width: 26, height: 26, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={13} color={cfg.color} aria-hidden="true" /></span>}
          <span style={{ fontWeight: 500 }}>{v}</span>
        </span>
      )
    },
  },
  { key: 'ref',       label: 'Reference',  render: (v) => <code style={{ fontSize: 11.5 }}>{v}</code> },
  { key: 'product',   label: 'Product' },
  { key: 'qty',       label: 'Qty',        render: (v) => <strong style={{ color: v?.toString().startsWith('-') ? 'var(--color-danger)' : v?.toString().startsWith('+') ? 'var(--color-success)' : 'var(--color-text-primary)' }}>{v}</strong> },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'status',    label: 'Status',     render: (v) => <StatusBadge status={v} /> },
  { key: 'date',      label: 'Date',       render: (v) => <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{v}</span> },
]

export default function MoveHistory() {
  const [search, setSearch] = useState('')
  const [type, setType]     = useState('All')
  const [status, setStatus] = useState('All')

  const filtered = useMemo(() => moveHistory.filter(r => {
    if (type   !== 'All' && r.type   !== type)   return false
    if (status !== 'All' && r.status !== status) return false
    if (search) {
      const h = [r.ref, r.product, r.type, r.warehouse].join(' ').toLowerCase()
      if (!h.includes(search.toLowerCase())) return false
    }
    return true
  }), [search, type, status])

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Move History</h2>
          <p className="page-subtitle">Full ledger of all stock movements</p>
        </div>
      </div>

      <div className="filter-bar" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
          <Search size={14} color="var(--color-text-secondary)" aria-hidden="true" />
          <input type="search" className="filter-input" placeholder="Search reference, product, type…" value={search} onChange={e => setSearch(e.target.value)} aria-label="Search move history" style={{ flex: 1 }} />
        </div>
        <select className="filter-select" value={type} onChange={e => setType(e.target.value)} aria-label="Filter by type">
          {['All','Receipt','Delivery','Transfer','Adjustment'].map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
        </select>
        <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)} aria-label="Filter by status">
          {['All','Draft','Waiting','Ready','Done','Canceled'].map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
        </select>
        <Button variant="ghost" size="sm" onClick={() => { setSearch(''); setType('All'); setStatus('All') }}>Clear</Button>
      </div>

      <div className="card">
        <DataTable columns={COLUMNS} rows={filtered} emptyMessage="No movements match the current filters." />
      </div>
    </div>
  )
}
