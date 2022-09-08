// have to use Omit to remove geometry since you apparently can't just override it by re-defining it
export interface SerializedPlaceResult extends Omit<google.maps.places.PlaceResult, 'geometry'> {
  geometry: {
    location: google.maps.LatLngLiteral | undefined
    viewport: google.maps.LatLngBoundsLiteral | undefined
  }
}

export interface PlaceDetailsResponse {
  results: SerializedPlaceResult
  status: google.maps.places.PlacesServiceStatus
}

// since we are using redux for state management we want to serialize the response from the places service as plain
// javascript objects. redux will give a warning about using complex objects otherwise. location and viewport are
// returned as instances of LatLng & LatLngBounds so we convert them to their POJO equivalents LatLngLiteral &
// LatLngBoundsLiteral with toJSON().
const serializeGetDetailsResponse = (
  result: google.maps.places.PlaceResult | null = {}
): SerializedPlaceResult => {
  return {
    ...result,
    geometry: {
      location: result?.geometry?.location?.toJSON(),
      viewport: result?.geometry?.viewport?.toJSON()
    }
  }
}

// PlacesService doesn't support the promise API yet, so we're wrapping the callback request in a promise
export const getPlaceDetails = (
  request: google.maps.places.PlaceDetailsRequest,
  placesService: google.maps.places.PlacesService
): Promise<PlaceDetailsResponse> => {
  return new Promise((resolve, reject) => {
    placesService.getDetails(request, (results, status) => {
      status === 'OK'
        ? resolve({ results: serializeGetDetailsResponse(results), status })
        : reject(new Error(status))
    })
  })
}

