import { useState } from 'react'
import { Eye, EyeOff, Package } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      /*
       * BACKEND CONNECTION:
       *
       * POST /api/auth/signup
       *
       * {
       *   name,
       *   email,
       *   password
       * }
       */

      await new Promise(resolve => setTimeout(resolve, 600))

      navigate('/login')
    } catch (err) {
      setError(err.message || 'Unable to create account.')
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
          <h2>Create your account</h2>
          <p>Get started with StockSense.</p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label className="form-label required">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label className="form-label required">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label required">
              Password
            </label>

            <div className="auth-password">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
              />

              <button
                type="button"
                className="auth-password-toggle"
                onClick={() =>
                  setShowPassword(prev => !prev)
                }
              >
                {showPassword
                  ? <EyeOff size={17} />
                  : <Eye size={17} />
                }
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label required">
              Confirm Password
            </label>

            <div className="auth-password">
              <input
                type={showConfirm ? 'text' : 'password'}
                className="form-control"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={e =>
                  setConfirmPassword(e.target.value)
                }
                autoComplete="new-password"
              />

              <button
                type="button"
                className="auth-password-toggle"
                onClick={() =>
                  setShowConfirm(prev => !prev)
                }
              >
                {showConfirm
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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login">
            Sign in
          </Link>
        </p>

      </div>

    </div>
  )
}