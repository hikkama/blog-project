import { FC } from 'react'
import { Link } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Tag } from 'antd'

import AuthorBlock from '../AuthorBlock'
import { ArticleData } from '../../../models/articles'
import ArticleControl from '../ArticleControl/ArticleControl'
import { useFavoriteArticleMutation, useUnFavoriteArticleMutation } from '../../../services/BlogService'
import { useAppSelector } from '../../../hooks/redux'
import { warningMessage } from '../../InfoMessages'

import styles from './ArticleInfo.module.scss'

interface ArticleInfoProps {
  article: ArticleData
  wrapper?: boolean
  refetch?: () => void
}

const ArticleInfo: FC<ArticleInfoProps> = ({ article, wrapper = false, refetch = () => {} }) => {
  const { slug, tagList, title, favoritesCount, description, favorited } = article
  const { user } = useAppSelector((state) => state.blogReducer)
  const [favoriteArticle] = useFavoriteArticleMutation()
  const [unFavoriteArticle] = useUnFavoriteArticleMutation()

  const onClick = () => {
    const token = localStorage.getItem('token')
    if (token) {
      if (!favorited) {
        ;(async () => {
          await favoriteArticle({ slug: slug!, token: token! })
          refetch()
        })()
      } else {
        ;(async () => {
          await unFavoriteArticle({ slug: slug!, token: token! })
          refetch()
        })()
      }
    } else {
      warningMessage('You need to be logged in')
    }
  }

  return (
    <div className={wrapper ? styles.withWrapper : styles.noWrapper}>
      <div className={styles.body}>
        <div className={styles.titleInfo}>
          {wrapper ? (
            <Link to={`/articles/${slug}`} className={styles.title}>
              {title}
            </Link>
          ) : (
            <h2 className={styles.title}> {title}</h2>
          )}

          <span>
            <button className={styles.btn} type="button" onClick={onClick}>
              {favorited ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
            </button>{' '}
            {favoritesCount}
          </span>
        </div>

        <ul className={styles.tagList}>
          {tagList.map((tag, i) => (
            <li className={styles.tagItem} key={`${tag}-${i}`}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        <div className={wrapper ? styles.desc : styles.text}>{description}</div>
      </div>
      <div>
        <AuthorBlock author={article.author} date={article.createdAt} />
        {!wrapper && user?.username === article.author.username && <ArticleControl />}
      </div>
    </div>
  )
}

export default ArticleInfo
