// StatusBadge — reusable status pill used across all tables
// statusMap: maps raw status strings to badge variant classes + labels

const STATUS_MAP = {
  // Stock states
  'In Stock':      { variant: 'success', label: 'In Stock' },
  'Low Stock':     { variant: 'warning', label: 'Low Stock' },
  'Critical':      { variant: 'danger',  label: 'Critical' },
  'Out of Stock':  { variant: 'danger',  label: 'Out of Stock' },
  // Operation states
  'Done':          { variant: 'success', label: 'Done' },
  'Ready':         { variant: 'info',    label: 'Ready' },
  'Waiting':       { variant: 'warning', label: 'Waiting' },
  'Draft':         { variant: 'neutral', label: 'Draft' },
  'Canceled':      { variant: 'neutral', label: 'Canceled' },
}

export default function StatusBadge({ status }) {
  const cfg = STATUS_MAP[status] || { variant: 'neutral', label: status }
  return (
    <span className={`badge badge-${cfg.variant}`} aria-label={`Status: ${cfg.label}`}>
      <span className="badge-dot" aria-hidden="true" />
      {cfg.label}
    </span>
  )
}
