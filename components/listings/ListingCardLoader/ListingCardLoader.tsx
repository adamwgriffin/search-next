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
      <rect x="0" y="0" width="100%" height="300" rx='0.8rem'/>      
      <rect x="0" y="310" width="50%" height="24" rx='0.375rem' />
      <rect x="0" y="344" width="36" height="16" rx='0.375rem' />
      <rect x="46" y="344" width="36" height="16" rx='0.375rem' />
      <rect x="92" y="344" width="56" height="16" rx='0.375rem' />
      <rect x="0" y="370" width="60%" height="16" rx='0.375rem' />
      <rect x="0" y="394" width="60%" height="16" rx='0.375rem' />
    </ContentLoader>
  </div>
)

export default ListingCardLoader
