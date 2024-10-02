import type { NextApiRequest, NextApiResponse } from 'next'
import http from '../../../../lib/http'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await http({
    url: `${process.env.SERVICE_BASE}/listing/search/bounds`,
    params: req.query
  })
  res.status(200).json(response.data)
}
