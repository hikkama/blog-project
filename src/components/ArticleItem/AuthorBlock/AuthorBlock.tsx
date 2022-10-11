import { FC } from 'react'

import { UserData } from '../../../models/user'
import formatDate from '../../../utils/formatDate'

import styles from './AuthorBlock.module.scss'

interface AuthorBlockProps {
  author: UserData
  date?: string
}

const AuthorBlock: FC<AuthorBlockProps> = ({ author, date = '' }) => {
  return (
    <div className={styles.body}>
      <div className={styles.authorInfo}>
        <div className={styles.name}>{author.username}</div>
        {date && <div className={styles.date}>{formatDate(date)}</div>}
      </div>
      <div className={styles.avatar}>
        <img className={styles.img} src={author.image} alt="author" />
      </div>
    </div>
  )
}

export default AuthorBlock
