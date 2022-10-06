import { FC } from 'react'
import { HeartOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import { Link } from 'react-router-dom'

import { ArticleData } from '../../models/ArticleData'

import AuthorBlock from './AuthorBlock'
import styles from './ArticleItem.module.scss'

interface ArticleItemProps {
  article: ArticleData
}

const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
  const { title, favoritesCount, tagList, description } = article

  return (
    <div className={styles.article}>
      <div className={styles.articleHeader}>
        <div className={styles.body}>
          <div className={styles.titleInfo}>
            <Link to={`/articles/${article.slug}`} className={styles.title}>
              {title}
            </Link>
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
          <p className={styles.text}>{description}</p>
        </div>

        <AuthorBlock author={article.author} date={'March 5, 2020'} />
      </div>
    </div>
  )
}

export default ArticleItem
