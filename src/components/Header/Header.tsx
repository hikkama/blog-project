import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/articles">Realworld Blog</Link>
      <div className={styles.loginBtns}>
        <Link to="/sign-in">Sign In</Link>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </header>
  )
}

export default Header
