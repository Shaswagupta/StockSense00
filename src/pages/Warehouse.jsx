import { useState } from 'react'
import { MapPin, Package, TrendingDown, Layers, Plus, Building2 } from 'lucide-react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { warehouses as initialWarehouses, moveHistory } from '../data/mockData'
import Modal from '../components/common/Modal'
import Button from '../components/common/Button'
import DataTable from '../components/common/DataTable'
import StatusBadge from '../components/common/StatusBadge'

// Chart color palette: Odoo primary, secondary teal, neutral gray, accent
const CHART_COLORS = ['#714B67', '#017E84', '#9CA3AF', '#D97706']

export default function Warehouse() {
  const [warehouseList, setWarehouseList] = useState(initialWarehouses)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState('All')

  // New warehouse form state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '10000',
  })

  // Calculate total stock and distribution data
  const totalStockAll = warehouseList.reduce((acc, wh) => acc + wh.totalStock, 0)
  const distributionData = warehouseList.map((wh) => ({
    name: wh.name,
    value: wh.totalStock,
    percentage: totalStockAll > 0 ? ((wh.totalStock / totalStockAll) * 100).toFixed(1) : 0,
    products: wh.totalProducts,
    capacity: wh.capacity,
  }))

  const handleAddWarehouse = (e) => {
    if (e) e.preventDefault()
    if (!formData.name || !formData.location) return

    const newWh = {
      id: `wh${warehouseList.length + 1}`,
      name: formData.name,
      location: formData.location,
      totalProducts: 0,
      totalStock: 0,
      lowStockCount: 0,
      capacity: parseInt(formData.capacity, 10) || 10000,
    }

    setWarehouseList([...warehouseList, newWh])
    setIsAddModalOpen(false)
    setFormData({ name: '', location: '', capacity: '10000' })
  }

  // Activity table columns
  const activityColumns = [
    {
      key: 'warehouse',
      label: 'Warehouse',
      render: (val) => (
        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {val}
        </span>
      ),
    },
    {
      key: 'type',
      label: 'Activity',
      render: (val) => {
        const badgeMap = {
          Receipt: 'success',
          Delivery: 'warning',
          Transfer: 'info',
          Adjustment: 'neutral',
        }
        return <StatusBadge status={val} variant={badgeMap[val] || 'neutral'} />
      },
    },
    {
      key: 'ref',
      label: 'Reference',
      render: (val, row) => (
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-primary)' }}>
            {val}
          </span>
          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginLeft: 8 }}>
            ({row.product} • {row.qty})
          </span>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (val) => (
        <span style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>{val}</span>
      ),
    },
  ]

  // Filtered recent activity
  const filteredActivity = selectedWarehouseFilter === 'All'
    ? moveHistory
    : moveHistory.filter(m => m.warehouse.toLowerCase().includes(selectedWarehouseFilter.toLowerCase()))

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 className="page-title">Warehouses</h2>
          <p className="page-subtitle">Manage and monitor all storage facilities, stock distribution, and location movements</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} id="add-wh-header-btn">
          <Plus size={15} aria-hidden="true" /> Add Warehouse
        </Button>
      </div>

      {/* 4-Card Grid: 3 Active Warehouses + 1 Add Warehouse Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        {warehouseList.map((wh) => {
          const capacityPct = Math.min(100, Math.round((wh.totalStock / wh.capacity) * 100))
          return (
            <article
              key={wh.id}
              className="card"
              style={{
                cursor: 'pointer',
                transition: 'all 0.15s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.08)'
                e.currentTarget.style.borderColor = 'var(--color-primary-light)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--color-border)'
              }}
              tabIndex={0}
              aria-label={`${wh.name} details`}
            >
              <div className="card-header" style={{ paddingBottom: 10 }}>
                <div>
                  <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Building2 size={16} color="var(--color-primary)" />
                    {wh.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    <MapPin size={12} aria-hidden="true" />
                    {wh.location}
                  </div>
                </div>
              </div>

              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { icon: Package, label: 'Products', value: wh.totalProducts.toLocaleString() },
                    { icon: Layers, label: 'Total Stock', value: wh.totalStock.toLocaleString() },
                    { icon: TrendingDown, label: 'Low Stock', value: wh.lowStockCount, danger: wh.lowStockCount > 0 },
                    { icon: Layers, label: 'Capacity', value: wh.capacity.toLocaleString() },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        padding: '8px 10px',
                        background: 'var(--color-bg)',
                        borderRadius: 4,
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <stat.icon size={11} aria-hidden="true" />
                        {stat.label}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: stat.danger ? 'var(--color-danger)' : 'var(--color-text-primary)' }}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Capacity bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--color-text-secondary)', marginBottom: 5 }}>
                    <span>Capacity Utilization</span>
                    <strong style={{ color: capacityPct > 80 ? 'var(--color-warning)' : 'var(--color-text-primary)' }}>
                      {capacityPct}% ({wh.totalStock.toLocaleString()} / {wh.capacity.toLocaleString()})
                    </strong>
                  </div>
                  <div style={{ height: 6, background: 'var(--color-border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${capacityPct}%`,
                        background: capacityPct > 80 ? 'var(--color-warning)' : 'var(--color-primary)',
                        borderRadius: 3,
                        transition: 'width 0.3s ease',
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </article>
          )
        })}

        {/* 4th Card: + Add Warehouse */}
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          style={{
            border: '2px dashed var(--color-border)',
            borderRadius: 6,
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            minHeight: 220,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            color: 'var(--color-text-secondary)',
            gap: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-primary)'
            e.currentTarget.style.color = 'var(--color-primary)'
            e.currentTarget.style.background = 'var(--color-primary-bg)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.color = 'var(--color-text-secondary)'
            e.currentTarget.style.background = 'transparent'
          }}
          aria-label="Add new warehouse"
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'var(--color-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--color-border)',
            }}
          >
            <Plus size={22} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>+ Add Warehouse</div>
            <div style={{ fontSize: 12, marginTop: 2, opacity: 0.8 }}>Create a new storage location or hub</div>
          </div>
        </button>
      </div>

      {/* Stock Distribution Section & Recent Activity Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) 1.5fr', gap: 16, marginBottom: 24 }}>
        {/* A) Stock Distribution Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <span className="card-title">Stock Distribution</span>
            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              Total: {totalStockAll.toLocaleString()} units
            </span>
          </div>
          <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ height: 210, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val, name) => [`${val.toLocaleString()} units`, name]}
                    contentStyle={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 4,
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    formatter={(val) => <span style={{ fontSize: 12, color: 'var(--color-text-primary)' }}>{val}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Warehouse Breakdown List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, borderTop: '1px solid var(--color-border)', paddingTop: 12 }}>
              {distributionData.map((d, i) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: CHART_COLORS[i % CHART_COLORS.length] }} />
                    <span style={{ fontWeight: 500 }}>{d.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 12, color: 'var(--color-text-secondary)' }}>
                    <span>{d.value.toLocaleString()} units</span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{d.percentage}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* B) Recent Warehouse Activity Table */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <span className="card-title">Recent Warehouse Activity</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <select
                className="filter-select"
                value={selectedWarehouseFilter}
                onChange={(e) => setSelectedWarehouseFilter(e.target.value)}
                style={{ fontSize: 12, padding: '3px 8px', minWidth: 140 }}
                aria-label="Filter activity by warehouse"
              >
                <option value="All">All Locations</option>
                {warehouseList.map((wh) => (
                  <option key={wh.id} value={wh.name}>{wh.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="card-body" style={{ padding: 0, flex: 1 }}>
            <DataTable
              columns={activityColumns}
              rows={filteredActivity.slice(0, 6)}
              emptyMessage="No activity recorded for this warehouse."
            />
          </div>
        </div>
      </div>

      {/* Add Warehouse Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Warehouse"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddWarehouse}>Create Warehouse</Button>
          </>
        }
      >
        <form onSubmit={handleAddWarehouse}>
          <div className="form-group">
            <label htmlFor="wh-name" className="form-label required">Warehouse Name</label>
            <input
              id="wh-name"
              type="text"
              className="form-control"
              placeholder="e.g. North Distribution Center"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="wh-location" className="form-label required">Location / Address</label>
            <input
              id="wh-location"
              type="text"
              className="form-control"
              placeholder="e.g. Bangalore, KA"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="wh-capacity" className="form-label">Total Storage Capacity (Units)</label>
            <input
              id="wh-capacity"
              type="number"
              className="form-control"
              placeholder="10000"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}
