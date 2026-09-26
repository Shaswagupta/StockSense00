import { useState, useMemo } from 'react'
import { Plus, Search } from 'lucide-react'
import DataTable   from '../components/common/DataTable'
import StatusBadge from '../components/common/StatusBadge'
import Button      from '../components/common/Button'
import { adjustments } from '../data/mockData'

const COLUMNS = [
  { key: 'ref',      label: 'Reference',   render: (v) => <code style={{ fontSize: 11.5, color: '#B45309', background: 'var(--color-warning-bg)', padding: '1px 5px', borderRadius: 3 }}>{v}</code> },
  { key: 'product',  label: 'Product',     render: (v) => <strong>{v}</strong> },
  { key: 'location', label: 'Location' },
  { key: 'recorded', label: 'Recorded Qty' },
  { key: 'physical', label: 'Physical Count' },
  { key: 'diff',     label: 'Difference',  render: (v) => <strong style={{ color: v >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>{v >= 0 ? '+' : ''}{v}</strong> },
  { key: 'reason',   label: 'Reason' },
  { key: 'status',   label: 'Status',      render: (v) => <StatusBadge status={v} /> },
]

export default function Adjustments() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const filtered = useMemo(() => adjustments.filter(r => {
    if (status !== 'All' && r.status !== status) return false
    if (search) {
      const h = [r.ref, r.product, r.location, r.reason].join(' ').toLowerCase()
      if (!h.includes(search.toLowerCase())) return false
    }
    return true
  }), [search, status])

  return (
    <div>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h2 className="page-title">Inventory Adjustments</h2>
            <p className="page-subtitle">Physical count reconciliation and stock corrections</p>
          </div>
          <Button variant="primary" id="new-adjustment-btn"><Plus size={15} aria-hidden="true" /> New Adjustment</Button>
        </div>
      </div>

      <div className="filter-bar" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
          <Search size={14} color="var(--color-text-secondary)" aria-hidden="true" />
          <input type="search" className="filter-input" placeholder="Search reference, product, reason…" value={search} onChange={e => setSearch(e.target.value)} aria-label="Search adjustments" style={{ flex: 1 }} />
        </div>
        <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)} aria-label="Filter by status">
          {['All','Draft','Done'].map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
        </select>
        <Button variant="ghost" size="sm" onClick={() => { setSearch(''); setStatus('All') }}>Clear</Button>
      </div>

      <div className="card">
        <DataTable columns={COLUMNS} rows={filtered} emptyMessage="No adjustments match the current filters." />
      </div>
    </div>
  )
}
