import http from '../../lib/http'

export async function searchListingsNonDedupe(baseUrl:string, params:object): Promise<{ data: object }> {
  const res = await http({ url: `${baseUrl}/listing/search`, params })
  return res.data
}
