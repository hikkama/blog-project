import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { blogAPI } from '../services/BlogService'

import blogReducer from './reducers/blogSlice'

const rootReducer = combineReducers({
  blogReducer,
  [blogAPI.reducerPath]: blogAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogAPI.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
