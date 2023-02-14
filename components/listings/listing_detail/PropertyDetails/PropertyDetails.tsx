import type { NextPage } from 'next'
import type { Feature } from '../../../../lib/types/listing_types'
import css from 'styled-jsx/css'
import ShowMore from '../../../design_system/ShowMore'

export interface PropertyDetailsProps {
  features: Feature[]
}

const PropertyDetails: NextPage<PropertyDetailsProps> = ({ features }) => {
  return (
    <>
      <ShowMore>
        <h4 className='heading'>Property Details</h4>
        {features.map(({ feature_description, featureid, subfeatures }) => (
          <>
            <h5 className='feature' key={featureid.toString()}>
              {feature_description}
            </h5>
            <ul className='subfeatures'>
              {subfeatures.map(({ subfeature_name, subfeatureid }) => (
                <li key={subfeatureid.toString()}>
                  <div className='subfeatureName'>{subfeature_name}</div>
                </li>
              ))}
            </ul>
          </>
        ))}
      </ShowMore>
      <style jsx>{styles}</style>
    </>
  )
}

const styles = css`
  .feature {
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .subfeatures {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    margin: 0;
    padding: 0 1rem
  }

  .subfeatures > li {
    display: grid;
    grid-template-columns: minmax(6.25rem, auto);
  }

  .subfeatureName {
    font-size: 0.875rem;
    color: #767676;
  }
`

export default PropertyDetails
