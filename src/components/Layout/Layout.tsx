import { Outlet } from 'react-router-dom'
import { Offline, Online } from 'react-detect-offline'
import { Alert } from 'antd'

import Header from '../Header'

import styles from './Layout.module.scss'

const Layout = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <main>
          <Online>
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
