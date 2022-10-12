import { Outlet } from 'react-router-dom'

import Header from '../Header'

import styles from './Layout.module.scss'

const Layout = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout
