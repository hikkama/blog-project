import React from 'react'
import { useParams } from 'react-router-dom'

import ArticleItem from '../../components/ArticleItem'
import { useFetchArticleQuery } from '../../services/BlogService'

const SingleArticlePage = () => {
  const { slug } = useParams()
  const { data: article, isLoading, isError } = useFetchArticleQuery(slug!)

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {article && <ArticleItem article={article} />}
    </div>
  )
}

export default SingleArticlePage
