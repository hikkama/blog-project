import { message } from 'antd'

message.config({
  top: 90,
  duration: 0.5,
  maxCount: 1,
})

export const warningMessage = (content: string) => {
  message.warning({
    content,
  })
}

export const successMessage = (content: string) => {
  message.success({
    content,
  })
}

export const errorMessage = (content: string) => {
  message.success({
    content,
  })
}
