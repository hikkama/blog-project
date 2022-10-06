import React from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'

import ArticleItem from '../../components/ArticleItem'
import { useFetchArticleQuery } from '../../services/BlogService'
import ErrorComponent from '../../components/ErrorComponent'

const SingleArticlePage = () => {
  const { slug } = useParams()
  const { data: article, isLoading, isError, error } = useFetchArticleQuery(slug!)

  return (
    <div>
      {isLoading && (
        <div className="spinner">
          <Spin size="large" />
        </div>
      )}
      {isError && <ErrorComponent error={error} />}
      {article && <ArticleItem article={article} />}
    </div>
  )
}

export default SingleArticlePage
