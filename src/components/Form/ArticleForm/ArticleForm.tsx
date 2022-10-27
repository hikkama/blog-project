import { FC } from 'react'
import { FieldError, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ArticleFormData } from '../../../models/articles'
import articleSchema from '../../../schemes/articleSchema'
import Input from '../Input'
import TextArea from '../TextArea'
import Button from '../../UI/Button'
import FieldsWrapper from '../FieldsWrapper'

import styles from './ArticleForm.module.scss'

interface ArticleFormProps {
  defaultValues?: ArticleFormData
  onSubmit: any
  title: string
  isLoading?: boolean
}

const resolver = yupResolver(articleSchema)

const ArticleForm: FC<ArticleFormProps> = ({ defaultValues = {}, isLoading = false, title, onSubmit, ...rest }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ArticleFormData>({ mode: 'all', resolver, defaultValues })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} {...rest}>
      <h3 className={styles.title}>{title}</h3>
      <FieldsWrapper>
        <Input<ArticleFormData>
          name="title"
          title="Title"
          placeholder="Title"
          errors={errors.title}
          register={register}
        />
        <Input<ArticleFormData>
          name="description"
          title="Short description"
          placeholder="Title"
          errors={errors.description}
          register={register}
        />
        <TextArea<ArticleFormData>
          name="body"
          title="Text"
          placeholder="Text"
          errors={errors.body}
          register={register}
        />

        <fieldset>
          <legend className={styles.legend}>Tags</legend>
          <div className={fields.length > 0 ? styles.tagBlock : ''}>
            <div className={styles.tagWrapper}>
              {fields.map((field, index) => {
                const error: FieldError | undefined =
                  errors.tagList && errors.tagList[index] ? { type: 'no value' } : undefined
                return (
                  <div key={field.id} className={styles.tagGroup}>
                    <Input<ArticleFormData>
                      name={`tagList.${index}.value`}
                      placeholder="Tag"
                      register={register}
                      errors={error}
                    />
                    <Button
                      title="Delete"
                      btnSize="md"
                      type="Danger"
                      onClick={() => {
                        remove(index)
                      }}
                    />
                  </div>
                )
              })}
            </div>
            <Button title="Add Tag" type="Outlined" btnSize="md" onClick={() => append({ value: '' })} />
          </div>
        </fieldset>

        <Button
          title="Send"
          disabled={!isValid || isLoading}
          isLoading={isLoading}
          btnSize="md"
          type="Primary"
          submit
        />
      </FieldsWrapper>
    </form>
  )
}

export default ArticleForm
