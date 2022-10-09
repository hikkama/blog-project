import React from 'react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import classNames from 'classnames'

import { useCreateUserMutation } from '../../services/BlogService'

import styles from './SignUpPage.module.scss'

interface FormInputsData {
  username: string
  email: string
  password: string
  repeatPassword: string
  agreement: boolean
}

interface FormFetchData {
  username: string
  email: string
  password: string
  repeatPassword: string
  agreement: boolean
}

const SignUpPage = () => {
  const [createUser, { isLoading, data, isError, error }] = useCreateUserMutation()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormInputsData>({ mode: 'all' })

  const onSubmit: SubmitHandler<FormInputsData> = async ({ username, email, password }) => {
    const user = { username, email, password }
    const res = await createUser({ user })
  }

  const passRegExp =
    /^[a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]?([a-zA-Z0-9][-_.+!#$%&'*\\=?^`{|]?)*[a-zA-Z0-9]@[a-zA-Z0-9][-.]?([a-zA-Z][-.]?)*[a-zA-Z0-9]\.[a-zA-Z0-9]+([.-]?[a-zA-Z])*[a-zA-Z0-9]*$/

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Create new account</h3>
      <label className={styles.label}>
        <span className={styles.inputTitle}>Username</span>
        <input
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
            maxLength: { value: 20, message: 'Your username needs to be no more than 20 characters.' },
          })}
          className={classNames({
            [styles.input]: true,
            [styles.inputErr]: errors?.username,
          })}
          type="text"
          placeholder="Username"
        />
        {errors?.username && <span className={styles.error}>{errors.username?.message || 'Error'}</span>}
      </label>

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
      <label className={styles.label}>
        <span className={styles.inputTitle}>Repeat Password</span>
        <input
          {...register('repeatPassword', {
            required: 'Passwords must match',
            validate: (val: string) => {
              if (watch('password') != val) {
                return 'Passwords must match'
              }
            },
          })}
          className={classNames({
            [styles.input]: true,
            [styles.inputErr]: errors?.repeatPassword,
          })}
          type="password"
          placeholder="Password"
        />
        {errors?.repeatPassword && <span className={styles.error}>{errors.repeatPassword?.message || 'Error'}</span>}
      </label>
      <label className={`${styles.label} ${styles.checkboxLabel}`}>
        <input
          {...register('agreement', { required: 'Agreement is required' })}
          className={styles.check}
          type="checkbox"
        />
        <span className={styles.checkbox}></span>
        <span className={styles.checkboxTitle}>I agree to the processing of my personal information</span>
        {errors?.agreement && <div className={styles.error}>{errors.agreement?.message || 'Error'}</div>}
      </label>
      <input className={styles.btn} type="submit" value="Create" disabled={!isValid} />
      <div className={styles.signIn}>
        Already have an account? <Link to="/">Sign In.</Link>
      </div>
    </form>
  )
}

export default SignUpPage
