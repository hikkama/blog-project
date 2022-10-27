import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import avatar from '../../../assets/img/avatar.svg'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { removeUser } from '../../../store/reducers/blogSlice'
import Button from '../../UI/Button'

import styles from './AuthBlock.module.scss'

const AuthBlock: FC = () => {
  const hasToken = !!localStorage.getItem('token')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.blogReducer)

  const logOutHandler = () => {
    localStorage.removeItem('token')
    dispatch(removeUser())
    navigate('/')
  }

  const Authorized = (): JSX.Element => (
    <>
      <Link to="/new-article">
        <Button type="Success" btnSize="sm" title="Create article" />
      </Link>
      <Link to="/profile">
        <Button type="Text" title={user?.username} />
        <img className={styles.img} src={user?.image || avatar} alt="avatar" />
      </Link>
      <Link to="/">
        <Button onClick={logOutHandler} type="Black" title="Log Out" />
      </Link>
    </>
  )

  const UnAuthorized = (): JSX.Element => (
    <>
      <Link to="/sign-in">
        <Button type="Text" title="Sign In" />
      </Link>
      <Link to="/sign-up">
        <Button type="Success" title="Sign Up" />
      </Link>
    </>
  )

  return <div className={styles.wrapper}>{hasToken ? <Authorized /> : <UnAuthorized />}</div>
}

export default AuthBlock
