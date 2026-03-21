import { createContext, useEffect, useMemo, useState } from 'react'
import TOKEN_KEY from '../constants/auth'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(Boolean(token))

  useEffect(() => {
    async function fetchCurrentUser() {
      if (!token) {
        setUser(null)
        setLoadingUser(false)
        return
      }

      try {
        const response = await api.get('/auth/me')
        setUser(response.data.user)
      } catch {
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
        setUser(null)
      } finally {
        setLoadingUser(false)
      }
    }

    fetchCurrentUser()
  }, [token])

  const login = ({ token: nextToken, user: nextUser }) => {
    localStorage.setItem(TOKEN_KEY, nextToken)
    setToken(nextToken)
    setUser(nextUser)
    setLoadingUser(false)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      token,
      user,
      loadingUser,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user, loadingUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
