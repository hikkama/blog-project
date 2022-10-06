import React from 'react'
import { Link } from 'react-router-dom'

import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Something&apos;s wrong here...</h2>
      <div className={styles.desc}>We can&apos;t find the page you&apos;re looking for.</div>
      <Link className={styles.btn} to="/">
        Go home
      </Link>
    </div>
  )
}

export default NotFound
