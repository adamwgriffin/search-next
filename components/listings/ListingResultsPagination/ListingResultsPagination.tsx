import type { NextPage } from 'next'
import styles from './ListingResultsPagination.module.css'

export interface ListingResultsPaginationProps {
  start: number
  end: number
  total: number
  pages: Array<number>
  currentPage: number
  pageSize: number
  visiblePageAmount?: number
  onClick: (page: number) => void
}

const ListingResultsPagination: NextPage<ListingResultsPaginationProps> = ({
  start,
  end,
  total,
  pages,
  currentPage,
  pageSize,
  visiblePageAmount=6,
  onClick
}) => {
  const visiblePages = pages.slice(0, visiblePageAmount)
  const morePages = pages.slice(visiblePageAmount)
  const lastPage = pages.at(-1) ?? 0

  const handlePreviousPageClick = () => {
    if (currentPage !== pages[0]) {
      onClick(currentPage - pageSize)
    }
  }

  const morePagesClass = () => {
    return morePages.includes(currentPage)
      ? styles.morePagesItemSelected
      : styles.morePages
  }

  const handleNextPageClick = () => {
    if (currentPage !== lastPage) {
      onClick(currentPage + pageSize)
    }
  }

  return (
    <div className={styles.listingResultsPagination}>
      {pages.length > 1 && (
        <div className={styles.paginationButtons}>
         {currentPage !== pages[0] && (
           <button
             className={styles.paginationButton}
             title='Previous Page'
             aria-label='Previous Page'
             onClick={handlePreviousPageClick}
           >
             &lt;
           </button>
         )}
         {visiblePages.map((page, i) => (
           <button
             key={page.toString()}
             className={styles.pageButton}
             title={`Page ${i + 1}`}
             aria-label={`Page ${i + 1}`}
             disabled={page === currentPage}
             onClick={() => onClick(page)}
           >
             {i + 1}
           </button>
         ))}
         {morePages.length > 0 && (
           <select
             className={morePagesClass()}
             value={currentPage}
             title='Select more pages'
             onChange={(e) => onClick(+e.target.value)}
           >
             <option
               value='none'
               disabled={morePages.includes(currentPage)}
             >
               More
             </option>
             {morePages.map((page, i) => (
               <option key={page.toString()} value={page}>
                 {visiblePages.length + i + 1}
               </option>
             ))}
           </select>
         )}
         {currentPage !== lastPage && (
           <button
             className={styles.paginationButton}
             title='Next Page'
             aria-label='Next Page'
             onClick={handleNextPageClick}
           >
             &gt;
           </button>
         )}
       </div>
      )}
      <p className={styles.resultTotals}>
        {start.toLocaleString()}-{end.toLocaleString()} of{' '}
        {total.toLocaleString()} Results
      </p>
    </div>
  )
}

export default ListingResultsPagination
