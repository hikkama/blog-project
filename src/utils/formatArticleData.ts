import { ArticleFormData, ArticlePostData } from '../models/articles'

export const formatDataToPost = (data: ArticleFormData): ArticlePostData => ({
  title: data.title,
  description: data.description,
  body: data.body,
  tagList: data.tagList.map((tag) => tag.value),
})

export const formatTagList = (tagList: string[]): { value: string }[] => {
  if (tagList.length < 1) {
    return []
  }
  return tagList.map((tag) => {
    return {
      value: tag,
    }
  })
}
