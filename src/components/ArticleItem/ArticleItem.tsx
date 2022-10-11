import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'

import { ArticleData } from '../../models/articles'

import ArticleInfo from './ArticleInfo'
import styles from './ArticleItem.module.scss'

interface ArticleItemProps {
  article: ArticleData
}

const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
  return (
    <div className={styles.article}>
      <ArticleInfo article={article} />
      <div className={styles.body}>
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ArticleItem
