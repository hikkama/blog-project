import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ArticleData } from '../../models/ArticleData'

interface BlogState {
  articles: ArticleData[]
  page: number
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
  },
})

export default blogSlice.reducer
export const { setPageState, addArticles } = blogSlice.actions
