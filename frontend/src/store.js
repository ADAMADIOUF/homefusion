import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import themeReducer from './slices/themeSlice'
import toggleSlice from './slices/toggleSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    toggle:toggleSlice,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store
