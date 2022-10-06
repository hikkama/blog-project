import React from 'react'
import { Pagination } from 'antd'

import ArticleList from '../../components/ArticleList'
import { useFetchAllArticlesQuery } from '../../services/BlogService'
import { setPageState } from '../../store/reducers/blogSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

import styles from './ArticleListPage.module.scss'

const ArticleListPage = () => {
  const dispatch = useAppDispatch()
  const { page } = useAppSelector((state) => state.blogReducer)
  const { isLoading, error, data } = useFetchAllArticlesQuery((page - 1) * 10)

  const onChangePagination = (nextPage: number): void => {
    dispatch(setPageState(nextPage))
  }

  return (
    <>
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
    </>
  )
}

export default ArticleListPage
