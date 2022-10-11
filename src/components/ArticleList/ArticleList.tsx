import { FC } from 'react'

import { ArticleData } from '../../models/articles'
import ArticleInfo from '../ArticleItem/ArticleInfo'
import { useAppSelector } from '../../hooks/redux'

import styles from './ArticleList.module.scss'

const ArticleList: FC = () => {
  const { articles } = useAppSelector((state) => state.blogReducer)

  return (
    <ul className={styles.articleList}>
      {articles?.map((article: ArticleData, index) => {
        return (
          <li className={styles.articleItem} key={`${article.createdAt}-${index}`}>
            <ArticleInfo article={article} wrapper />
          </li>
        )
      })}
    </ul>
  )
}

export default ArticleList
