import React, { FC, useState } from 'react'
import { Pagination } from 'antd'

import Header from '../Header'
import ArticleList from '../ArticleList'
import { useFetchAllArticlesQuery } from '../../services/BlogService'

import styles from './App.module.scss'
//https://www.figma.com/file/XXBjJXew3xpfbOZUnO9QVB/Blog?node-id=9582%3A0
//https://api.realworld.io/api-docs/
const App: FC = () => {
  const [articleOffset, setArticleOffset] = useState(0)
  const [page, setPage] = useState(1)
  const { isLoading, error, data } = useFetchAllArticlesQuery(articleOffset)

  const onChangePagination = (nextPage: number): void => {
    setArticleOffset((nextPage - 1) * 10)
    setPage(nextPage)
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error</div>}
        {data && (
          <>
            <ArticleList articles={data.articles} />
            <div className={styles.pagination}>
              <Pagination
                size="small"
                onChange={onChangePagination}
                total={data.articlesCount}
                showSizeChanger={false}
                pageSize={10}
                current={page}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App
