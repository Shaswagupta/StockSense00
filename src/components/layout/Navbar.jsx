import { useLocation } from 'react-router-dom'
import { Search, Bell, ChevronDown, Menu, PanelLeftClose, PanelLeft } from 'lucide-react'

// Maps route paths to breadcrumb labels
const ROUTE_LABELS = {
  '/dashboard':   'Inventory Dashboard',
  '/products':    'Products',
  '/receipts':    'Receipts',
  '/deliveries':  'Delivery Orders',
  '/transfers':   'Internal Transfers',
  '/adjustments': 'Inventory Adjustments',
  '/history':     'Move History',
  '/warehouse':   'Warehouses',
  '/settings':    'Settings',
  '/profile':     'My Profile',
}

export default function Navbar({ collapsed, onToggleCollapse, onOpenMobile }) {
  const location = useLocation()
  const title = ROUTE_LABELS[location.pathname] ?? 'StockSense'

  return (
    <header className="navbar" role="banner">
      <div className="navbar-left">
        {/* Desktop collapse toggle */}
        <button
          type="button"
          className="icon-btn hamburger-btn"
          style={{ display: 'flex' }}
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
        >
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>

        {/* Mobile hamburger — CSS toggles display */}
        <button
          type="button"
          className="icon-btn hamburger-btn"
          id="mobile-menu-btn"
          onClick={onOpenMobile}
          aria-label="Open navigation menu"
          style={{ display: 'none' }}
        >
          <Menu size={16} />
        </button>

        <h1 className="navbar-breadcrumb">{title}</h1>
      </div>

      <div className="navbar-right">
        {/* Search */}
        <div className="navbar-search" role="search">
          <Search size={14} color="var(--color-text-secondary)" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search products, SKU, orders..."
            aria-label="Global search"
            id="global-search"
          />
        </div>

        {/* Notifications */}
        <button type="button" className="icon-btn" aria-label="View notifications (3 unread)">
          <Bell size={16} />
          <span className="notification-dot" aria-hidden="true" />
        </button>

        {/* User menu */}
        <div className="user-menu" role="button" tabIndex={0} aria-label="Open user menu" aria-haspopup="menu">
          <div className="user-avatar" aria-hidden="true">AK</div>
          <span className="user-name">Ankit K.</span>
          <ChevronDown size={13} color="var(--color-text-secondary)" aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}
