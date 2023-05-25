import type { NextPage } from 'next'
import css from 'styled-jsx/css'

export interface DescriptionProps {
  description: string | null
}

const Description: NextPage<DescriptionProps> = ({ description }) => {
  return (
    <div>
      <h4 className='heading'>Description</h4>
      <p className='description'>{description}</p>
      <style jsx>{styles}</style>
    </div>
  )
}

const styles = css`
  .description {
    margin: 0;
  }
`

export default Description
