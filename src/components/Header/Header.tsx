import { Button } from 'antd'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/articles">Realworld Blog</Link>
      <div className={styles.loginBtns}>
        <Button type="text">Sign In</Button> {/* Link Router */}
        <button>Sign Up</button> {/* Link Router */}
      </div>
    </header>
  )
}

export default Header
