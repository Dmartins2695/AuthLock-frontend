import useAuth from './useAuth'
import { axiosBase } from '../api/axios'

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth()

  const refresh = async () => {
    const response = await axiosBase.post('api/v1/auth/refresh-token', {
      userName: auth?.userName,
      refreshToken: auth?.refreshToken
    })
    setAuth(prev => {
      return { ...prev, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }
    })
    return response.data.accessToken
  }
  return refresh
}

export default useRefreshToken