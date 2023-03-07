import type { NextPage } from 'next'
import type { Feature } from '../../../../lib/types/listing_types'
import { Fragment } from 'react'
import styles from './PropertyDetails.module.css'
import ShowMore from '../../../design_system/ShowMore'

export interface PropertyDetailsProps {
  features: Feature[]
}

const PropertyDetails: NextPage<PropertyDetailsProps> = ({ features }) => {
  return (
    <ShowMore>
      <h4>Property Details</h4>
      {features.map(({ feature_description, featureid, subfeatures }) => (
        <Fragment key={featureid.toString()}>
          <h5 className={styles.feature}>{feature_description}</h5>
          <ul className={styles.subfeatures}>
            {subfeatures.map(({ subfeature_name, subfeatureid }) => (
              <li key={subfeatureid.toString()}>
                <div className={styles.subfeatureName}>{subfeature_name}</div>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </ShowMore>
  )
}

export default PropertyDetails
