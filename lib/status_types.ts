export interface StatusType {
  id: number
  name: string
  label: string
  selected: boolean
}

export const StatusTypes: StatusType[] = [
  {
    id: 11,
    name: 'coming_soon',
    label: 'Coming Soon',
    selected: false
  },
  {
    id: 1,
    name: 'active',
    label: 'Active',
    selected: true
  },
  {
    id: 2,
    name: 'pending',
    label: 'Pending',
    selected: false
  }
]
