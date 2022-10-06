import { ArticleData } from './ArticleData'

export interface ServerResponse {
  articles: ArticleData[]
  articlesCount: number
}
