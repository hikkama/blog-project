import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useCreateArticleMutation } from '../../services/BlogService'
import ArticleForm from '../../components/Form/ArticleForm/ArticleForm'
import { ArticleFormData, ArticlePostData } from '../../models/articles'
import Error from '../../components/Error'

const defaultValues: ArticleFormData = {
  title: '',
  description: '',
  body: '',
  tagList: [],
}

const NewArticlePage = () => {
  const [createArticle, { isLoading, isError, error }] = useCreateArticleMutation()
  const navigate = useNavigate()

  const formatDataToPost = (data: ArticleFormData): ArticlePostData => ({
    title: data.title,
    description: data.description,
    body: data.body,
    tagList: data.tagList.map((tag) => tag.value),
  })

  const onSubmit = async (article: ArticleFormData) => {
    const token = localStorage.getItem('token')
    try {
      const res = await createArticle({ article: formatDataToPost(article), token: token! }).unwrap()
      navigate(`/articles/${res.article?.slug}`)
    } catch (e: any) {
      console.error(e)
    }
  }

  if (isError) {
    return <Error error={error} />
  }

  return (
    <ArticleForm title="Create new article" onSubmit={onSubmit} isLoading={isLoading} defaultValues={defaultValues} />
  )
}

export default NewArticlePage
