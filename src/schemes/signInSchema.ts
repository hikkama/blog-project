import * as yup from 'yup'

const signInSchema = yup
  .object()
  .shape({
    email: yup.string().email('Email address is invalid').required('Email address is required'),
    password: yup.string().required('Password is required'),
  })
  .required()

export default signInSchema
