import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useRefreshMutation } from '../features/auth/authApiSlice'
import { selectCurrentPersist, selectCurrentToken } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [refresh] = useRefreshMutation()
  const token = useSelector(selectCurrentToken)
  const persist = useSelector(selectCurrentPersist)

  useEffect(() => {
    let isMounted = true
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        isMounted && setIsLoading(false)
      }
    }
    token && persist ? verifyRefreshToken() : setIsLoading(false)

    return () => isMounted = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
          ? <p>Loading...</p>
          : <Outlet />
      }
    </>
  )
}

export default PersistLogin