import type { NextApiRequest, NextApiResponse } from 'next'
import type { IListingDetail } from '../../../lib/types/listing_types'
import http from '../../../lib/http'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IListingDetail>
) {
  const { listing_id } = req.query
  const response = await http({
    url: `${process.env.SERVICE_BASE}/listing/${listing_id}`
  })
  res.status(200).json(response.data)
}
