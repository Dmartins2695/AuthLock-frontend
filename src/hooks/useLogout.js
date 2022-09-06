import useAuth from './useAuth'
import useAxiosPrivate from './useAxiosPrivate'

const useLogout = () => {
  const { auth, setAuth } = useAuth()
  const axios = useAxiosPrivate()

  const logout = async () => {
    try {
      await axios.post('/api/v1/auth/logout').then((response) => {
        if (response.status === 200 || response.status === 204) {
          setAuth({})
          localStorage.removeItem('persist')
        }
      })

    } catch (err) {
      console.error(err)
    }
  }

  return logout
}

export default useLogout