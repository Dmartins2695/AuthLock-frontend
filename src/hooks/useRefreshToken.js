import useAuth from './useAuth'
import axios from '../api/axios'

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth()

  const refresh = async () => {
    const response = await axios.post('api/v1/auth/refresh-token', {}, { withCredentials: true })
    setAuth(prev => {
      return {
        ...prev, accessToken: response.data.accessToken
      }
    })
    return response.data.accessToken
  }
  return refresh
}

export default useRefreshToken