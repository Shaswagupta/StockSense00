import { useState } from 'react'
import { useTheme, THEME_OPTIONS, useDensity, DENSITY_OPTIONS } from '../context/ThemeContext'
import { Bell, Palette, Warehouse, Globe, CheckCircle2, AlertCircle, Save, RotateCcw } from 'lucide-react'
import Button from '../components/common/Button'

const INITIAL_SETTINGS = {
  companyName: 'StockSense Corp',
  timezone: 'Asia/Kolkata',
  currency: 'INR (₹)',
  defaultWarehouse: 'Main Warehouse',
  valuationMethod: 'FIFO',
  autoTransfer: true,
  lowStockEmail: true,
  dailyReport: false,
  threshold: '20',
  dateFormat: 'DD/MM/YYYY',
}

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const { density, setDensity } = useDensity()
  const [settings, setSettings] = useState(INITIAL_SETTINGS)
  const [savedSettings, setSavedSettings] = useState(INITIAL_SETTINGS)
  const [saveStatus, setSaveStatus] = useState(null) // 'saved' | null

  // Determine if there are unsaved changes (theme & density are excluded — they apply instantly via context)
  const hasChanges = JSON.stringify(settings) !== JSON.stringify(savedSettings)

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setSaveStatus(null)
  }

  const handleSave = () => {
    setSavedSettings(settings)
    setSaveStatus('saved')
    setTimeout(() => setSaveStatus(null), 3500)
  }

  const handleCancel = () => {
    setSettings(savedSettings)
    setSaveStatus(null)
  }

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', position: 'relative', minHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 className="page-title">Settings</h2>
          <p className="page-subtitle">Configure company preferences, warehouse defaults, notification channels, and UI appearance</p>
        </div>
        {saveStatus === 'saved' && (
          <div style={{
            background: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            padding: '6px 14px',
            borderRadius: 4,
            fontWeight: 500,
            fontSize: 12.5,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <CheckCircle2 size={15} /> All settings saved successfully!
          </div>
        )}
      </div>

      {/* Settings Grid — 2 Column balanced layout for density */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 20, marginBottom: 80 }}>
        {/* 1. General Settings */}
        <div className="card" id="settings-general">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 6, background: 'var(--color-primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={16} color="var(--color-primary)" aria-hidden="true" />
              </div>
              <div>
                <div className="card-title">General</div>
                <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)', marginTop: 1 }}>
                  Company profile, default locale, and currency format
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="s-company" className="form-label">Company Name</label>
                <input
                  id="s-company"
                  type="text"
                  className="form-control"
                  value={settings.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="s-tz" className="form-label">Timezone</label>
                  <select
                    id="s-tz"
                    className="form-control"
                    value={settings.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">UTC (GMT+0)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (BST)</option>
                    <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="s-currency" className="form-label">Currency</label>
                  <select
                    id="s-currency"
                    className="form-control"
                    value={settings.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                  >
                    <option value="INR (₹)">INR (₹)</option>
                    <option value="USD ($)">USD ($)</option>
                    <option value="EUR (€)">EUR (€)</option>
                    <option value="GBP (£)">GBP (£)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Warehouse Operations */}
        <div className="card" id="settings-warehouse">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 6, background: 'var(--color-secondary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Warehouse size={16} color="var(--color-secondary)" aria-hidden="true" />
              </div>
              <div>
                <div className="card-title">Warehouse & Valuation</div>
                <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)', marginTop: 1 }}>
                  Default fulfillment center and accounting methods
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="s-defwh" className="form-label">Default Warehouse</label>
                  <select
                    id="s-defwh"
                    className="form-control"
                    value={settings.defaultWarehouse}
                    onChange={(e) => handleChange('defaultWarehouse', e.target.value)}
                  >
                    <option value="Main Warehouse">Main Warehouse</option>
                    <option value="Warehouse 2">Warehouse 2</option>
                    <option value="Production Floor">Production Floor</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="s-valuation" className="form-label">Valuation Method</label>
                  <select
                    id="s-valuation"
                    className="form-control"
                    value={settings.valuationMethod}
                    onChange={(e) => handleChange('valuationMethod', e.target.value)}
                  >
                    <option value="FIFO">FIFO (First-In, First-Out)</option>
                    <option value="LIFO">LIFO (Last-In, First-Out)</option>
                    <option value="Average Cost">Average Cost Method</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>Automatic Transfer Routing</div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>Auto-generate transfer orders on low stock threshold</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoTransfer}
                  onChange={(e) => handleChange('autoTransfer', e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Notifications & Alerts */}
        <div className="card" id="settings-notifications">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 6, background: 'var(--color-warning-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={16} color="#B45309" aria-hidden="true" />
              </div>
              <div>
                <div className="card-title">Notifications & Triggers</div>
                <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)', marginTop: 1 }}>
                  Configure alert thresholds and automated digest emails
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>Low Stock Email Alerts</div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>Immediate notification when SKU crosses safety level</div>
                </div>
                <input
                  type="checkbox"
                  id="s-lowstock-email"
                  checked={settings.lowStockEmail}
                  onChange={(e) => handleChange('lowStockEmail', e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>Daily Inventory Digest</div>
                  <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)' }}>Daily morning summary of stock ins, outs, and variances</div>
                </div>
                <input
                  type="checkbox"
                  id="s-daily-report"
                  checked={settings.dailyReport}
                  onChange={(e) => handleChange('dailyReport', e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0, marginTop: 4 }}>
                <label htmlFor="s-threshold" className="form-label">Global Low Stock Threshold (%)</label>
                <input
                  id="s-threshold"
                  type="number"
                  className="form-control"
                  value={settings.threshold}
                  onChange={(e) => handleChange('threshold', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Appearance & Density */}
        <div className="card" id="settings-appearance">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 6, background: 'var(--color-primary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Palette size={16} color="var(--color-primary)" aria-hidden="true" />
              </div>
              <div>
                <div className="card-title">Appearance & Display</div>
                <div style={{ fontSize: 11.5, color: 'var(--color-text-secondary)', marginTop: 1 }}>
                  Interface theme, table density, and date formatting
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="s-theme" className="form-label">Theme Mode</label>
                  <select
                    id="s-theme"
                    className="form-control"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    {THEME_OPTIONS.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="s-density" className="form-label">Table Density</label>
                  <select
                    id="s-density"
                    className="form-control"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                  >
                    {DENSITY_OPTIONS.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="s-date-format" className="form-label">Date Format</label>
                <select
                  id="s-date-format"
                  className="form-control"
                  value={settings.dateFormat}
                  onChange={(e) => handleChange('dateFormat', e.target.value)}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY (26/09/2026)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (2026-09-26)</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY (09/26/2026)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky "Save Changes" Bottom Bar — Conditionally shown only when changes exist */}
      {hasChanges && (
        <div
          style={{
            position: 'sticky',
            bottom: 12,
            marginTop: 'auto',
            zIndex: 30,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            padding: '12px 20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            animation: 'fadeIn 0.2s ease-in-out',
          }}
          id="settings-save-bar"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#B45309', fontSize: 13, fontWeight: 500 }}>
              <AlertCircle size={16} />
              <span>You have unsaved changes</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleCancel}
              style={{ fontSize: 13 }}
            >
              <RotateCcw size={14} /> Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              style={{ fontSize: 13, minWidth: 120, justifyContent: 'center' }}
            >
              <Save size={14} /> Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}