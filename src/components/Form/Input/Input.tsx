import React, { FC, InputHTMLAttributes, ReactNode } from 'react'
import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'
import classNames from 'classnames'

import styles from './Input.module.scss'

interface FormFieldProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>
  title?: string
  register?: UseFormRegister<T> | null
  rules?: RegisterOptions
  errors?: FieldError | undefined
}

const Input = <T extends Record<string, unknown>>({
  name,
  title = undefined,
  errors = undefined,
  register = null,
  rules = undefined,
  ...rest
}: FormFieldProps<T>) => {
  return (
    <label className={styles.label}>
      <span className={styles.inputTitle}>{title}</span>
      <input
        className={classNames({
          [styles.input]: true,
          [styles.inputErr]: errors,
        })}
        {...(register && register(name, rules))}
        {...rest}
      />
      {errors?.message && <span className={styles.error}>{errors?.message || 'Error'}</span>}
    </label>
  )
}

export default Input
