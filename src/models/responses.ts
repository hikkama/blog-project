import { ArticleData } from './articles'
import { UserData } from './user'

export interface ArticleResponse {
  articles: ArticleData[]
  articlesCount: number
}

export interface ServerErrorResponse {
  errors: {
    [key: string]: string
  }
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
