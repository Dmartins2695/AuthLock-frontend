import { createSlice } from '@reduxjs/toolkit'

const passwordsSlice = createSlice({
  name: 'passwords',
  initialState: { passwords: [] },
  reducers: {
    setPasswords: (state, action) => {
      const { passwords } = action.payload
      state.passwords = passwords
    },
    addNewPassword: (state, action) => {
      const { password } = action.payload
      state.passwords = [...state.passwords, password]
    },
    updatePassword: (state, action) => {
      const { password, index } = action.payload
      state.passwords[index] = password
    },
    deletePassword: (state, action) => {
      const { index } = action.payload
      state.passwords.splice(index, 1)
    },
    favoritePassword: (state, action) => {
      const { index } = action.payload
      state.passwords[index].favorite = !state.passwords[index].favorite
    }
  }
})

export const { setPasswords, addNewPassword, updatePassword, deletePassword, favoritePassword } = passwordsSlice.actions

export default passwordsSlice.reducer

export const selectCurrentPasswords = (state) => state?.passwords?.passwords
