import { FC } from 'react'
import { Link } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Tag } from 'antd'

import AuthorBlock from '../AuthorBlock'
import { ArticleData } from '../../../models/articles'
import ArticleControl from '../ArticleControl'
import { useFavoriteArticleMutation, useUnFavoriteArticleMutation } from '../../../api/Blog.api'
import { useAppSelector } from '../../../hooks/redux'
import { errorMessage, warningMessage } from '../../UI/InfoMessages'

import styles from './ArticleInfo.module.scss'

interface ArticleInfoProps {
  article: ArticleData
  isSingle?: boolean
  refetch?: () => void
}

const ArticleInfo: FC<ArticleInfoProps> = ({ article, isSingle = false, refetch = () => {} }) => {
  const { slug, tagList, title, favoritesCount, description, favorited } = article
  const { user } = useAppSelector((state) => state.blogReducer)

  const [favoriteArticle, { isError: isFavoriteError }] = useFavoriteArticleMutation()
  const [unFavoriteArticle, { isError: isUnFavoriteError }] = useUnFavoriteArticleMutation()

  const onHeartClick = () => {
    const token = localStorage.getItem('token')
    if (token) {
      if (!favorited) {
        ;(async () => {
          try {
            await favoriteArticle({ slug: slug!, token: token! })
            refetch()
          } catch (e) {
            console.error(e)
          }
        })()
      } else {
        ;(async () => {
          try {
            await unFavoriteArticle({ slug: slug!, token: token! })
            refetch()
          } catch (e) {
            console.error(e)
          }
        })()
      }
    } else {
      warningMessage('You need to be logged in')
    }
  }

  if (isFavoriteError || isUnFavoriteError) {
    errorMessage('An unexpected error occurred...')
  }

  return (
    <div className={isSingle ? styles.withWrapper : styles.noWrapper}>
      <div className={styles.body}>
        <div className={styles.titleInfo}>
          {isSingle ? (
            <Link to={`/articles/${slug}`} className={styles.title}>
              {title}
            </Link>
          ) : (
            <h2 className={styles.title}> {title}</h2>
          )}

          <span>
            <button className={styles.btn} type="button" onClick={onHeartClick}>
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
        <div className={isSingle ? styles.desc : styles.text}>{description}</div>
      </div>
      <div>
        <AuthorBlock author={article.author} date={article.createdAt} />
        {!isSingle && user?.username === article.author.username && <ArticleControl />}
      </div>
    </div>
  )
}

export default ArticleInfo
