// userSlice.js

import { createSlice } from '@reduxjs/toolkit'

const storedUserInfo = typeof localStorage !== 'undefined' ? localStorage.getItem('user') : null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: storedUserInfo ? JSON.parse(storedUserInfo) : null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
  },
})

export const { setEmail } = userSlice.actions

export default userSlice.reducer
