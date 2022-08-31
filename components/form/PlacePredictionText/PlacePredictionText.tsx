import type { NextPage } from 'next'
import uniq from 'lodash/uniq'
import styles from './PlacePredictionText.module.css'

export interface PlacePredictionTextProps {
  prediction: google.maps.places.AutocompletePrediction
}

const PlacePredictionText: NextPage<PlacePredictionTextProps> = ({ prediction }) => {

  const getSubStringObjs = (matches: google.maps.places.PredictionSubstring[], str: string) => {
    const matchOffsets = matches.flatMap(({ offset, length }) => [offset, offset+length])
    const allOffsets = uniq([0, ...matchOffsets, str.length])
    const allOffsetPairs = allOffsets.slice(1).map((end, i) => [allOffsets[i], end])
    return allOffsetPairs.map(([start, end]) => {
      const text = str.substring(start, end)
      const match = !!matches.find(({ offset, length }) => (offset === start && offset+length === end))
      return { text, match }
    })
  }

  const mainTextSubstrings = () => {
    const { main_text_matched_substrings, main_text } = prediction.structured_formatting
    const subs = getSubStringObjs(main_text_matched_substrings, main_text)
    return subs
  }

  return (
    <span className='placesPredictionText'>
      <span className={styles.mainText}>
        {mainTextSubstrings().map((string) => (
          <span
            key={string.text}
            className={string.match ? styles.matched : ''}
          >
            { string.text }
          </span>
        ))}
      </span>
      <span className={styles.secondaryText}>
        {prediction.structured_formatting.secondary_text}
      </span>
    </span>
  )
}

export default PlacePredictionText
