import { Link } from 'react-router-dom'

import AuthBlock from './AuthBlock'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.title} to="/articles">
        Realworld Blog
      </Link>
      <AuthBlock />
    </header>
  )
}

export default Header
