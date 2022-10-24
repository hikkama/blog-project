import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from '../../components/Form/Input/Input'
import { useCreateUserMutation } from '../../services/BlogService'
import UserForm, { ErrorData } from '../../components/Form/UserForm/UserForm'
import signUpSchema from '../../schemes/signUpSchema'
import Checkbox from '../../components/Form/Checkbox/Checkbox'
import { addUser } from '../../store/reducers/blogSlice'
import { useAppDispatch } from '../../hooks/redux'
import Error from '../../components/Error'

type SignUpData = {
  username: string
  email: string
  password: string
  repeatPassword: string
  agreement: boolean
}

const SignUpPage = () => {
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation()
  const dispatch = useAppDispatch()
  const [errorArray, setErrorArray] = useState<ErrorData<SignUpData>[]>([])
  const navigate = useNavigate()

  const onSubmit = async ({ username, email, password }: SignUpData) => {
    const user = { username, email, password }
    try {
      const res = await createUser({ user }).unwrap()
      localStorage.setItem('token', res.user.token!)
      dispatch(addUser(res.user))
      navigate('/articles')
    } catch (e: any) {
      if (e?.data?.errors?.email) {
        setErrorArray((prev) => [
          ...prev,
          { name: 'email', option: { type: 'server', message: `Email ${e.data.errors.email}` } },
        ])
      }
      if (e?.data?.errors?.username) {
        setErrorArray((prev) => [
          ...prev,
          { name: 'username', option: { type: 'server', message: `Username ${e.data.errors.username}` } },
        ])
      }
    }
  }
  // if (isError) {
  //   return <Error error={error} />
  // }

  const bot = (
    <>
      Already have an account? <Link to="/sign-in">Sign In.</Link>
    </>
  )
  return (
    <UserForm<SignUpData>
      title="Create new account"
      botCaption={bot}
      resolver={yupResolver(signUpSchema)}
      onSubmit={onSubmit}
      serverErrors={errorArray}
      button="Create"
      isLoading={isLoading}
    >
      <Input title="Username" placeholder="Username" name="username" />
      <Input title="Email" placeholder="Email" name="email" />
      <Input type="password" title="Password" placeholder="Password" name="password" />
      <Input type="password" title="Repeat Password" placeholder="Password" name="repeatPassword" />
      <Checkbox name="agreement" title="I agree to the processing of my personal information" />
    </UserForm>
  )
}

export default SignUpPage
