import { configureStore } from '@reduxjs/toolkit'

import articleReducer from './articleSlice'

export default configureStore({ reducer: { articles: articleReducer } })
