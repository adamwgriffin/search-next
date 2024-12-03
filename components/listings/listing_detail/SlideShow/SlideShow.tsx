'use client'

import type { PhotoGalleryImage } from '../../../../types/listing_types'
import { useState, useCallback, useLayoutEffect } from 'react'
import { useEvent } from 'react-use'
import { buildSrcSet } from '../../../../lib/listing_image_helpers'
import styles from './SlideShow.module.css'

export type SlideShowProps = {
  images: PhotoGalleryImage[]
  open: boolean
  onClose?: () => void
}

const SlideShow: React.FC<SlideShowProps> = ({ images, open, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0)

  const cycleForward = useCallback(() => {
    setCurrentImage((currentImage + 1) % images.length)
  }, [currentImage, images.length])

  const cycleBackward = useCallback(() => {
    setCurrentImage((currentImage - 1 + images.length) % images.length)
  }, [currentImage, images.length])

  const closeSlideShow = useCallback(() => {
    setCurrentImage(0)
    onClose?.()
  }, [onClose])

  // With useLayoutEffect we can avoid any potential flicker associated with
  // manually maniplulating the DOM like this because it happens before the
  // browser repaints the screen
  useLayoutEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  useEvent('keydown', (event) => {
    if (!open) return
    switch (event.key) {
      case 'ArrowLeft':
        cycleBackward()
        break
      case 'ArrowRight':
        cycleForward()
        break
      case 'Escape':
        closeSlideShow()
        break
    }
  })

  return (
    <dialog className={open ? styles.slideShow : styles.slideShowClosed}>
      <div className={styles.header}>
        <button className={styles.close} onClick={closeSlideShow}>
          X Close
        </button>
        <div className={styles.imageCount}>
          {currentImage + 1} / {images.length}
        </div>
      </div>

      <div className={styles.carousel}>
        <div className={styles.carouselButtonContainer}>
          <button className={styles.carouselButton} onClick={cycleBackward}>
            &lt;
          </button>
        </div>

        <figure className={styles.listingImageFigure}>
          <img
            srcSet={buildSrcSet(images[currentImage].url)}
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${images[currentImage].url}`}
            fetchPriority='low'
            decoding='async'
            alt={`Listing gallery photo ${currentImage + 1}`}
            className={styles.listingImage}
          />
          <figcaption className={styles.caption}>
            {images[currentImage].caption}
          </figcaption>
        </figure>

        <div className={styles.carouselButtonContainer}>
          <button className={styles.carouselButton} onClick={cycleForward}>
            &gt;
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default SlideShow
