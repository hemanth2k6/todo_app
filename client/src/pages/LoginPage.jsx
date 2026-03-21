import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import api from '../services/api'

function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const fromPath = location.state?.from || '/dashboard'

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleChange = (event) => {
    if (error) setError('')
    if (fieldErrors[event.target.name]) {
      setFieldErrors((prev) => ({ ...prev, [event.target.name]: '' }))
    }
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setFieldErrors({})

    const nextFieldErrors = {}
    const email = form.email.trim().toLowerCase()
    const password = form.password

    if (!email) {
      nextFieldErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextFieldErrors.email = 'Please enter a valid email address.'
    }

    if (!password) {
      nextFieldErrors.password = 'Password is required.'
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors)
      setError('Please fix the highlighted fields and try again.')
      return
    }

    try {
      setLoading(true)
      const response = await api.post('/auth/login', { email, password })
      login(response.data)
      navigate(fromPath, { replace: true })
    } catch (apiError) {
      if (apiError.response?.status === 401) {
        setError('Invalid email or password. Please check and try again.')
      } else {
        setError(apiError.response?.data?.message || 'Unable to sign in right now.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <form className="card auth-form" onSubmit={handleSubmit}>
        <h2>Welcome back</h2>
        <p className="muted-text">Sign in to see your tasks.</p>
        {error && <p className="error-text">{error}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={fieldErrors.email ? 'input-error' : ''}
        />
        {fieldErrors.email && <p className="error-text">{fieldErrors.email}</p>}

        <label htmlFor="password">Password</label>
        <div className="password-field">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            placeholder="********"
            className={fieldErrors.password ? 'input-error' : ''}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {fieldErrors.password && (
          <p className="error-text">{fieldErrors.password}</p>
        )}

        <button className="btn" disabled={loading}>
          {loading ? 'Signing you in...' : 'Sign in'}
        </button>
        <p>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </main>
  )
}

export default LoginPage
