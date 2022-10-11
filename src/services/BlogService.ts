import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { ArticleResponse, ServerErrorResponse, SignUpRequest, UserResponse } from '../models/responses'
import { ArticleData } from '../models/articles'
import { UserData } from '../models/user'

export const blogAPI = createApi({
  reducerPath: 'blogAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
  }),
  endpoints: (build) => ({
    fetchAllArticles: build.query<ArticleResponse, number>({
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

    createUser: build.mutation<UserResponse, SignUpRequest>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),

    logUser: build.mutation<any, any>({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

export const { useFetchAllArticlesQuery, useFetchArticleQuery, useCreateUserMutation, useLogUserMutation } = blogAPI
