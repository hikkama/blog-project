import React from 'react'
import classNames from 'classnames'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import styles from '../SignUpPage/SignUpPage.module.scss'
import { useLogUserMutation } from '../../services/BlogService'

interface FormInputsData {
  email: string
  password: string
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormInputsData>({ mode: 'all' })
  const navigate = useNavigate()

  const [logUser, { isLoading, data, isError, error }] = useLogUserMutation()

  const onSubmit: SubmitHandler<FormInputsData> = async ({ email, password }) => {
    const user = { email, password }
    const res = await logUser({ user }).unwrap()
    console.log(res)
    localStorage.setItem('token', res.user.token!)
    navigate('/articles')
  }

  const passRegExp =
    /^[a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]?([a-zA-Z0-9][-_.+!#$%&'*\\=?^`{|]?)*[a-zA-Z0-9]@[a-zA-Z0-9][-.]?([a-zA-Z][-.]?)*[a-zA-Z0-9]\.[a-zA-Z0-9]+([.-]?[a-zA-Z])*[a-zA-Z0-9]*$/

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Sign in</h3>

      <label className={styles.label}>
        <span className={styles.inputTitle}>Email address</span>
        <input
          {...register('email', {
            required: 'Email address is required',
            pattern: { value: passRegExp, message: 'Please enter a valid e-mail address' },
          })}
          className={classNames({
            [styles.input]: true,
            [styles.inputErr]: errors?.email,
          })}
          type="text"
          placeholder="Email address"
        />
        {errors?.email && <span className={styles.error}>{errors.email?.message || 'Error'}</span>}
      </label>
      <label className={styles.label}>
        <span className={styles.inputTitle}>Password</span>
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
            maxLength: { value: 40, message: 'Your password needs to be no more than 40 characters.' },
          })}
          className={classNames({
            [styles.input]: true,
            [styles.inputErr]: errors?.password,
          })}
          type="password"
          placeholder="Password"
        />
        {errors?.password && <span className={styles.error}>{errors.password?.message || 'Error'}</span>}
      </label>

      <input className={styles.btn} type="submit" value="Login" disabled={!isValid} />
      <div className={styles.signIn}>
        Don&apos;t have an account? <Link to="/sign-up">Sign Up.</Link>
      </div>
    </form>
  )
}

export default SignInPage
