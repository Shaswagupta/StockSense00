import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

// StatCard — KPI card on the Dashboard
// trendDir: 'up' | 'down' | 'neutral'
// accentColor: CSS color string for the icon background tint
export default function StatCard({
  icon: Icon,
  label,
  value,
  trendDir,
  trendText,
  accentColor = 'var(--color-primary)',
  accentBg = 'var(--color-primary-bg)',
  subText,
}) {
  const TrendIcon = trendDir === 'up' ? TrendingUp : trendDir === 'down' ? TrendingDown : Minus
  const trendColor = trendDir === 'up'
    ? 'var(--color-success)'
    : trendDir === 'down'
      ? 'var(--color-danger)'
      : 'var(--color-text-secondary)'

  return (
    <article className="stat-card" aria-label={`${label}: ${value}`}>
      <div className="stat-icon-wrap" style={{ background: accentBg }} aria-hidden="true">
        <Icon size={20} color={accentColor} strokeWidth={2} />
      </div>
      <div className="stat-info">
        <div className="stat-value">{value.toLocaleString()}</div>
        <div className="stat-label">{label}</div>
        {(trendText || subText) && (
          <div className="stat-trend" style={{ color: trendColor }}>
            {trendDir && <TrendIcon size={12} aria-hidden="true" />}
            <span style={{ color: trendDir ? trendColor : 'var(--color-text-secondary)', fontWeight: 500, fontSize: 11 }}>
              {trendText || subText}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
