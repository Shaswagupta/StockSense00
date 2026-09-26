import { useState } from 'react'
import { Eye, EyeOff, Package } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }

    if (!password) {
      setError('Please enter your password.')
      return
    }

    setLoading(true)

    try {
      /*
       * BACKEND CONNECTION
       *
       * Your teammate can replace this section with:
       *
       * const response = await fetch('/api/auth/login', {
       *   method: 'POST',
       *   headers: {
       *     'Content-Type': 'application/json',
       *   },
       *   body: JSON.stringify({
       *     email,
       *     password,
       *   }),
       * })
       *
       * const data = await response.json()
       *
       * if (!response.ok) {
       *   throw new Error(data.message || 'Login failed')
       * }
       *
       * localStorage.setItem('token', data.token)
       */

      // Temporary frontend demo login
      await new Promise(resolve => setTimeout(resolve, 600))

      localStorage.setItem('demoAuthenticated', 'true')

      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Unable to sign in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-brand">
          <div className="auth-logo">
            <Package size={22} />
          </div>

          <div>
            <h1>StockSense</h1>
            <p>Inventory Management System</p>
          </div>
        </div>

        <div className="auth-heading">
          <h2>Welcome back</h2>
          <p>Sign in to manage your inventory.</p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label
              htmlFor="login-email"
              className="form-label required"
            >
              Email
            </label>

            <input
              id="login-email"
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <div className="auth-label-row">
              <label
                htmlFor="login-password"
                className="form-label required"
              >
                Password
              </label>

              <Link to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <div className="auth-password">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="auth-password-toggle"
                onClick={() =>
                  setShowPassword(prev => !prev)
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword
                  ? <EyeOff size={17} />
                  : <Eye size={17} />
                }
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/signup">
            Create account
          </Link>
        </p>

      </div>

    </div>
  )
}