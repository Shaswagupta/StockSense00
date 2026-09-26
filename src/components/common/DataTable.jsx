import { Package } from 'lucide-react'

// DataTable — generic table component reused across all pages
// columns: [{ key, label, render? }]
// rows: array of data objects
export default function DataTable({ columns, rows, emptyMessage = 'No data found.' }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="empty-state">
        <Package size={40} className="empty-state-icon" aria-hidden="true" />
        <p className="empty-state-title">Nothing here yet</p>
        <p className="empty-state-desc">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
