import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import { useToggle } from 'react-use'
import css from 'styled-jsx/css'

export interface ShowMoreProps {
  children: ReactNode
}

const ShowMore: NextPage<ShowMoreProps> = ({ children }) => {
  const [show, toggleShow] = useToggle(false)

  return (
    <>
      <div className='showMore'>
        <div className={show ? 'textContainer show' : 'textContainer'}>
          {children}
        </div>
        <div className='showMoreToggleContainer'>
        <button className='showMoreToggle' onClick={toggleShow}>
          {show ? 'Show Less' : 'Show More'}
        </button>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

const styles = css`
  .textContainer {
    position: relative;
    max-height: 200px;
    overflow: hidden;
    transition: max-height 0.5s ease;
  }

  .textContainer.show {
    max-height: 2000px;
  }

  .textContainer::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 150px;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 95%
    );
    pointer-events: none;
    transition: height 0.25s ease;
  }

  .textContainer.show::before {
    height: 0;
  }

  .showMoreToggleContainer {
    text-align: center;
  }

  .showMoreToggle {
    cursor: pointer;
    padding: 0;
    background: none;
    border: none;
    font-family: inherit;
  }
`
export default ShowMore
