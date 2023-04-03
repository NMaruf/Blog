import { configureStore } from '@reduxjs/toolkit'

import articleReducer from './slices/articleSlice'
import userReducer from './slices/userSlice'

export default configureStore({
  reducer: {
    articles: articleReducer,
    user: userReducer,
  },
})
