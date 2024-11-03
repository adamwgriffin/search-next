import type { ListingAddress } from '../zod_schemas/listingSchema'
import type {
  IListing,
  PhotoGalleryImage,
  PropertDetailsSection,
  PropertDetail,
  PropertyStatus,
  OpenHouse,
} from '../models/ListingModel'
import type { Point, Polygon, MultiPolygon } from '@turf/turf'
import { bbox, randomPoint, booleanPointInPolygon } from '@turf/turf'
import { faker } from '@faker-js/faker'
import { subMonths, addHours, addMonths } from 'date-fns'
import {
  reverseGeocode,
  addressComponentsToListingAddress,
  getNeighborhoodFromAddressComponents
} from '../lib/geocoder'
import {
  PropertyTypes,
  PropertyStatuses,
  RentalPropertyStatuses
} from '../models/ListingModel'
import { listingAddressHasRequiredFields } from './listing_search_helpers'

export const AddressComponentAddressTemplate: ListingAddress = Object.freeze({
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip: ''
})

export const randomPointsWithinPolygon = (
  polygon: Polygon | MultiPolygon,
  numPoints: number
) => {
  const points: Point[] = []
  const bounds = bbox(polygon)
  while (points.length < numPoints) {
    const point = randomPoint(1, { bbox: bounds }).features[0]
    if (booleanPointInPolygon(point, polygon)) {
      points.push(point.geometry)
    }
  }
  return points
}

export const roundDownToNearest = (num: number, nearest: number): number => {
  return Math.floor(num / nearest) * nearest
}

export const randomNumberInRangeRounded = (
  min: number,
  max: number,
  roundTo: number
): number => {
  return roundDownToNearest(faker.number.int({ min, max }), roundTo)
}

export const addSoldData = (listing: IListing): IListing => {
  const today = new Date()
  const soldDate = faker.date.between({
    from: listing.listedDate,
    to: today
  })
  return {
    ...listing,
    soldPrice: randomNumberInRangeRounded(
      listing.listPrice - 5000,
      listing.listPrice + 5000,
      1000
    ),
    soldDate
  }
}

const getListPrice = (rental: boolean): number => {
  return rental
    ? randomNumberInRangeRounded(1000, 5000, 1000)
    : randomNumberInRangeRounded(100000, 800000, 1000)
}

const getStatus = (rental: boolean): PropertyStatus => {
  const statuses = rental ? RentalPropertyStatuses : PropertyStatuses
  return faker.helpers.arrayElement(statuses)
}

const createPhotoGallery = (numberOfImages: number): PhotoGalleryImage[] => {
  const lock = faker.number.int()
  const images = []
  for (let i = 0; i < numberOfImages; i++) {
    images.push({
      galleryUrl: `https://loremflickr.com/1920/1080/house?lock=${lock + i}`,
      fullUrl: `https://loremflickr.com/853/480/house?lock=${lock + i}`,
      smallUrl: `https://loremflickr.com/533/300/house?lock=${lock + i}`,
      caption: faker.lorem.words({ min: 4, max: 10 })
    })
  }
  return images
}

const randomWordArray = (min: number, max: number): string[] => {
  const numberOfWords = faker.number.int({ min, max })
  return Array.from({ length: numberOfWords }, () => faker.lorem.word())
}

const titleCase = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const generateRandomTitle = (min: number, max: number): string => {
  return randomWordArray(min, max)
    .map((w) => titleCase(w))
    .join(' ')
}

const createPropertyDetail = (): PropertDetail => {
  return {
    name: generateRandomTitle(1, 3),
    details: randomWordArray(1, 6).map((w) => titleCase(w))
  }
}

const createPropertDetailsSection = (): PropertDetailsSection => {
  const numberOfDetails = faker.number.int({ min: 2, max: 6 })
  return {
    name: generateRandomTitle(1, 3),
    description: titleCase(faker.lorem.words({ min: 4, max: 6 })),
    details: Array.from({ length: numberOfDetails }, () => {
      return createPropertyDetail()
    })
  }
}

const createPropertyDetails = (
  numberOfSections: number
): PropertDetailsSection[] => {
  return Array.from({ length: numberOfSections }, () => {
    return createPropertDetailsSection()
  })
}

const createOpenHouse = (listedDate: Date): OpenHouse => {
  const start = faker.date.between({
    from: listedDate,
    to: addMonths(listedDate, 4)
  })
  const hoursToAdd = faker.number.int({ min: 1, max: 6 })
  const end = addHours(start, hoursToAdd)
  return {
    start,
    end,
    comments: faker.lorem.sentence()
  }
}

const createOpenHouses = (
  numberOfOpenHouses: number,
  listedDate: Date
): OpenHouse[] => {
  const openHouses = Array.from({ length: numberOfOpenHouses }, () => {
    return createOpenHouse(listedDate)
  })
  return openHouses.sort((a, b) => a.start.getTime() - b.start.getTime())
}

export const createRandomListingModel = (
  address: Partial<ListingAddress>,
  neighborhood: string,
  point: Point,
  placeId: IListing['placeId']
): IListing => {
  const today = new Date()
  const rental = faker.datatype.boolean({ probability: 0.5 })
  const listing: IListing = {
    listPrice: getListPrice(rental),
    listedDate: faker.date.between({
      from: subMonths(today, 6),
      to: today
    }),
    address: { ...AddressComponentAddressTemplate, ...address },
    geometry: point,
    placeId,
    neighborhood: neighborhood,
    propertyType: faker.helpers.arrayElement(PropertyTypes),
    status: getStatus(rental),
    description: faker.lorem.sentences({ min: 1, max: 3 }),
    beds: faker.number.int({ min: 2, max: 5 }),
    baths: faker.number.int({ min: 1, max: 4 }),
    sqft: randomNumberInRangeRounded(1000, 5000, 100),
    lotSize: randomNumberInRangeRounded(1000, 7500, 100),
    yearBuilt: faker.number.int({ min: 1910, max: today.getFullYear() }),
    waterfront: faker.datatype.boolean({ probability: 0.3 }),
    view: faker.datatype.boolean({ probability: 0.5 }),
    fireplace: faker.datatype.boolean({ probability: 0.7 }),
    basement: faker.datatype.boolean({ probability: 0.8 }),
    garage: faker.datatype.boolean({ probability: 0.9 }),
    newConstruction: faker.datatype.boolean({ probability: 0.4 }),
    pool: faker.datatype.boolean({ probability: 0.2 }),
    airConditioning: faker.datatype.boolean({ probability: 0.3 }),
    photoGallery: createPhotoGallery(faker.number.int({ min: 2, max: 5 })),
    propertyDetails: createPropertyDetails(
      faker.number.int({ min: 4, max: 12 })
    )
  }
  if (rental) {
    listing.rental = true
    return listing
  }
  if (listing.status === 'sold') {
    return addSoldData(listing)
  }
  if (listing.status === 'active' && !listing.rental) {
    listing.openHouses = createOpenHouses(
      faker.number.int({ min: 1, max: 3 }),
      listing.listedDate
    )
  }
  return listing
}

export const createListing = async (point: Point): Promise<IListing | undefined> => {
  const res = await reverseGeocode(point.coordinates[1], point.coordinates[0])
  const geocoderResult = res.data.results[0]
  if (!geocoderResult?.address_components) {
    console.warn(
      `No address_components found for reverseGeocode of ${point.coordinates}. No model created.`
    )
    return
  }
  const neighborhood = getNeighborhoodFromAddressComponents(
    geocoderResult.address_components
  )
  if (neighborhood === '' || neighborhood === undefined) {
    console.warn(
      `No neighborhood found for reverseGeocode of ${point.coordinates}. No model created.`
    )
    return
  }
  const address = addressComponentsToListingAddress(
    geocoderResult.address_components
  )
  if (!listingAddressHasRequiredFields(address)) {
    console.warn(`All required address fields are not present. No model created.`)
    return
  }
  return createRandomListingModel(
    address,
    neighborhood,
    point,
    geocoderResult.place_id
  )
}

const generateListingData = async (
  polygon: Polygon | MultiPolygon,
  amount: number
) => {
  const points = randomPointsWithinPolygon(polygon, amount)
  const listings = await Promise.all(
    points.map(async (point) => await createListing(point))
  )
  return listings.filter(Boolean)
}

export default generateListingData
