import React from 'react'
import { useParams } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import ReactMarkdown from 'react-markdown'

import { useFetchArticleQuery } from '../../services/BlogService'
import AuthorBlock from '../../components/ArticleItem/AuthorBlock'
import headerStyles from '../../components/ArticleItem/ArticleItem.module.scss'

import styles from './SingleArticlePage.module.scss'

const SingleArticlePage = () => {
  const { slug } = useParams()
  const { data: article, isLoading, isError } = useFetchArticleQuery(slug!)
  return (
    <div className={styles.article}>
      {article && (
        <>
          <div className={headerStyles.article}>
            <div className={headerStyles.articleHeader}>
              <div className={headerStyles.body}>
                <div className={headerStyles.titleInfo}>
                  <h2 className={headerStyles.title}>{article.title}</h2>
                  <span>
                    <HeartOutlined /> {article.favoritesCount}
                  </span>
                </div>

                <ul className={headerStyles.tagList}>
                  {article.tagList.map((tag) => (
                    <li className={headerStyles.tagItem} key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
                <p className={headerStyles.text}>{article.description}</p>
              </div>

              <AuthorBlock author={article.author} date={'March 5, 2020'} />
            </div>
            <div>
              <ReactMarkdown>{article.body}</ReactMarkdown>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SingleArticlePage
