import React, { ReactElement, useEffect } from 'react'
import { FieldValues, useForm, Resolver, Path } from 'react-hook-form'
import classNames from 'classnames'
import { Alert } from 'antd'

import styles from './Form.module.scss'

interface FormComponentProps<T extends FieldValues> {
  title: string
  onSubmit: (data: T) => void
  children: ReactElement[]
  resolver: Resolver<T> | undefined
  botCaption?: JSX.Element | null
  serverErrors?: ErrorData<T>[]
  button: string
  isLoading: boolean
  isSuccess?: boolean
}

export interface ErrorData<T> {
  name: Path<T>
  option: {
    type: string
    message: string
  }
}

const Form = <T extends Record<string, unknown>>({
  title,
  botCaption = null,
  onSubmit,
  children,
  resolver,
  serverErrors = undefined,
  button,
  isLoading,
  isSuccess = false,
  ...rest
}: FormComponentProps<T>): JSX.Element => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<T>({ mode: 'all', resolver })

  useEffect(() => {
    if (!serverErrors) return

    serverErrors.map((error) => setError(error.name, error.option))
  }, [serverErrors])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} {...rest}>
      <h3 className={styles.title}>{title}</h3>

      {React.Children.map(children, (child) => {
        if (child && child.props.name) {
          return React.createElement(child.type, {
            ...{
              ...child.props,
              register,
              key: child.props.name,
              errors: errors[child.props.name],
            },
          })
        }
        return child
      })}

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className={classNames({
          [styles.btn]: true,
          [styles.btnLoading]: isLoading,
        })}
      >
        <span className={styles.btnText}>{button}</span>
      </button>
      {isSuccess && <Alert message="Successfully updated" type="success" showIcon />}
      <div className={styles.botCaption}>{botCaption}</div>
    </form>
  )
}

export default Form
