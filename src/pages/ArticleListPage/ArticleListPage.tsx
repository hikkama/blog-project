import React, { useEffect } from 'react'
import { Spin } from 'antd'

import ArticleList from '../../components/ArticleList'
import { useFetchAllArticlesQuery, useLazyGetCurrentUserQuery } from '../../services/BlogService'
import { addArticles } from '../../store/reducers/blogSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import PaginationBlock from '../../components/PaginationBlock'
import Error from '../../components/Error'

const ArticleListPage = () => {
  const dispatch = useAppDispatch()
  const { page } = useAppSelector((state) => state.blogReducer)
  const { isLoading, error, isError, data } = useFetchAllArticlesQuery((page - 1) * 10)
  const [getUser] = useLazyGetCurrentUserQuery()

  useEffect(() => {
    if (!data) return
    dispatch(addArticles(data.articles))
  }, [data])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    ;(async () => {
      await getUser(token)
    })()
  }, [])

  return (
    <>
      {isLoading && (
        <div className="spinner">
          <Spin size="large" />
        </div>
      )}
      {isError && <Error error={error} />}
      {data && (
        <>
          <ArticleList />
          <PaginationBlock total={data.articlesCount} />
        </>
      )}
    </>
  )
}

export default ArticleListPage
