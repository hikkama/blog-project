import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

import { useLogUserMutation } from '../../services/BlogService'
import UserForm, { ErrorData } from '../../components/Form/UserForm/UserForm'
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
  const [logUser, { isLoading, error, endpointName }] = useLogUserMutation()
  const dispatch = useAppDispatch()
  const [errorArray, setErrorArray] = useState<ErrorData<SignInData>[]>([])
  const navigate = useNavigate()

  const onSubmit = async ({ email, password }: SignInData) => {
    const user = { email, password }
    try {
      const res = await logUser({ user }).unwrap()
      localStorage.setItem('token', res.user.token!)
      dispatch(addUser(res.user))
      navigate('/articles')
    } catch (e: any) {
      if (e?.data?.errors?.['email or password']) {
        setErrorArray([
          { name: 'password', option: { type: 'server', message: 'Email or password is invalid.' } },
          { name: 'email', option: { type: 'server', message: 'Email or password is invalid.' } },
        ])
      }
    }
  }

  if (error) {
    if ('status' in error) {
      if (error.status !== 422) {
        return <Error error={error} endpointName={endpointName} />
      }
    } else {
      return <Error error={error} endpointName={endpointName} />
    }
  }

  const bot = (
    <>
      Don&apos;t have an account? <Link to="/sign-up">Sign Up.</Link>
    </>
  )
  return (
    <UserForm<SignInData>
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
    </UserForm>
  )
}

export default SignInPage
