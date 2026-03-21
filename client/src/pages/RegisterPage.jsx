import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import api from '../services/api'

function RegisterPage() {
  const { isAuthenticated, login } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
    const name = form.name.trim()
    const email = form.email.trim().toLowerCase()
    const password = form.password

    if (!name) {
      nextFieldErrors.name = 'Name is required.'
    } else if (name.length < 2) {
      nextFieldErrors.name = 'Name must be at least 2 characters.'
    }

    if (!email) {
      nextFieldErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextFieldErrors.email = 'Please enter a valid email address.'
    }

    if (!password) {
      nextFieldErrors.password = 'Password is required.'
    } else if (password.length < 6) {
      nextFieldErrors.password = 'Password must be at least 6 characters.'
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors)
      setError('Please fix the highlighted fields and try again.')
      return
    }

    try {
      setLoading(true)
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      })
      login(response.data)
      navigate('/dashboard', { replace: true })
    } catch (apiError) {
      if (apiError.response?.status === 409) {
        setError('This email is already registered. Please log in instead.')
      } else {
        setError(apiError.response?.data?.message || 'Unable to create account.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <form className="card auth-form" onSubmit={handleSubmit}>
        <h2>Create your account</h2>
        <p className="muted-text">It only takes a minute to get started.</p>
        {error && <p className="error-text">{error}</p>}

        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className={fieldErrors.name ? 'input-error' : ''}
        />
        {fieldErrors.name && <p className="error-text">{fieldErrors.name}</p>}

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
            placeholder="At least 6 characters"
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
          {loading ? 'Creating your account...' : 'Create account'}
        </button>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </main>
  )
}

export default RegisterPage
