import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()

  return (
    auth?.roles?.find(role => allowedRoles?.includes(role))
      ? <Outlet />
      : auth?.user
        ? <Navigate to='/error/unauthorized' state={{ from: location }} replace />
        : <Navigate to='/auth/login' state={{ from: location }} replace />
  )
}

export default RequireAuth