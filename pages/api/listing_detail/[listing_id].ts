import type { NextApiRequest, NextApiResponse } from 'next'
import type { ListingDetail } from '../../../lib/types/listing_types'
import http from '../../../lib/http'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListingDetail>
) {
  const { listing_id } = req.query
  const response = await http({
    url: `${process.env.SERVICE_BASE}/listing/${listing_id}`
  })
  res.status(response.status).json(response.data)
}
