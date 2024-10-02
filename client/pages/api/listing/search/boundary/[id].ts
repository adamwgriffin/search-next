import type { NextApiRequest, NextApiResponse } from 'next'
import http from '../../../../../lib/http'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, ...params } = req.query
  const response = await http({
    url: `${process.env.SERVICE_BASE}/listing/search/boundary/${id}`,
    params
  })
  res.status(200).json(response.data)
}
