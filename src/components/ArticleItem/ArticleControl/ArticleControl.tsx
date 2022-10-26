import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Button from '../../Button/Button'
import { useDeleteArticleMutation } from '../../../services/BlogService'
import Error from '../../Error'

import styles from './ArticleControl.module.scss'

const ArticleControl = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [deleteArticle, { isError, error }] = useDeleteArticleMutation()

  const onDelete = async () => {
    const token = localStorage.getItem('token')
    try {
      await deleteArticle({ slug: params.slug, token: token! })
      navigate('/articles')
    } catch (e) {
      console.error(e)
    }
  }

  if (isError) {
    return <Error error={error} />
  }

  return (
    <div className={styles.wrapper}>
      <Button title="Delete" type="Danger" onClick={onDelete} btnSize="smLong" />
      <Link to="./edit">
        <Button title="Edit" type="Success" btnSize="smLong" />
      </Link>
    </div>
  )
}

export default ArticleControl
