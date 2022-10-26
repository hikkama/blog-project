import * as yup from 'yup'

const editProfileSchema = yup
  .object()
  .shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Email address is invalid').required('Email address is required'),
    password: yup.string().min(6, 'Your password needs to be at least 6 characters.').required('Password is required'),
    image: yup.string().url('Must be the correct url'),
  })
  .required()

export default editProfileSchema
