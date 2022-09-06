import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import jwtDecode from 'jwt-decode'

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()
  const jwtToken = auth?.accessToken ? jwtDecode(auth?.accessToken) : undefined
  const roles = jwtToken?.roles || []

  return (
    roles?.find(role => allowedRoles?.includes(role))
      ? <Outlet />
      : auth?.userName
        ? <Navigate to='/error/unauthorized' state={{ from: location }} replace />
        : <Navigate to='/auth/login' state={{ from: location }} replace />
  )
}

export default RequireAuth