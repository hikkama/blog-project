import React, { ReactElement, useEffect } from 'react'
import { FieldValues, useForm, Resolver, Path, DeepPartial } from 'react-hook-form'

import FieldsWrapper from '../FieldsWrapper/FieldsWrapper'
import Button from '../../Button/Button'

import styles from './UserForm.module.scss'

interface FormComponentProps<T extends FieldValues> {
  title: string
  onSubmit: (data: T) => void
  children: ReactElement[]
  resolver: Resolver<T> | undefined
  botCaption?: JSX.Element | null
  serverErrors?: ErrorData<T>[]
  defaultValues?: DeepPartial<T>
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

const UserForm = <T extends Record<string, any>>({
  title,
  botCaption = null,
  onSubmit,
  children,
  resolver,
  serverErrors = undefined,
  button,
  isLoading,
  defaultValues = undefined,
  ...rest
}: FormComponentProps<T>): JSX.Element => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<T>({ mode: 'all', resolver, defaultValues })

  useEffect(() => {
    if (!serverErrors) return

    serverErrors.map((error) => setError(error.name, error.option))
  }, [serverErrors])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} {...rest}>
      <h3 className={styles.title}>{title}</h3>
      <FieldsWrapper>
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
        <Button
          title={button}
          type="Primary"
          disabled={!isValid || isLoading}
          btnSize="md"
          isLoading={isLoading}
          submit
        />
        <div className={styles.botCaption}>{botCaption}</div>
      </FieldsWrapper>
    </form>
  )
}

export default UserForm
