import { configureStore } from '@reduxjs/toolkit'

import articleReducer from './slices/articleSlice'
import userReducer from './slices/userSlice'
import editReducer from './slices/editArticleSlice'
import articleDetailsReducer from './slices/articleDetailsSlice'

export default configureStore({
  reducer: {
    articles: articleReducer,
    user: userReducer,
    edit: editReducer,
    articleDetails: articleDetailsReducer,
  },
})
