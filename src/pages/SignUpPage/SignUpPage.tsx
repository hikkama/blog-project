import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from '../../components/Form/Input'
import { useCreateUserMutation } from '../../api/Blog.api'
import UserForm, { ErrorData } from '../../components/Form/UserForm/UserForm'
import signUpSchema from '../../schemes/signUpSchema'
import Checkbox from '../../components/Form/Checkbox'
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
  const [createUser, { isLoading, error, endpointName }] = useCreateUserMutation()
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
      if (e.status === 422) {
        if ('email' in e.data.errors && 'username' in e.data.errors) {
          setErrorArray([
            { name: 'username', option: { type: 'server', message: `Username ${e.data.errors.username}` } },
            { name: 'email', option: { type: 'server', message: `Email ${e.data.errors.email}` } },
          ])
        } else {
          if (e?.data?.errors?.email) {
            setErrorArray([{ name: 'email', option: { type: 'server', message: `Email ${e.data.errors.email}` } }])
          }
          if (e?.data?.errors?.username) {
            setErrorArray([
              { name: 'username', option: { type: 'server', message: `Username ${e.data.errors.username}` } },
            ])
          }
        }
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
