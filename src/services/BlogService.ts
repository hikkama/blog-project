import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { ArticleResponse, SignUpRequest, UserResponse } from '../models/responses'
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

    getCurrentUser: build.query<UserResponse, string>({
      query: (token) => ({
        url: '/user',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),

    updateUser: build.mutation<UserResponse, { user: Partial<UserData>; token: string }>({
      query: ({ user, token }) => ({
        url: '/user',
        method: 'PUT',
        body: { user },
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
  }),
})

export const {
  useFetchAllArticlesQuery,
  useFetchArticleQuery,
  useCreateUserMutation,
  useLogUserMutation,
  useLazyGetCurrentUserQuery,
  useUpdateUserMutation,
} = blogAPI
