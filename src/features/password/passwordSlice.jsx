import { createSlice } from '@reduxjs/toolkit'

const passwordsSlice = createSlice({
  name: 'passwords',
  initialState: { passwords: [] },
  reducers: {
    setPasswords: (state, action) => {
      const { passwords } = action.payload
      state.passwords = passwords
    },
    addNewPassword: (state) => {
      state.passwords = [{}, ...state.passwords]
    },
    updatePassword: (state, action) => {
      const { password, index } = action.payload
      state.passwords[index] = password
    }
  }
})

export const { setPasswords, addNewPassword, updatePassword } = passwordsSlice.actions

export default passwordsSlice.reducer

export const selectCurrentPasswords = (state) => state?.passwords?.passwords
