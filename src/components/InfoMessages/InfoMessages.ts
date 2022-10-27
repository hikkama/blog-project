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
