import { ArticleData } from '../../models/articles'
import ArticleInfo from '../ArticleItem/ArticleInfo'
import { useAppSelector } from '../../hooks/redux'

import styles from './ArticleList.module.scss'

const ArticleList = ({ refetch = () => {} }: { refetch?: () => void }) => {
  const { articles } = useAppSelector((state) => state.blogReducer)

  return (
    <ul className={styles.articleList}>
      {articles?.map((article: ArticleData, index) => {
        return (
          <li className={styles.articleItem} key={`${article.createdAt}-${index}`}>
            <ArticleInfo refetch={refetch} article={article} isSingle />
          </li>
        )
      })}
    </ul>
  )
}

export default ArticleList
