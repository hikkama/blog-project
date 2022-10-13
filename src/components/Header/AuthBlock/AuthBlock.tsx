import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import avatar from '../../../assets/img/avatar.svg'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { removeUser } from '../../../store/reducers/blogSlice'

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
        <button className={styles.btnGreen} type="button">
          Create article
        </button>
      </Link>
      <Link to="/profile">
        <button className={styles.btnProfile} type="button">
          <span className={styles.name}>{user?.username}</span>
          <img className={styles.img} src={user?.image || avatar} alt="avatar" />
        </button>
      </Link>
      <Link to="/">
        <button onClick={logOutHandler} className={styles.btnLogOut} type="button">
          Log Out
        </button>
      </Link>
    </>
  )

  const UnAuthorized = (): JSX.Element => (
    <>
      <Link to="/sign-in">
        <button className={styles.btn} type="button">
          Sign In
        </button>
      </Link>
      <Link to="/sign-up">
        <button className={styles.btnSignUp} type="button">
          Sign Up
        </button>
      </Link>
    </>
  )

  return <div className={styles.wrapper}>{hasToken ? <Authorized /> : <UnAuthorized />}</div>
}

export default AuthBlock
