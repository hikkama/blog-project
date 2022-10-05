import { Button } from 'antd'

import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div>Realworld Blog</div> {/* Link Router*/}
      <div className={styles.loginBtns}>
        <Button type="text">Sign In</Button> {/* Link Router */}
        <button>Sign Up</button> {/* Link Router */}
      </div>
    </header>
  )
}

export default Header
