import axios from 'axios'

const validateUrl = (url) => {
  return url
}


export default axios.create({
  baseURL: validateUrl(process.env.REACT_APP_BASE_URL)
})

export const axiosPrivate = axios.create({
  baseURL: validateUrl(process.env.REACT_APP_BASE_URL),
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})
