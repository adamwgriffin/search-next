import http from '../../lib/http'

export async function geoLayerSearch(
  baseUrl: string,
  params: object
): Promise<{ data: { status: string; data: object } }> {
  const res = await http({ url: `${baseUrl}/listing/geo/layer/search`, params })
  return res.data
}
