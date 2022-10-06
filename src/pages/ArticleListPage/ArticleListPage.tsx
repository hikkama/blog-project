import React from 'react'

import ArticleList from '../../components/ArticleList'
import { useFetchAllArticlesQuery } from '../../services/BlogService'
import { addArticles } from '../../store/reducers/blogSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import PaginationBlock from '../../components/PaginationBlock'

const ArticleListPage = () => {
  const dispatch = useAppDispatch()
  const { page } = useAppSelector((state) => state.blogReducer)
  const { isLoading, error, data } = useFetchAllArticlesQuery((page - 1) * 10)

  if (data) {
    dispatch(addArticles(data.articles))
  }

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
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
