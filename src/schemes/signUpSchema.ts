import * as yup from 'yup'

const signUpSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .min(3, 'Your username needs to be at least 3 characters.')
      .max(20, 'Your username needs to be less than 20 characters.')
      .required('Username is required'),
    email: yup.string().email('Email address is invalid').required('Email address is required'),
    password: yup
      .string()
      .min(6, 'Your password needs to be at least 6 characters.')
      .max(40, 'Your password needs to be less then 40 characters.')
      .required('Password is required'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Passwords must match'),
    agreement: yup.boolean().oneOf([true], 'Agreement is required'),
  })
  .required()

export default signUpSchema
