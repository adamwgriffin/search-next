import type { NextApiRequest, NextApiResponse } from 'next'
import type { GetListingsResponse } from '../../../store/user/userSlice'
import http from '../../../lib/http'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetListingsResponse>
) {
  const response = await http({
    url: `${process.env.SERVICE_BASE}/listings/${req.query.listing_ids}`
  })
  res.status(200).json(response.data)
}
