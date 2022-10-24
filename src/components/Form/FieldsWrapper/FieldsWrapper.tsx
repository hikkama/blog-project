import React, { FC } from 'react'

import styles from './FieldsWrapper.module.scss'

interface FieldsWrapperProps {
  children?: React.ReactNode | null
}

const FieldsWrapper: FC<FieldsWrapperProps> = ({ children = null }) => {
  return <div className={styles.column}>{children}</div>
}

export default FieldsWrapper
