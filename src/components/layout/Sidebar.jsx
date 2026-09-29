import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Package, Truck, ShoppingCart, ArrowLeftRight,
  ClipboardList, History, Warehouse, Settings, User, LogOut,
  ChevronDown, ChevronRight, Boxes, X,
} from 'lucide-react'
import { useState } from 'react'

// ── Nav items configuration ────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Products',  to: '/products',  icon: Package },
]

const OPERATIONS_ITEMS = [
  { label: 'Receipts',             to: '/receipts',    icon: ShoppingCart },
  { label: 'Delivery Orders',      to: '/deliveries',  icon: Truck },
  { label: 'Internal Transfers',   to: '/transfers',   icon: ArrowLeftRight },
  { label: 'Inventory Adjustments', to: '/adjustments', icon: ClipboardList },
  { label: 'Move History',         to: '/history',     icon: History },
]

const BOTTOM_ITEMS = [
  { label: 'Warehouse', to: '/warehouse', icon: Warehouse },
  { label: 'Settings',  to: '/settings',  icon: Settings },
  { label: 'Profile',   to: '/profile',   icon: User },
]

// ── Sidebar Component ──────────────────────────────────────────
export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  const location = useLocation()
  const [opsOpen, setOpsOpen] = useState(true)

  const isOpsActive = OPERATIONS_ITEMS.some(item => location.pathname === item.to)

  const NavItem = ({ item, sub = false }) => (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `nav-item${sub ? ' nav-sub-item' : ''}${isActive ? ' active' : ''}`
      }
      onClick={onCloseMobile}
      aria-current={location.pathname === item.to ? 'page' : undefined}
    >
      <item.icon size={sub ? 15 : 17} className="nav-item-icon" aria-hidden="true" />
      <span className="nav-item-label">{item.label}</span>
    </NavLink>
  )

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay${mobileOpen ? ' visible' : ''}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={`sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="sidebar-logo" style={{ justifyContent: collapsed ? 'center' : undefined }}>
          <div className="sidebar-logo-icon" aria-hidden="true">
            <Boxes size={18} />
          </div>
          {!collapsed && (
            <span className="sidebar-logo-text">
              Stock<span>Sense</span>
            </span>
          )}
          {/* Mobile close */}
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
            style={{
              display: mobileOpen ? 'flex' : 'none',
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-secondary)',
              alignItems: 'center',
              padding: 4,
              borderRadius: 4,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {/* Primary items */}
          {NAV_ITEMS.map(item => <NavItem key={item.to} item={item} />)}

          {/* Operations group */}
          {!collapsed && (
            <div className="nav-section-label">Operations</div>
          )}

          {collapsed ? (
            // In collapsed mode, show individual sub-icons directly
            OPERATIONS_ITEMS.map(item => <NavItem key={item.to} item={item} sub />)
          ) : (
            <>
              <button
                type="button"
                className={`nav-item${isOpsActive ? ' active' : ''}`}
                onClick={() => setOpsOpen(o => !o)}
                aria-expanded={opsOpen}
                aria-controls="ops-submenu"
              >
                <ClipboardList size={17} className="nav-item-icon" aria-hidden="true" />
                <span className="nav-item-label" style={{ flex: 1 }}>Operations</span>
                {opsOpen
                  ? <ChevronDown size={14} aria-hidden="true" />
                  : <ChevronRight size={14} aria-hidden="true" />
                }
              </button>
              {opsOpen && (
                <div id="ops-submenu" role="group">
                  {OPERATIONS_ITEMS.map(item => <NavItem key={item.to} item={item} sub />)}
                </div>
              )}
            </>
          )}
        </nav>

        {/* Bottom items */}
        <div className="sidebar-bottom">
          {BOTTOM_ITEMS.map(item => <NavItem key={item.to} item={item} />)}
          <button
            type="button"
            className="nav-item"
            onClick={() => alert('Logout — handled by Ankit')}
            aria-label="Log out"
          >
            <LogOut size={17} className="nav-item-icon" aria-hidden="true" />
            <span className="nav-item-label">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
