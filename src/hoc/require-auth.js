import { useLocation, Navigate } from 'react-router-dom'

function RequireAuth({ children }) {
  const location = useLocation()
  let auth = false
  if (localStorage.getItem('tokenKey')) {
    auth = true
  }

  if (!auth) {
    return <Navigate to="/sign-in" state={{ from: location }} />
  }

  return children
}

export default RequireAuth
