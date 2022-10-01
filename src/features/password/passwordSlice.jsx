import { createSlice } from '@reduxjs/toolkit'

const passwordsSlice = createSlice({
  name: 'passwords',
  initialState: { passwords: [] },
  reducers: {
    setPasswords: (state, action) => {
      const { passwords } = action.payload
      state.passwords = passwords
    }
  }
})

export const { setPasswords } = passwordsSlice.actions

export default passwordsSlice.reducer

export const selectCurrentPasswords = (state) => state?.passwords?.passwords
