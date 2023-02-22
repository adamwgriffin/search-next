import type { NextPage } from 'next'

export interface ErrorModalProps {
  modalOpen: boolean
  message: string
}

const ErrorModal: NextPage<ErrorModalProps> = ({ message, modalOpen }) => {
  return <div>{ message }</div>
}

export default ErrorModal
