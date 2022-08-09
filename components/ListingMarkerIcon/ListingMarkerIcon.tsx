import type { NextPage } from 'next'

export interface ListingMarkerIconProps {
  fill: string
}

const ListingMarkerIcon: NextPage<ListingMarkerIconProps> = ({ fill }) => {
  return (
    <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7" fill={fill} stroke="white" strokeWidth="2"></circle>
    </svg>
  )
}

export default ListingMarkerIcon
