import { UserData } from './user'

export interface ArticleData {
  slug: string
  title: string
  description: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  favorited: boolean
  favoritesCount: number
  author: UserData
}

export interface AuthorData {
  username: string
  image: string
  following: boolean
}

export type ArticleFormData = {
  title: string
  description: string
  body: string
  tagList: { value: string }[]
}

export type ArticlePostData = {
  title: string
  description: string
  body: string
  tagList: string[]
}
