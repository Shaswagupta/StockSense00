import { useState, useMemo } from 'react'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import StatusBadge  from '../components/common/StatusBadge'
import DataTable    from '../components/common/DataTable'
import Modal        from '../components/common/Modal'
import Button       from '../components/common/Button'
import { products as initialProducts, categories, units, warehouses } from '../data/mockData'

const COLUMNS = (onEdit, onDelete) => [
  { key: 'name',         label: 'Product',   render: (v) => <strong>{v}</strong> },
  { key: 'sku',          label: 'SKU',        render: (v) => <code style={{ fontSize: 11.5, color: 'var(--color-primary)', background: 'var(--color-primary-bg)', padding: '1px 5px', borderRadius: 3 }}>{v}</code> },
  { key: 'category',     label: 'Category' },
  { key: 'unit',         label: 'Unit' },
  { key: 'stock',        label: 'Stock',      render: (v) => <strong>{v}</strong> },
  { key: 'warehouse',    label: 'Warehouse' },
  { key: 'reorderLevel', label: 'Reorder Lvl' },
  { key: 'status',       label: 'Status',     render: (v) => <StatusBadge status={v} /> },
  {
    key: 'id',
    label: 'Actions',
    render: (_, row) => (
      <div style={{ display: 'flex', gap: 6 }}>
        <Button variant="secondary" size="sm" onClick={() => onEdit(row)} aria-label={`Edit ${row.name}`}>
          <Pencil size={13} aria-hidden="true" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(row.id)} aria-label={`Delete ${row.name}`}
          style={{ color: 'var(--color-danger)' }}>
          <Trash2 size={13} aria-hidden="true" />
        </Button>
      </div>
    ),
  },
]

const EMPTY_FORM = { name: '', sku: '', category: '', unit: '', stock: '', reorderLevel: '', warehouse: '' }

function computeStatus(stock, reorderLevel) {
  const s = Number(stock), r = Number(reorderLevel)
  if (s === 0) return 'Out of Stock'
  if (s <= r * 0.25) return 'Critical'
  if (s <= r) return 'Low Stock'
  return 'In Stock'
}

export default function Products() {
  const [rows, setRows]           = useState(initialProducts)
  const [search, setSearch]       = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [whFilter, setWhFilter]   = useState('All')
  const [modal, setModal]         = useState(null) // 'add' | 'edit'
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm]           = useState(EMPTY_FORM)
  const [errors, setErrors]       = useState({})

  const filteredRows = useMemo(() => rows.filter(r => {
    if (catFilter !== 'All' && r.category !== catFilter) return false
    if (whFilter  !== 'All' && r.warehouse !== whFilter)  return false
    if (search) {
      const h = [r.name, r.sku, r.category].join(' ').toLowerCase()
      if (!h.includes(search.toLowerCase())) return false
    }
    return true
  }), [rows, search, catFilter, whFilter])

  const openAdd  = () => { setForm(EMPTY_FORM); setErrors({}); setModal('add') }
  const openEdit = (row) => {
    setEditTarget(row)
    setForm({ name: row.name, sku: row.sku, category: row.category, unit: row.unit, stock: row.stock, reorderLevel: row.reorderLevel, warehouse: row.warehouse })
    setErrors({})
    setModal('edit')
  }
  const closeModal = () => { setModal(null); setEditTarget(null) }

  const validate = () => {
    const e = {}
    if (!form.name.trim())           e.name = 'Product name is required'
    if (!form.sku.trim())            e.sku = 'SKU is required'
    if (!form.category)              e.category = 'Category is required'
    if (!form.unit)                  e.unit = 'Unit is required'
    if (form.stock === '' || isNaN(Number(form.stock))) e.stock = 'Stock must be a valid number'
    if (form.reorderLevel === '' || isNaN(Number(form.reorderLevel))) e.reorderLevel = 'Reorder level must be a valid number'
    if (!form.warehouse)             e.warehouse = 'Warehouse is required'
    return e
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }

    const status = computeStatus(form.stock, form.reorderLevel)

    if (modal === 'add') {
      const newProduct = { ...form, id: `p${Date.now()}`, stock: Number(form.stock), reorderLevel: Number(form.reorderLevel), status }
      setRows(r => [...r, newProduct])
    } else if (modal === 'edit' && editTarget) {
      setRows(r => r.map(p => p.id === editTarget.id
        ? { ...p, ...form, stock: Number(form.stock), reorderLevel: Number(form.reorderLevel), status }
        : p
      ))
    }
    closeModal()
  }

  const handleDelete = (id) => {
    if (!window.confirm('Delete this product?')) return
    setRows(r => r.filter(p => p.id !== id))
  }

  const handleField = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h2 className="page-title">Products</h2>
            <p className="page-subtitle">{rows.length} products across all warehouses</p>
          </div>
          <Button variant="primary" onClick={openAdd} id="add-product-btn" aria-haspopup="dialog">
            <Plus size={15} aria-hidden="true" /> Add Product
          </Button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="filter-bar" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 180 }}>
          <Search size={14} color="var(--color-text-secondary)" aria-hidden="true" />
          <input
            id="products-search"
            type="search"
            className="filter-input"
            placeholder="Search product, SKU…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search products"
            style={{ flex: 1 }}
          />
        </div>
        <select id="products-cat" className="filter-select" value={catFilter} onChange={e => setCatFilter(e.target.value)} aria-label="Filter by category">
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select id="products-wh" className="filter-select" value={whFilter} onChange={e => setWhFilter(e.target.value)} aria-label="Filter by warehouse">
          <option value="All">All Warehouses</option>
          {warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
        </select>
        <Button variant="ghost" size="sm" onClick={() => { setSearch(''); setCatFilter('All'); setWhFilter('All') }}>Clear</Button>
      </div>

      {/* Table */}
      <div className="card">
        <DataTable
          columns={COLUMNS(openEdit, handleDelete)}
          rows={filteredRows}
          emptyMessage="No products match the current filters."
        />
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={!!modal}
        onClose={closeModal}
        title={modal === 'add' ? 'Add New Product' : 'Edit Product'}
        footer={
          <>
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save Product</Button>
          </>
        }
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="p-name" className="form-label required">Product Name</label>
            <input id="p-name" type="text" className={`form-control${errors.name ? ' error' : ''}`} placeholder="e.g. Steel Rods" value={form.name} onChange={e => handleField('name', e.target.value)} aria-required="true" aria-describedby={errors.name ? 'p-name-err' : undefined} />
            {errors.name && <p id="p-name-err" className="form-error" role="alert">⚠ {errors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="p-sku" className="form-label required">SKU / Code</label>
            <input id="p-sku" type="text" className={`form-control${errors.sku ? ' error' : ''}`} placeholder="e.g. SKU-ST-001" value={form.sku} onChange={e => handleField('sku', e.target.value)} aria-required="true" aria-describedby={errors.sku ? 'p-sku-err' : undefined} />
            {errors.sku && <p id="p-sku-err" className="form-error" role="alert">⚠ {errors.sku}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="p-cat" className="form-label required">Category</label>
            <select id="p-cat" className={`form-control${errors.category ? ' error' : ''}`} value={form.category} onChange={e => handleField('category', e.target.value)} aria-required="true">
              <option value="">Select…</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="form-error" role="alert">⚠ {errors.category}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="p-unit" className="form-label required">Unit of Measure</label>
            <select id="p-unit" className={`form-control${errors.unit ? ' error' : ''}`} value={form.unit} onChange={e => handleField('unit', e.target.value)} aria-required="true">
              <option value="">Select…</option>
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            {errors.unit && <p className="form-error" role="alert">⚠ {errors.unit}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="p-stock" className="form-label required">Initial Stock</label>
            <input id="p-stock" type="number" min="0" className={`form-control${errors.stock ? ' error' : ''}`} placeholder="0" value={form.stock} onChange={e => handleField('stock', e.target.value)} aria-required="true" />
            {errors.stock && <p className="form-error" role="alert">⚠ {errors.stock}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="p-reorder" className="form-label required">Reorder Level</label>
            <input id="p-reorder" type="number" min="0" className={`form-control${errors.reorderLevel ? ' error' : ''}`} placeholder="10" value={form.reorderLevel} onChange={e => handleField('reorderLevel', e.target.value)} aria-required="true" />
            {errors.reorderLevel && <p className="form-error" role="alert">⚠ {errors.reorderLevel}</p>}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="p-wh" className="form-label required">Warehouse</label>
          <select id="p-wh" className={`form-control${errors.warehouse ? ' error' : ''}`} value={form.warehouse} onChange={e => handleField('warehouse', e.target.value)} aria-required="true">
            <option value="">Select…</option>
            {warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
          </select>
          {errors.warehouse && <p className="form-error" role="alert">⚠ {errors.warehouse}</p>}
        </div>
      </Modal>
    </div>
  )
}
