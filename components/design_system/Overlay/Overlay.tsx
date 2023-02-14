import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import css from 'styled-jsx/css'

export interface OverlayProps {
  children: ReactNode
}

const Overlay: NextPage<OverlayProps> = ({ children }) => {
  return (
    <>
      <div className='overlay'>
        {children}
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

const styles = css`
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.5); */
    background-color: black;
    z-index: 100;
  }
`
export default Overlay
