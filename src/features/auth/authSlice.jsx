import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'


const getPersistInitialState = () => {
  const localStorageVariable = localStorage.getItem('persist')
  if (localStorageVariable?.match(/^true$|^false$/gm)) {
    return localStorageVariable
  }
  return false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, userId: null, token: null, persist: getPersistInitialState() },
  reducers: {
    setCredentials: (state, action) => {
      const { userName, accessToken } = action.payload
      state.userId = jwtDecode(accessToken).id
      state.user = userName
      state.token = accessToken
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
    },
    setPersist: (state, action) => {
      const { value } = action.payload
      localStorage.setItem('persist', String(value))
      state.persist = value
    },
    updateAccessToken: (state, action) => {
      const { accessToken } = action.payload
      state.token = accessToken
    }
  }
})

export const { setCredentials, logOut, setPersist, updateAccessToken } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state?.auth?.user
export const selectCurrentToken = (state) => state?.auth?.token
export const selectCurrentUserId = (state) => state?.auth?.userId
export const selectCurrentPersist = (state) => state?.auth?.persist