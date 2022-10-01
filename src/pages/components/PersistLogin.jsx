import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useRefreshMutation } from '../../features/auth/authApiSlice'
import { selectCurrentPersist, setCredentials, updateAccessToken } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [refresh] = useRefreshMutation()
  const persist = useSelector(selectCurrentPersist)
  const dispatch = useDispatch()

  useEffect(() => {
    let isMounted = true
    const verifyRefreshToken = async () => {
      try {
        await refresh().then((response) => {
          if (response.error) {
            console.error(response.error)
          } else {
            const data = jwtDecode(response.data?.accessToken)
            dispatch(updateAccessToken({ ...response.data }))
            dispatch(setCredentials({ ...response.data, userName: data.sub }))
          }
        })
      } catch (err) {
        console.error(err)
      } finally {
        isMounted && setIsLoading(false)
      }
    }
    persist ? verifyRefreshToken() : setIsLoading(false)

    return () => (isMounted = false)
  }, [])
  return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
}

export default PersistLogin
