export interface StatusType {
  id: number
  param: 'ex_pend' | 'ex_cs'
  label: string
}

export const StatusTypes: StatusType[] = [
  {
    id: 11,
    param: 'ex_cs',
    label: 'Include Coming Soon'
  },
  {
    id: 2,
    param: 'ex_pend',
    label: 'Include Pending'
  }
]
