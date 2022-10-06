import { createSlice } from '@reduxjs/toolkit'

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
    setPageState: (state, action) => {
      state.page = action.payload
    },
  },
})

export default blogSlice.reducer
export const { setPageState } = blogSlice.actions
