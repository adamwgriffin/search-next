import type { NextApiRequest, NextApiResponse } from 'next'
import type { Listing } from '../../../types/listing_types'
import http from '../../../lib/http'

export type GetListingsByIdsResponse = {
  listings: Listing[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetListingsByIdsResponse>
) {
  const response = await http.get<GetListingsByIdsResponse>(
    `${process.env.SERVICE_BASE}/listings/${req.query.listing_ids}`
  )
  res.status(200).json(response.data)
}
