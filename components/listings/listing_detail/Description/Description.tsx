import type { NextPage } from 'next'
import css from 'styled-jsx/css'

export interface DescriptionProps {
  comments: string | null
}

const Description: NextPage<DescriptionProps> = ({ comments }) => {
  return (
    <div>
      <h4 className='heading'>Description</h4>
      <p className='comments'>{comments}</p>
      <style jsx>{styles}</style>
    </div>
  )
}

const styles = css`
  .comments {
    margin: 0;
  }
`

export default Description
