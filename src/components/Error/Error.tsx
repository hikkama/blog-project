import React, { FC } from 'react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { Alert } from 'antd'

interface ErrorComponentProps {
  error: FetchBaseQueryError | SerializedError | undefined
}

const Error: FC<ErrorComponentProps> = ({ error }) => {
  if ('status' in error!) {
    return (
      <Alert
        style={{ marginBottom: 20 }}
        message={`Error: ${error.status} `}
        description="Please try again later or reload"
        type="error"
        showIcon
      />
    )
  }
  return (
    <Alert
      style={{ marginBottom: 20 }}
      message="Unknown Error"
      description="Please try again later or reload"
      type="error"
      showIcon
    />
  )
}

export default Error
