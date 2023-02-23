import type { NextPage } from 'next'

export interface ErrorModalProps {
  message: string
}

const ErrorModal: NextPage<ErrorModalProps> = ({ message }) => {
  return <div>{ message }</div>
}

export default ErrorModal
