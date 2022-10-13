import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import avatar from '../../../assets/img/avatar.svg'
import { withUser } from '../../../hoc/withUser'
import { UserResponse } from '../../../models/responses'

import styles from './AuthBlock.module.scss'

interface AuthBlockProps {
  data: UserResponse
}

const AuthBlock: FC<AuthBlockProps> = ({ data }) => {
  const hasToken = !!localStorage.getItem('token')
  const navigate = useNavigate()

  const logOutHandler = () => {
    localStorage.removeItem('token')
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
          <span className={styles.name}>{data?.user.username}</span>
          <img className={styles.img} src={avatar} alt="avatar" />
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

export default withUser(AuthBlock)
