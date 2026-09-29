import { useState, useMemo } from 'react'
import { Plus, Search, ArrowRight } from 'lucide-react'
import DataTable   from '../components/common/DataTable'
import StatusBadge from '../components/common/StatusBadge'
import Button      from '../components/common/Button'
import { transfers } from '../data/mockData'

const COLUMNS = [
  { key: 'ref',     label: 'Reference', render: (v) => <code style={{ fontSize: 11.5, color: '#7C3AED', background: '#ede9fe', padding: '1px 5px', borderRadius: 3 }}>{v}</code> },
  { key: 'product', label: 'Product',   render: (v) => <strong>{v}</strong> },
  { key: 'qty',     label: 'Quantity' },
  {
    key: 'from',
    label: 'Route',
    render: (v, row) => (
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
        <span>{v}</span>
        <ArrowRight size={12} color="var(--color-text-secondary)" aria-hidden="true" />
        <span>{row.to}</span>
      </span>
    ),
  },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  { key: 'date',   label: 'Date',   render: (v) => <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{v}</span> },
]

export default function Transfers() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const filtered = useMemo(() => transfers.filter(r => {
    if (status !== 'All' && r.status !== status) return false
    if (search) {
      const h = [r.ref, r.product, r.from, r.to].join(' ').toLowerCase()
      if (!h.includes(search.toLowerCase())) return false
    }
    return true
  }), [search, status])

  return (
    <div>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h2 className="page-title">Internal Transfers</h2>
            <p className="page-subtitle">Move stock between warehouses</p>
          </div>
          <Button variant="primary" id="new-transfer-btn"><Plus size={15} aria-hidden="true" /> New Transfer</Button>
        </div>
      </div>

      <div className="filter-bar" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
          <Search size={14} color="var(--color-text-secondary)" aria-hidden="true" />
          <input type="search" className="filter-input" placeholder="Search reference, product, route…" value={search} onChange={e => setSearch(e.target.value)} aria-label="Search transfers" style={{ flex: 1 }} />
        </div>
        <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)} aria-label="Filter by status">
          {['All','Draft','Waiting','Ready','Done','Canceled'].map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
        </select>
        <Button variant="ghost" size="sm" onClick={() => { setSearch(''); setStatus('All') }}>Clear</Button>
      </div>

      <div className="card">
        <DataTable columns={COLUMNS} rows={filtered} emptyMessage="No transfers match the current filters." />
      </div>
    </div>
  )
}
