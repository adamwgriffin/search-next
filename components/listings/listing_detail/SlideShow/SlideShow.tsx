import type { NextPage } from 'next'
import type { PhotoGalleryImage } from '../../../../types/listing_types'
import { useState, useCallback } from 'react'
import { buildSrcSet } from '../../../../lib/listing_image_helpers'
import Overlay from '../../../design_system/Overlay/Overlay'
import styles from './SlideShow.module.css'

export interface SlideShowProps {
  images: PhotoGalleryImage[]
  open: boolean
  onClose?: () => void
}

const SlideShow: NextPage<SlideShowProps> = ({ images, open, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0)

  const handleNextImage = useCallback(() => {
    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1)
    }
  }, [currentImage, images.length])

  const handlePreviousImage = useCallback(() => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1)
    }
  }, [currentImage])

  return (
    <>
      {open && (
        <Overlay>
          <div className={styles.slideShow}>
            <div className={styles.header}>
              <button className={styles.close} onClick={onClose}>
                X Close
              </button>
              <div className={styles.imageCount}>
                {currentImage + 1} / {images.length}
              </div>
            </div>
            <div className={styles.carousel}>
              <div>
                <button
                  className={styles.carouselButton}
                  onClick={handlePreviousImage}
                >
                  &lt;
                </button>
              </div>
              <div>
                <img
                  srcSet={buildSrcSet(images[currentImage].url, 16 / 9)}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${images[currentImage].url}`}
                  alt={`Listing Image ${currentImage}`}
                  className={styles.listingImage}
                />
              </div>
              <div>
                <button
                  className={styles.carouselButton}
                  onClick={handleNextImage}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </Overlay>
      )}
    </>
  )
}

export default SlideShow
