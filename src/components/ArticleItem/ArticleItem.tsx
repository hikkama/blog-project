import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { HeartOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import { Link } from 'react-router-dom'

import { ArticleData } from '../../models/ArticleData'

import ArticleInfo from './ArticleInfo'
import AuthorBlock from './AuthorBlock'
import styles from './ArticleItem.module.scss'

interface ArticleItemProps {
  article: ArticleData
}

const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
  return (
    <div className={styles.article}>
      <ArticleInfo article={article} />
      <div>
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ArticleItem
