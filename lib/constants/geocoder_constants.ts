// the listing service has different names for most of the geo types for legacy reasons
export const GoogleToServiceAddressTypeMapping = Object.freeze({
  'administrative_area_level_1': 'AdminDivision1',
  'administrative_area_level_2': 'AdminDivision2',
  'administrative_area_level_3': 'AdminDivision3',
  'political': 'AdminDivision2',
  'country': 'AdminDivision1',
  'postal_code': 'Postcode1',
  'Postcode1': 'Postcode1',
  'neighborhood': 'Neighborhood',
  'colloquial_area': 'Neighborhood',
  'locality': 'PopulatedPlace',
  'PopulatedPlace': 'PopulatedPlace',
  'sublocality': 'Neighborhood',
  'street_address': 'Address',
  'route': 'Address',
  'intersection': 'Address',
  'park': 'Address',
  'point_of_interest': 'Address',
  'premise': 'Address',
  'subpremise': 'Address',
  'natural_feature': 'NaturalFeature',
  'Address': 'Address'
})
