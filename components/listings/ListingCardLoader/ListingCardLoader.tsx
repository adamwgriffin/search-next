import type { NextPage } from 'next'
import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from './ListingCardLoader.module.css'

const ListingCardLoader: NextPage = () => (
  <div className={styles.listingCardLoader}>
    <ContentLoader
      width={'100%'}
      height={'100%'}
    >
      <rect x="0" y="0" width="100%" height="208" rx='0.5rem'/>      
      <rect x="16" y="226" width="50%" height="24" rx='0.375rem' />
      <rect x="16" y="262" width="36" height="16" rx='0.375rem' />
      <rect x="62" y="262" width="36" height="16" rx='0.375rem' />
      <rect x="108" y="262" width="56" height="16" rx='0.375rem' />
      <rect x="16" y="290" width="60%" height="16" rx='0.375rem' />
      <rect x="16" y="310" width="60%" height="16" rx='0.375rem' />
    </ContentLoader>
  </div>
)

export default ListingCardLoader
