import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

import { useUpdateUserMutation } from '../../services/BlogService'
import UserForm, { ErrorData } from '../../components/Form/UserForm/UserForm'
import editProfileSchema from '../../schemes/editProfileSchema'
import Input from '../../components/Form/Input/Input'
import { addUser } from '../../store/reducers/blogSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { UserData } from '../../models/user'
import Error from '../../components/Error'
import { successMessage } from '../../components/InfoMessages'

type ProfileData = Partial<UserData>

const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const { user: userState } = useAppSelector((state) => state.blogReducer)
  const [updateUser, { isLoading, isSuccess, error, endpointName }] = useUpdateUserMutation()
  const [errorArray, setErrorArray] = useState<ErrorData<ProfileData>[]>([])

  const onSubmit = async (data: ProfileData) => {
    const token = localStorage.getItem('token')
    try {
      const res = await updateUser({ user: data, token: token! }).unwrap()
      dispatch(addUser({ ...res.user, image: data.image }))
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

  if (isSuccess) {
    successMessage('Successfully updated')
  }

  return (
    <>
      <UserForm<ProfileData>
        defaultValues={userState}
        title="Edit profile"
        resolver={yupResolver(editProfileSchema)}
        onSubmit={onSubmit}
        serverErrors={errorArray}
        button="Save"
        isLoading={isLoading}
      >
        <Input title="Username" placeholder="Username" name="username" />
        <Input title="Email" placeholder="Email" name="email" />
        <Input type="password" title="Password" placeholder="Password" name="password" />
        <Input title="Avatar img(url)" placeholder="Avatar image" name="image" />
      </UserForm>
    </>
  )
}

export default ProfilePage
