import { ArticleData } from './articles'
import { UserData } from './user'

export interface ArticlesResponse {
  articles: ArticleData[]
  articlesCount: number
}

export interface ArticleResponse {
  article: ArticleData
}

export interface UserResponse {
  user: UserData
}

export interface SignUpRequest {
  user: {
    username: string
    email: string
    password: string
  }
}
