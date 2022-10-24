import * as yup from 'yup'

const articleSchema = yup
  .object()
  .shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    body: yup.string().required('Text is required'),
    tagList: yup.array().of(
      yup.object().shape({
        value: yup.string().required(),
      })
    ),
  })
  .required()

export default articleSchema
