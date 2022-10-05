import { createSlice } from '@reduxjs/toolkit'

import { ArticleData } from '../../models/ArticleData'

interface BlogState {
  articles: ArticleData[]
}

const initialState: BlogState = {
  articles: [],
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
})

export default blogSlice.reducer
