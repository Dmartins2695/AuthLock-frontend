import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from './authSlice'
import jwtDecode from 'jwt-decode'

const RequireAuth = ({ allowedRoles }) => {
  const token = useSelector(selectCurrentToken)
  const userName = useSelector(selectCurrentUser)
  const location = useLocation()
  const jwtToken = token ? jwtDecode(token) : undefined
  const roles = jwtToken?.roles || []

  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : userName ? (
    <Navigate to='/error/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/auth/login' state={{ from: location }} replace />
  )
}
export default RequireAuth
