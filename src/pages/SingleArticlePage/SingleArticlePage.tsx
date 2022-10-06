import React from 'react'
import { useParams } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import ReactMarkdown from 'react-markdown'

import ArticleItem from '../../components/ArticleItem'
import { useFetchArticleQuery } from '../../services/BlogService'
import AuthorBlock from '../../components/ArticleItem/AuthorBlock'
import headerStyles from '../../components/ArticleItem/ArticleItem.module.scss'

import styles from './SingleArticlePage.module.scss'

const SingleArticlePage = () => {
  const { slug } = useParams()
  const { data: article, isLoading, isError } = useFetchArticleQuery(slug!)
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {article && <ArticleItem article={article!} />}
    </div>
  )
}

export default SingleArticlePage
