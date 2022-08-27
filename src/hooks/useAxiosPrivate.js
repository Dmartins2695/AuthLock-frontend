import { axiosBase } from '../api/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {

    const requestIntercept = axiosBase.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      }, (error) => Promise.reject(error)
    )

    const responseIntercept = axiosBase.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosBase(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosBase.interceptors.request.eject(requestIntercept)
      axiosBase.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosBase
}

export default useAxiosPrivate