import React from 'react'
import { useParams } from 'react-router-dom'
import { Spin } from 'antd'

import ArticleItem from '../../components/ArticleItem'
import { useFetchArticleQuery } from '../../services/BlogService'
import Error from '../../components/Error'

const SingleArticlePage = () => {
  const { slug } = useParams()
  const { data: article, isLoading, isError, error } = useFetchArticleQuery(slug!, { refetchOnMountOrArgChange: true })

  return (
    <div>
      {isLoading && (
        <div className="spinner">
          <Spin size="large" />
        </div>
      )}
      {isError && <Error error={error} />}
      {article && <ArticleItem article={article} />}
    </div>
  )
}

export default SingleArticlePage
