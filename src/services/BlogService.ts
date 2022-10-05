import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { RootObjectData } from '../models/RootObjectData'

export const blogAPI = createApi({
  reducerPath: 'blogAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
  }),
  endpoints: (build) => ({
    fetchAllArticles: build.query<RootObjectData, number>({
      query: (offset = 0) => ({
        url: '/articles',
        params: {
          offset,
        },
      }),
    }),
  }),
})

export const { useFetchAllArticlesQuery } = blogAPI
