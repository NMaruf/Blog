import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    email: null,
    token: null,
    image: null,
  },
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username
      state.email = action.payload.email
      state.token = action.payload.token
      state.image = action.payload.image
    },
    removeUser(state) {
      state.username = null
      state.email = null
      state.token = null
      state.image = null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
