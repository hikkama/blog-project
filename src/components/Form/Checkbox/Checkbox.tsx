import React, { FC } from 'react'
import { FieldError, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

import styles from './Checkbox.module.scss'

interface CheckboxProps {
  name: string
  title: string
  register?: UseFormRegister<FieldValues> | null
  rules?: RegisterOptions
  errors?: FieldError
}

const Checkbox: FC<CheckboxProps> = ({
  name,
  title,
  rules = undefined,
  errors = undefined,
  register = null,
  ...rest
}) => {
  return (
    <label className={`${styles.label} ${styles.checkboxLabel}`}>
      <input {...(register && register(name, rules))} className={styles.check} type="checkbox" {...rest} />
      <span className={styles.checkbox}></span>
      <span className={styles.checkboxTitle}>{title}</span>
      {errors?.message && <div className={styles.error}>{errors?.message || 'Error'}</div>}
    </label>
  )
}

export default Checkbox
