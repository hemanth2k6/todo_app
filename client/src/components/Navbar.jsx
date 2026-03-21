import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div>
        <h1>My Tasks</h1>
        <p className="muted-text">Stay focused, one item at a time.</p>
      </div>
      <div className="navbar-right">
        <p>Hi, {user?.name || 'there'}</p>
        <button className="btn btn-danger" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  )
}

export default Navbar
