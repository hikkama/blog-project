import React, { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

import { useUpdateUserMutation } from '../../services/BlogService'
import Form, { ErrorData } from '../../components/Form/Form'
import signInSchema from '../../schemes/signInSchema'
import Input from '../../components/Form/Input/Input'
import { addUser } from '../../store/reducers/blogSlice'
import { useAppDispatch } from '../../hooks/redux'
import Error from '../../components/Error'

type ProfileData = {
  username: string
  email: string
  newPassword: string
  avatar: string
}
// 1232421
const ProfilePage = () => {
  const [updateUser, { data: user, isLoading, isSuccess, isError, error }] = useUpdateUserMutation()
  const dispatch = useAppDispatch()
  const [errorArray, setErrorArray] = useState<ErrorData<ProfileData>[]>([])

  const onSubmit = async (data: ProfileData) => {
    const token = localStorage.getItem('token')
    try {
      console.log(data)
      const res = await updateUser({ user: data, token: token! }).unwrap()
      dispatch(addUser({ ...res.user, image: data.avatar }))
    } catch (e: any) {
      console.log(e)
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

  if (isError) {
    return <Error error={error} />
  }

  return (
    <>
      <Form<ProfileData>
        title="Edit profile"
        resolver={yupResolver(signInSchema)}
        onSubmit={onSubmit}
        serverErrors={errorArray}
        button="Save"
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        <Input title="Username" placeholder="Username" name="username" />
        <Input title="Email" placeholder="Email" name="email" />
        <Input type="password" title="Password" placeholder="Password" name="password" />
        <Input title="Avatar img(url)" placeholder="Avatar image" name="avatar" />
      </Form>
    </>
  )
}

export default ProfilePage
