import { useLocation, Navigate } from 'react-router-dom'

import ServiceLocalStorage from '../services/localStorage-service'
import { signIn } from '../constans'

const localStorageService = new ServiceLocalStorage()

function RequireAuth({ children }) {
  const location = useLocation()
  let auth = false
  if (localStorageService.getToken('tokenKey')) {
    auth = true
  }

  if (!auth) {
    // return <Navigate to="/sign-in" state={{ from: location }} />
    return <Navigate to={`/${signIn}`} state={{ from: location }} />
  }

  return children
}

export default RequireAuth
