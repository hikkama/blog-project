import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'

import { ArticleData } from '../../models/articles'

import ArticleInfo from './ArticleInfo'
import styles from './ArticleItem.module.scss'

interface ArticleItemProps {
  article: ArticleData
  refetch?: () => void
}

const ArticleItem: FC<ArticleItemProps> = ({ article, refetch = () => {} }) => {
  return (
    <div className={styles.article}>
      <ArticleInfo article={article} refetch={refetch} />
      <div className={styles.body}>
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ArticleItem
