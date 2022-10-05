import { FC } from 'react'
import { HeartOutlined } from '@ant-design/icons'
import { Tag } from 'antd'

import { ArticleData } from '../../models/ArticleData'

import AuthorBlock from './AuthorBlock'
import styles from './ArticleItem.module.scss'

interface ArticleItemProps {
  article: ArticleData
}

const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
  const { title, favoritesCount, tagList, body } = article

  return (
    <div className={styles.article}>
      <div className={styles.body}>
        <div className={styles.titleInfo}>
          <h2 className={styles.title}>{title}</h2>
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
        <p className={styles.text}>{body}</p>
      </div>

      <AuthorBlock author={article.author} date={'March 5, 2020'} />
    </div>
  )
}

export default ArticleItem
