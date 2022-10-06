import { FC } from 'react'

import { ArticleData } from '../../models/ArticleData'
import ArticleItem from '../ArticleItem'

import styles from './ArticleList.module.scss'

interface ArticleListProps {
  articles: ArticleData[]
}

const ArticleList: FC<ArticleListProps> = ({ articles }) => {
  return (
    <ul className={styles.articleList}>
      {articles?.map((article: ArticleData, index) => {
        return (
          <li className={styles.articleItem} key={`${article.createdAt}-${index}`}>
            <ArticleItem article={article} />
          </li>
        )
      })}
    </ul>
  )
}

export default ArticleList
