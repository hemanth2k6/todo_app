import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loadingUser } = useAuth()
  const location = useLocation()

  if (loadingUser) {
    return <div className="center-card">Just a second, checking your session...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export default ProtectedRoute
