import { Outlet } from 'react-router-dom'
import { Offline, Online } from 'react-detect-offline'
import { useEffect } from 'react'
import { Alert } from 'antd'

import { useAppDispatch } from '../../hooks/redux'
import { useLazyGetCurrentUserQuery } from '../../api/Blog.api'
import { addUser } from '../../store/reducers/blogSlice'
import Header from '../Header'
import Error from '../../components/Error'

import styles from './Layout.module.scss'

const Layout = () => {
  const token = localStorage.getItem('token')
  const dispatch = useAppDispatch()
  const [getUser, { data: user, isError: isUserError, error: userError, endpointName: userEndpointName }] =
    useLazyGetCurrentUserQuery()

  useEffect(() => {
    if (!token) return
    ;(async () => {
      await getUser(token)
    })()
  }, [token])

  useEffect(() => {
    if (!user) return

    dispatch(addUser(user.user))
  }, [user])

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main>
          <Online>
            {isUserError && <Error error={userError} endpointName={userEndpointName} />}
            <Outlet />
          </Online>
          <Offline>
            <Alert
              style={{ width: '500px', margin: '100px auto' }}
              message="No Internet Connection. Please try again later."
              type="error"
              showIcon
            />
          </Offline>
        </main>
      </div>
    </>
  )
}

export default Layout
