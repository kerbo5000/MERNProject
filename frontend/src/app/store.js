import {configureStore} from '@reduxjs/toolkit'
import {apiSlice} from './api/apiSlice'
import authReducer from '../features/auth/authSlice'
import newsReducer from '../features/news/newsSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    news: newsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})
