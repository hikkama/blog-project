import { useEffect } from 'react'
import { Spin } from 'antd'

import ArticleList from '../../components/ArticleList'
import { useFetchAllArticlesQuery } from '../../api/Blog.api'
import { addArticles } from '../../store/reducers/blogSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import PaginationBlock from '../../components/PaginationBlock'
import Error from '../../components/Error'

const ArticleListPage = () => {
  const token = localStorage.getItem('token')
  const { page } = useAppSelector((state) => state.blogReducer)
  const dispatch = useAppDispatch()

  const { isLoading, error, isError, data, refetch, endpointName } = useFetchAllArticlesQuery(
    { offset: (page - 1) * 10, token: token! },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  useEffect(() => {
    if (!data) return
    dispatch(addArticles(data.articles))
  }, [data])

  return (
    <>
      {isLoading && (
        <div className="spinner">
          <Spin size="large" />
        </div>
      )}
      {isError && <Error error={error} endpointName={endpointName} />}
      {data && (
        <>
          <ArticleList refetch={refetch} />
          <PaginationBlock total={data.articlesCount} />
        </>
      )}
    </>
  )
}

export default ArticleListPage
