import type { NextPage } from 'next'
import type { IPhotoGalleryImage } from '../../../../lib/types/listing_types'
import { useState, useCallback } from 'react'
import css from 'styled-jsx/css'
import Overlay from '../../../design_system/Overlay/Overlay'

export interface SlideShowProps {
  images: IPhotoGalleryImage[]
  open: boolean
  onClose?: () => void
}

const SlideShow: NextPage<SlideShowProps> = ({
  images,
  open,
  onClose
}) => {
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
          <div className='slideShow'>
            <div className='header'>
              <button className='close' onClick={onClose}>
                X Close
              </button>
              <div>
                {currentImage + 1} / {images.length}
              </div>
              <div>♡</div>
            </div>
            <div className='carousel'>
              <div className='carouselButtonConatiner'>
                <button
                  className='carouselButton'
                  onClick={handlePreviousImage}
                >
                  &lt;
                </button>
              </div>
              <div className='listingImageContainer'>
                <img
                  alt={`Listing Image ${currentImage}`}
                  src={images[currentImage].fullUrl}
                  className='listingImage'
                />
              </div>
              <div className='carouselButtonConatiner'>
                <button className='carouselButton' onClick={handleNextImage}>
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </Overlay>
      )}
      <style jsx>{styles}</style>
    </>
  )
}

const styles = css`
  .slideShow {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    color: white;
  }

  .carousel {
    display: grid;
    grid-template-columns: auto 1fr auto;
    place-items: center;
  }

  .listingImage {
    box-sizing: border-box;
    display: block;
    object-fit: contain;
    width: 100%;
    height: 100%;
    margin: 0;
    border: 0;
    background: rgba(116, 245, 115, 0.18)
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2.5rem 2.5rem 1.25rem 2.5rem;
  }

  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: none;
    border: none;
    border-radius: 0.5rem;
    color: inherit;
    font: inherit;
    padding: 0.5rem 1rem;
  }

  .close:hover {
    background: rgb(74, 74, 74);
  }

  .carouselButton {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    margin: 0 1.5rem;
    padding: 0;
    background: none;
    border: solid 1px white;
    border-radius: 50%;
    color: inherit;
    font: inherit;
  }

  .carouselButton:hover {
    background: rgb(74, 74, 74);
  }
`

export default SlideShow
