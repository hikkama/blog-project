import { TextareaHTMLAttributes } from 'react'
import classNames from 'classnames'
import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

import styles from './TextArea.module.scss'

interface TextAreaProps<T extends FieldValues> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: Path<T>
  title: string
  register?: UseFormRegister<T> | null
  rules?: RegisterOptions
  errors?: FieldError | undefined
}

const TextArea = <T extends Record<string, unknown>>({
  name,
  title,
  register = null,
  rules = undefined,
  errors = undefined,
  ...rest
}: TextAreaProps<T>) => {
  return (
    <label className={styles.label}>
      <span className={styles.inputTitle}>{title}</span>
      <textarea
        className={classNames({
          [styles.textarea]: true,
          [styles.textareaErr]: errors,
        })}
        {...(register && register(name, rules))}
        {...rest}
      />
      {errors?.message && <span className={styles.error}>{errors?.message || 'Error'}</span>}
    </label>
  )
}

export default TextArea
