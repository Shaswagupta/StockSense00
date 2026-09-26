import { useState } from 'react'
import { ArrowLeft, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [step, setStep] = useState(1)

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }

    setLoading(true)

    try {
      /*
       * BACKEND:
       *
       * POST /api/auth/forgot-password
       *
       * {
       *   email
       * }
       */

      await new Promise(resolve => setTimeout(resolve, 600))

      setStep(2)
    } catch (err) {
      setError(err.message || 'Unable to send OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')

    if (otp.length !== 6) {
      setError('Please enter the 6-digit OTP.')
      return
    }

    setLoading(true)

    try {
      /*
       * BACKEND:
       *
       * POST /api/auth/verify-otp
       *
       * {
       *   email,
       *   otp
       * }
       */

      await new Promise(resolve => setTimeout(resolve, 600))

      setStep(3)
    } catch (err) {
      setError(err.message || 'Invalid OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')

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
       * BACKEND:
       *
       * POST /api/auth/reset-password
       *
       * {
       *   email,
       *   otp,
       *   password
       * }
       */

      await new Promise(resolve => setTimeout(resolve, 600))

      window.location.href = '/login'
    } catch (err) {
      setError(
        err.message || 'Unable to reset password.'
      )
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

        {step > 1 && (
          <button
            type="button"
            className="auth-back"
            onClick={() => {
              setError('')
              setStep(step - 1)
            }}
          >
            <ArrowLeft size={15} />
            Back
          </button>
        )}

        <div className="auth-heading">
          <h2>
            {step === 1 && 'Forgot password?'}
            {step === 2 && 'Verify OTP'}
            {step === 3 && 'Create new password'}
          </h2>

          <p>
            {step === 1 &&
              'Enter your email and we’ll send you a verification code.'}

            {step === 2 &&
              `Enter the 6-digit OTP sent to ${email}.`}

            {step === 3 &&
              'Choose a new password for your account.'}
          </p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOtp}>

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
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? 'Sending OTP...'
                : 'Send OTP'}
            </button>

          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>

            <div className="form-group">
              <label className="form-label required">
                Verification Code
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                className="form-control otp-input"
                placeholder="000000"
                value={otp}
                onChange={e =>
                  setOtp(
                    e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 6)
                  )
                }
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? 'Verifying...'
                : 'Verify OTP'}
            </button>

          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>

            <div className="form-group">
              <label className="form-label required">
                New Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label required">
                Confirm Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={e =>
                  setConfirmPassword(e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? 'Resetting...'
                : 'Reset Password'}
            </button>

          </form>
        )}

        <p className="auth-switch">
          Remember your password?{' '}
          <Link to="/login">
            Back to Sign In
          </Link>
        </p>

      </div>

    </div>
  )
}