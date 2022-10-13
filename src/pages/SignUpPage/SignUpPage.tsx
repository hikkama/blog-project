import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from '../../components/Form/Input/Input'
import { useCreateUserMutation } from '../../services/BlogService'
import Form, { ErrorData } from '../../components/Form/Form'
import signUpSchema from '../../schemes/signUpSchema'
import Checkbox from '../../components/Form/Checkbox/Checkbox'

type SignUpData = {
  username: string
  email: string
  password: string
  repeatPassword: string
  agreement: boolean
}

const SignUpPage = () => {
  const [createUser, { isLoading }] = useCreateUserMutation()
  const [errorArray, setErrorArray] = useState<ErrorData<SignUpData>[]>([])
  const navigate = useNavigate()

  const onSubmit = async ({ username, email, password }: SignUpData) => {
    const user = { username, email, password }
    try {
      const res = await createUser({ user }).unwrap()
      localStorage.setItem('token', res.user.token!)
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

  const bot = (
    <>
      Already have an account? <Link to="/sign-in">Sign In.</Link>
    </>
  )
  return (
    <Form<SignUpData>
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
    </Form>
  )
}

export default SignUpPage
