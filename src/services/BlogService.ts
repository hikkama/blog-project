import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { ServerResponse } from '../models/ServerResponse'
import { ArticleData } from '../models/ArticleData'

export const blogAPI = createApi({
  reducerPath: 'blogAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
  }),
  endpoints: (build) => ({
    fetchAllArticles: build.query<ServerResponse, number>({
      query: (offset = 0) => ({
        url: '/articles',
        params: {
          limit: 10,
          offset,
        },
      }),
    }),

    fetchArticle: build.query<ArticleData, string>({
      query: (slug: string) => ({
        url: `/articles/${slug}`,
      }),
      transformResponse: (response: { article: ArticleData }) => response.article,
    }),

    createUser: build.mutation<any, any>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

export const { useFetchAllArticlesQuery, useFetchArticleQuery, useCreateUserMutation } = blogAPI
