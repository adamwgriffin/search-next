import type { NextPage } from 'next'
import type { ListingDetailListing } from '../../../../lib/types/listing_types'
import css from 'styled-jsx/css'

export interface HomeHighlightsProps {
  listing: ListingDetailListing
}

const HomeHighlights: NextPage<HomeHighlightsProps> = ({
  listing
}) => {
  return (
    <>
      <div>
        <h4 className='heading'>Home Highlights</h4>
        <ul className='detailsList'>
          <li>
            <div className='detailsName'>Property Type</div>
            <div>{listing.property_type}</div>
          </li>
          {listing.days_on_market && (
            <li>
              <div className='detailsName'>Time on Site</div>
              <div>
                {`${listing.days_on_market.toLocaleString()} ${
                  listing.days_on_market > 1 ? 'days' : 'day'
                }`}
              </div>
            </li>
          )}
          <li>
            <div className='detailsName'>Year Built</div>
            <div>{listing.year_build}</div>
          </li>
          <li>
            <div className='detailsName'>MLS Number</div>
            <div>{listing.mlsnumber}</div>
          </li>
        </ul>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

const styles = css`
  .heading {
    margin-top: 0;
  }

  .detailsList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .detailsList > li {
    display: grid;
    grid-template-columns: minmax(100px, 34%) auto;
    grid-template-rows: auto auto;
  }

  .detailsName {
    color: #767676;
  }
`

export default HomeHighlights
