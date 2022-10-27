import { useParams } from 'react-router-dom'
import { Spin } from 'antd'

import ArticleItem from '../../components/ArticleItem'
import { useFetchArticleQuery } from '../../api/Blog.api'
import Error from '../../components/Error'

const SingleArticle = () => {
  const token = localStorage.getItem('token')
  const { slug } = useParams()
  const {
    data: article,
    isLoading,
    isError,
    error,
    endpointName,
    refetch,
  } = useFetchArticleQuery({ slug: slug!, token: token! }, { refetchOnMountOrArgChange: true })

  return (
    <div>
      {isLoading && (
        <div className="spinner">
          <Spin size="large" />
        </div>
      )}
      {isError && <Error error={error} endpointName={endpointName} />}
      {article && <ArticleItem article={article} refetch={refetch} />}
    </div>
  )
}

export default SingleArticle
