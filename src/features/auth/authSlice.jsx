import { createSlice } from '@reduxjs/toolkit'


const getPersistInitialState = () => {
  const localStorageVariable = localStorage.getItem('persist')
  if (localStorageVariable !== 'false' || localStorageVariable !== 'true') return false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, persist: getPersistInitialState() },
  reducers: {
    setCredentials: (state, action) => {
      const { userName, accessToken } = action.payload
      state.user = userName
      state.token = accessToken
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
    },
    togglePersist: (state) => {
      localStorage.setItem('persist', String(!state.persist))
      state.persist = !state.persist
    }
  }
})

export const { setCredentials, logOut, togglePersist } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state?.auth?.user
export const selectCurrentToken = (state) => state?.auth?.token
export const selectCurrentPersist = (state) => state?.auth?.persist