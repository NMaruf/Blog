import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import BlogService from '../services/service'

const service = new BlogService()

export const fetchArticles = createAsyncThunk('blog/fetchArticles', async (page, { rejectWithValue }) => {
  try {
    const data = await service.getArticles(page)
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const articleSlice = createSlice({
  name: 'blog',
  initialState: { articles: [], status: null, error: null },
  // reducers: {
  // addArticle(state, action) {},
  // removeArticle(state, action) {},
  // },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      /* eslint-disable */
      state.status = 'loading'
      state.error = null
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.articles = action.payload
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
      /* eslint-enable */
    },
  },
})

// export const { addArticle, removeArticle } = articleSlice.actions
export default articleSlice.reducer
