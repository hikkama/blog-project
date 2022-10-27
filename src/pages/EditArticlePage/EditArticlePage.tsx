import { Spin } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

import { useEditArticleMutation, useGetArticleQuery } from '../../services/BlogService'
import ArticleForm from '../../components/Form/ArticleForm/ArticleForm'
import { ArticleFormData } from '../../models/articles'
import { formatDataToPost, formatTagList } from '../../utils/formatArticleData'
import Error from '../../components/Error'

const EditArticlePage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const { data, isFetching } = useGetArticleQuery(slug!, { refetchOnMountOrArgChange: true })
  const [editArticle, { isLoading, error, endpointName }] = useEditArticleMutation()

  const onSubmit = async (article: ArticleFormData) => {
    const token = localStorage.getItem('token')
    try {
      const res = await editArticle({ article: formatDataToPost(article), slug: slug!, token: token! }).unwrap()
      navigate(`/articles/${res.article?.slug}`)
    } catch (e) {
      console.error(e)
    }
  }

  if (data && !isFetching) {
    const { tagList, title, description, body } = data.article

    return (
      <ArticleForm
        title="Edit article"
        onSubmit={onSubmit}
        isLoading={isLoading}
        defaultValues={{ title, description, body, tagList: formatTagList(tagList) }}
      />
    )
  }

  if (error) {
    return <Error error={error} endpointName={endpointName} />
  }

  return (
    <div className="spinner">
      <Spin size="large" />
    </div>
  )
}

export default EditArticlePage
