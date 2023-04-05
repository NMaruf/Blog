import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import BlogService from '../../services/service'

const service = new BlogService()

export const fetchArticleDetails = createAsyncThunk(
  'details/fetchArticleDetails',
  async (slug, { rejectWithValue }) => {
    try {
      const data = await service.getArticleDetails(slug)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const articleDetailsSlice = createSlice({
  name: 'details',
  initialState: { articleDetails: {}, status: null, error: null },
  extraReducers: {
    [fetchArticleDetails.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchArticleDetails.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.articleDetails = action.payload
    },
    [fetchArticleDetails.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

export default articleDetailsSlice.reducer
