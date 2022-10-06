import { format } from 'date-fns'

export default function formatDate(date: string): string | null {
  if (!date) {
    return null
  }

  const formatedDate = format(new Date(date), 'PPP')
  return formatedDate.replace(/\w\w,/g, ',')
}
