import { createSlice } from '@reduxjs/toolkit'

const editArticleSlice = createSlice({
  name: 'edit',
  initialState: { edit: false },
  reducers: {
    setEdit(state) {
      state.edit = true
    },
    removeEdit(state) {
      state.edit = false
    },
  },
})

export const { setEdit, removeEdit } = editArticleSlice.actions

export default editArticleSlice.reducer
