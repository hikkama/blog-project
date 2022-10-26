import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { ArticleResponse, ArticlesResponse, SignUpRequest, UserResponse } from '../models/responses'
import { ArticleData, ArticlePostData } from '../models/articles'
import { UserData } from '../models/user'

export const blogAPI = createApi({
  reducerPath: 'blogAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
  }),
  endpoints: (build) => ({
    fetchAllArticles: build.query<ArticlesResponse, { offset: number; token?: string }>({
      query: ({ offset = 0, token = null }) => ({
        url: '/articles',
        params: {
          limit: 10,
          offset,
        },
        headers: {
          Authorization: `Token ${token}`,
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

    logUser: build.mutation<UserResponse, { user: Partial<UserData> }>({
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

    createArticle: build.mutation<ArticleResponse, { article: ArticlePostData; token: string }>({
      query: ({ article, token }) => ({
        url: '/articles',
        method: 'POST',
        body: { article },
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),

    getArticle: build.query<{ article: ArticleData }, string>({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
    }),

    editArticle: build.mutation<{ article: ArticleData }, { article: ArticlePostData; slug: string; token: string }>({
      query: ({ article, slug, token }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        body: { article },
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),

    deleteArticle: build.mutation<any, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),

    favoriteArticle: build.mutation<{ article: ArticleData }, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),

    unFavoriteArticle: build.mutation<{ article: ArticleData }, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
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
  useCreateArticleMutation,
  useGetArticleQuery,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
} = blogAPI
