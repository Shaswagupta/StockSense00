import { Package } from 'lucide-react'

// EmptyState — shown when filtered results return nothing
export default function EmptyState({ icon: Icon = Package, title = 'No results', description = '', action }) {
  return (
    <div className="empty-state">
      <Icon size={42} className="empty-state-icon" aria-hidden="true" />
      <p className="empty-state-title">{title}</p>
      {description && <p className="empty-state-desc">{description}</p>}
      {action && <div style={{ marginTop: 12 }}>{action}</div>}
    </div>
  )
}
