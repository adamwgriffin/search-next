import type { NextApiRequest, NextApiResponse } from 'next'
import http from '../../../lib/http'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { listing_id, ...params } = req.query
  const response = await http({
    url: `${process.env.SERVICE_BASE}/service/v1/listing/${listing_id}`,
    params
  })
  // the response will often return 200 even if it was not successful. checking this status field seems to be more
  // reliable
  const status = response.data.status === 'success' ? 200 : 500
  res.status(status).json(response.data)
}
