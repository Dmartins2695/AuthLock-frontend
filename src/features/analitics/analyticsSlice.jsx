import { createSlice } from '@reduxjs/toolkit'

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: { analytics: { outdated: 0, weak: 0, duplicated: 0 } },
  reducers: {
    setAnalytics: (state, action) => {
      const { name, count } = action.payload
      state.analytics[name] = count
    }
  }
})

export const { setAnalytics } = analyticsSlice.actions

export default analyticsSlice.reducer

export const selectCurrentAnalytics = (state) => state?.analytics?.analytics
