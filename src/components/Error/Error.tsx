import { FC } from 'react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
import { Alert } from 'antd'

interface ErrorComponentProps {
  error: FetchBaseQueryError | SerializedError | undefined
  endpointName?: string | null
}

const Error: FC<ErrorComponentProps> = ({ error, endpointName = null }) => {
  console.log(error)
  if ('status' in error!) {
    return (
      <Alert
        style={{ marginBottom: 20 }}
        message={`Error: ${error.status} `}
        description={`Please try again later or reload. Error message - ${
          // @ts-ignore
          error.data?.errors?.message || error.error!
        }. ${endpointName ? `In this endpoint - ${endpointName}` : ''}`}
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
