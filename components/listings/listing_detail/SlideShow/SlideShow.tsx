'use client'

import type { PhotoGalleryImage } from '../../../../types/listing_types'
import { useState, useCallback, useLayoutEffect } from 'react'
import { buildSrcSet } from '../../../../lib/listing_image_helpers'
import styles from './SlideShow.module.css'

export type SlideShowProps = {
  images: PhotoGalleryImage[]
  open: boolean
  onClose?: () => void
}

const SlideShow: React.FC<SlideShowProps> = ({ images, open, onClose }) => {
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

  const handleClose = useCallback(() => {
    setCurrentImage(0)
    onClose?.()
  }, [onClose])

  // Using useLayoutEffect helps avoid any kind of flicker associated with
  // maniplulating the DOM like this because it happens before the browser
  // repaints the screen
  useLayoutEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <dialog className={open ? styles.slideShow : styles.slideShowClosed}>
      <div className={styles.header}>
        <button className={styles.close} onClick={handleClose}>
          X Close
        </button>
        <div className={styles.imageCount}>
          {currentImage + 1} / {images.length}
        </div>
      </div>

      <div className={styles.carousel}>
        <div className={styles.carouselButtonContainer}>
          <button
            className={styles.carouselButton}
            onClick={handlePreviousImage}
          >
            &lt;
          </button>
        </div>

        <figure className={styles.listingImageFigure}>
          <img
            srcSet={buildSrcSet(images[currentImage].url)}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${images[currentImage].url}`}
            fetchPriority='low'
            alt={`Listing photo ${currentImage}`}
            className={styles.listingImage}
          />
          <figcaption className={styles.caption}>
            {images[currentImage].caption}
          </figcaption>
        </figure>

        <div className={styles.carouselButtonContainer}>
          <button className={styles.carouselButton} onClick={handleNextImage}>
            &gt;
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default SlideShow
