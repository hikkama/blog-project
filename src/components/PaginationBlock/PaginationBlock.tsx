import React, { FC } from 'react'
import { Pagination } from 'antd'

import styles from './PaginationBlock.module.scss'

const PaginationBlock: FC = () => {
  return (
    <div className={styles.pagination}>
      <Pagination size="small" showSizeChanger={false} pageSize={20} current={1} />
    </div>
  )
}

export default PaginationBlock
