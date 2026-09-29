import { useState } from 'react'
import {
  ResponsiveContainer, ComposedChart, Line, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { inventoryChartData } from '../../data/mockData'

// Custom tooltip
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 4,
      padding: '8px 12px',
      fontSize: 12,
    }}>
      <p style={{ fontWeight: 600, marginBottom: 4, color: 'var(--color-text-primary)' }}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color, margin: '2px 0' }}>
          {p.name}: <strong>{p.value >= 0 ? '+' : ''}{p.value}</strong>
        </p>
      ))}
    </div>
  )
}

export default function InventoryChart() {
  const [range, setRange] = useState('7d')
  const data = inventoryChartData[range]

  return (
    <div>
      <div className="card-header">
        <span className="card-title">Inventory Movement</span>
        <div className="tab-group" role="group" aria-label="Date range">
          {['7d', '30d'].map(r => (
            <button
              key={r}
              type="button"
              className={`tab-btn${range === r ? ' active' : ''}`}
              onClick={() => setRange(r)}
              aria-pressed={range === r}
            >
              {r === '7d' ? 'Last 7 days' : 'Last 30 days'}
            </button>
          ))}
        </div>
      </div>
      <div className="card-body">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
              />
              <Bar dataKey="incoming"    name="Incoming"    fill="#714B67" radius={[2,2,0,0]} maxBarSize={32} />
              <Bar dataKey="outgoing"    name="Outgoing"    fill="#017E84" radius={[2,2,0,0]} maxBarSize={32} />
              <Line
                type="monotone"
                dataKey="adjustments"
                name="Adjustments"
                stroke="#9CA3AF"
                strokeWidth={1.5}
                dot={{ r: 3, fill: '#9CA3AF' }}
                activeDot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
