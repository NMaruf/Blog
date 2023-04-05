import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import BlogService from '../../services/service'

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
  initialState: { articles: [], status: null, error: null, like: false },
  reducers: {
    likeArticle(state) {
      state.like = !state.like
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
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
    },
  },
})

export const { likeArticle } = articleSlice.actions
export default articleSlice.reducer
