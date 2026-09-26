import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard'

import Login from './pages/login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'

import Products from './pages/Products'
import Receipts from './pages/Receipts'
import Deliveries from './pages/Deliveries'
import Transfers from './pages/Transfers'
import Adjustments from './pages/Adjustments'
import MoveHistory from './pages/MoveHistory'
import Warehouse from './pages/Warehouse'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            AUTHENTICATION ROUTES
            These are OUTSIDE AppLayout
            ===================================================== */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* =====================================================
            MAIN APPLICATION
            ===================================================== */}

        <Route path="/" element={<AppLayout />}>

          {/* Default page */}
          <Route
            index
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="products"
            element={<Products />}
          />

          <Route
            path="receipts"
            element={<Receipts />}
          />

          <Route
            path="deliveries"
            element={<Deliveries />}
          />

          <Route
            path="transfers"
            element={<Transfers />}
          />

          <Route
            path="adjustments"
            element={<Adjustments />}
          />

          <Route
            path="history"
            element={<MoveHistory />}
          />

          <Route
            path="warehouse"
            element={<Warehouse />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          {/* Catch-all */}
          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}