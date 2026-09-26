import { useState, useMemo } from 'react'
import { Plus, Search } from 'lucide-react'
import DataTable   from '../components/common/DataTable'
import StatusBadge from '../components/common/StatusBadge'
import Button      from '../components/common/Button'
import { deliveries, warehouses } from '../data/mockData'

const COLUMNS = [
  { key: 'ref',       label: 'Reference',  render: (v) => <code style={{ fontSize: 11.5, color: 'var(--color-secondary)', background: 'var(--color-secondary-bg)', padding: '1px 5px', borderRadius: 3 }}>{v}</code> },
  { key: 'customer',  label: 'Customer',   render: (v) => <strong>{v}</strong> },
  { key: 'product',   label: 'Product' },
  { key: 'qty',       label: 'Quantity',   render: (v) => <strong style={{ color: 'var(--color-danger)' }}>-{v}</strong> },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'status',    label: 'Status',     render: (v) => <StatusBadge status={v} /> },
  { key: 'date',      label: 'Date',       render: (v) => <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{v}</span> },
]

export default function Deliveries() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [wh, setWh]         = useState('All')

  const filtered = useMemo(() => deliveries.filter(r => {
    if (status !== 'All' && r.status !== status) return false
    if (wh     !== 'All' && r.warehouse !== wh)  return false
    if (search) {
      const h = [r.ref, r.customer, r.product].join(' ').toLowerCase()
      if (!h.includes(search.toLowerCase())) return false
    }
    return true
  }), [search, status, wh])

  return (
    <div>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h2 className="page-title">Delivery Orders</h2>
            <p className="page-subtitle">Outgoing shipments to customers</p>
          </div>
          <Button variant="primary" id="new-delivery-btn"><Plus size={15} aria-hidden="true" /> New Delivery</Button>
        </div>
      </div>

      <div className="filter-bar" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
          <Search size={14} color="var(--color-text-secondary)" aria-hidden="true" />
          <input type="search" className="filter-input" placeholder="Search reference, customer, product…" value={search} onChange={e => setSearch(e.target.value)} aria-label="Search deliveries" style={{ flex: 1 }} />
        </div>
        <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)} aria-label="Filter by status">
          {['All','Draft','Waiting','Ready','Done','Canceled'].map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
        </select>
        <select className="filter-select" value={wh} onChange={e => setWh(e.target.value)} aria-label="Filter by warehouse">
          <option value="All">All Warehouses</option>
          {warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
        </select>
        <Button variant="ghost" size="sm" onClick={() => { setSearch(''); setStatus('All'); setWh('All') }}>Clear</Button>
      </div>

      <div className="card">
        <DataTable columns={COLUMNS} rows={filtered} emptyMessage="No deliveries match the current filters." />
      </div>
    </div>
  )
}
