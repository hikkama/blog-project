import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'
import { Tag } from 'antd'

import AuthorBlock from '../AuthorBlock'
import { ArticleData } from '../../../models/articles'

import styles from './ArticleInfo.module.scss'

interface ArticleInfoProps {
  article: ArticleData
  wrapper?: boolean
}

const ArticleInfo: FC<ArticleInfoProps> = ({ article, wrapper = false }) => {
  const { slug, tagList, title, favoritesCount, description } = article

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
            <HeartOutlined /> {favoritesCount}
          </span>
        </div>

        <ul className={styles.tagList}>
          {tagList.map((tag) => (
            <li className={styles.tagItem} key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        <div className={wrapper ? styles.desc : styles.text}>{description}</div>
      </div>

      <AuthorBlock author={article.author} date={article.createdAt} />
    </div>
  )
}

export default ArticleInfo
