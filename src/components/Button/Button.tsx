import React, { FC, HTMLProps } from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  title: string | undefined
  type: ButtonTypes
  btnSize?: ButtonSizes
  submit?: boolean
  isLoading?: boolean
}

type ButtonTypes = 'Danger' | 'Outlined' | 'Success' | 'Black' | 'Primary' | 'Text'
type ButtonSizes = 'sm' | 'smLong' | 'md' | 'lg'

const Button: FC<ButtonProps> = ({ title, type, btnSize = 'lg', isLoading = false, submit = false, ...rest }) => {
  const classesBtn = classNames({
    [styles.btn]: true,
    [styles[btnSize]]: true,
    [styles[`btn${type}`]]: true,
    [styles.loading]: isLoading,
  })

  return (
    <button {...rest} type={submit ? 'submit' : 'button'} className={classesBtn}>
      {title}
    </button>
  )
}

export default Button
