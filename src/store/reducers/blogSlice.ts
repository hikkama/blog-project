import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ArticleData } from '../../models/articles'
import { UserData } from '../../models/user'

interface BlogState {
  articles: ArticleData[]
  page: number
  user?: UserData
}

const initialState: BlogState = {
  articles: [],
  page: 1,
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setPageState: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    addArticles: (state, action: PayloadAction<ArticleData[]>) => {
      state.articles = action.payload
    },
    addUser: (state, action: PayloadAction<UserData>) => {
      state.user = { ...action.payload, token: null }
    },
    removeUser: (state) => {
      delete state.user
    },
  },
})

export default blogSlice.reducer
export const { setPageState, addArticles, addUser, removeUser } = blogSlice.actions
