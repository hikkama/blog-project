import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

import { useLogUserMutation } from '../../services/BlogService'
import Form, { ErrorData } from '../../components/Form/Form'
import Input from '../../components/Form/Input/Input'
import signInSchema from '../../schemes/signInSchema'
import { useAppDispatch } from '../../hooks/redux'
import { addUser } from '../../store/reducers/blogSlice'
import Error from '../../components/Error'

type SignInData = {
  email: string
  password: string
}

const SignInPage = () => {
  const [logUser, { isLoading, isError, error }] = useLogUserMutation()
  const dispatch = useAppDispatch()
  const [errorArray, setErrorArray] = useState<ErrorData<SignInData>[]>([])
  const navigate = useNavigate()

  const onSubmit = async ({ email, password }: SignInData) => {
    const user = { email, password }
    try {
      const res = await logUser({ user }).unwrap()
      localStorage.setItem('token', res.user.token!)
      console.log('login user')
      dispatch(addUser(res.user))
      navigate('/articles')
    } catch (e: any) {
      if (e?.data?.errors?.['email or password']) {
        setErrorArray((prev) => [
          ...prev,
          { name: 'email', option: { type: 'server', message: 'Email or password is invalid.' } },
        ])
        setErrorArray((prev) => [
          ...prev,
          { name: 'password', option: { type: 'server', message: 'Email or password is invalid.' } },
        ])
      }
    }
  }

  if (isError) {
    return <Error error={error} />
  }

  const bot = (
    <>
      Don&apos;t have an account? <Link to="/sign-up">Sign Up.</Link>
    </>
  )
  return (
    <Form<SignInData>
      title="Sign in"
      botCaption={bot}
      resolver={yupResolver(signInSchema)}
      onSubmit={onSubmit}
      serverErrors={errorArray}
      button="Login"
      isLoading={isLoading}
    >
      <Input title="Email" placeholder="Email" name="email" />
      <Input type="password" title="Password" placeholder="Password" name="password" />
    </Form>
  )
}

export default SignInPage
