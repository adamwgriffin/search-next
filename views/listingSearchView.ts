import type { ListingSearchAggregateResult } from '../models/ListingModel'
import type { PaginationParams } from '../zod_schemas/listingSearchParamsSchema'
import type {
  ListingResultWithSelectedFields,
  ListingSearchResponse
} from '../types/listing_search_response_types'

const listingSearchView = <T = ListingResultWithSelectedFields>(
  results: ListingSearchAggregateResult<T>,
  pagination: PaginationParams
): ListingSearchResponse<T> => {
  const { listings, metadata } = results[0]
  const numberAvailable = metadata[0]?.numberAvailable || 0
  return {
    listings: listings,
    pagination: {
      page: pagination.page_index,
      pageSize: pagination.page_size,
      numberReturned: listings.length,
      numberAvailable: numberAvailable,
      numberOfPages: Math.ceil(numberAvailable / pagination.page_size)
    }
  }
}

export default listingSearchView
