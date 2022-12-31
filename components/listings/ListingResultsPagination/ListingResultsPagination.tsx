import type { NextPage } from 'next'
import styles from './ListingResultsPagination.module.css'
import MenuButton from '../../form/MenuButton/MenuButton'
import ArrowRight from '../../icons/ArrorRight/ArrowRight'
import ArrowLeft from '../../icons/ArrowLeft/ArrowLeft'

export interface Pagination {
  start: number
  end: number
  total: number
  pages: Array<number>
  currentPage: number
  pageSize: number
}

export interface ListingResultsPaginationProps extends Pagination {
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
  visiblePageAmount = 6,
  onClick
}) => {
  const visiblePages = pages.slice(0, visiblePageAmount)
  const morePages = pages.slice(visiblePageAmount)
  const morePagesLabel = morePages.includes(currentPage)
    ? String(pages.indexOf(currentPage) + 1)
    : 'More'
  const lastPage = pages.at(-1) ?? 0

  const handlePreviousPageClick = () => {
    if (currentPage !== pages[0]) {
      onClick(currentPage - pageSize)
    }
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
          <button
            className={styles.paginationButton}
            title='Previous Page'
            aria-label='Previous Page'
            onClick={handlePreviousPageClick}
            disabled={currentPage === pages[0]}
          >
            <ArrowLeft />
          </button>
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
            <MenuButton
              label={morePagesLabel}
              highlighted={morePages.includes(currentPage)}
              alignRight
              alignBottom
              condensed
            >
              <div className={styles.morePages}>
                {morePages.map((page, i) => (
                  <button
                    key={page.toString()}
                    className={styles.pageButton}
                    title={`Page ${visiblePages.length + i + 1}`}
                    aria-label={`Page ${visiblePages.length + i + 1}`}
                    disabled={page === currentPage}
                    onClick={() => onClick(page)}
                  >
                    {visiblePages.length + i + 1}
                  </button>
                ))}
              </div>
            </MenuButton>
          )}
          <button
            className={styles.paginationButton}
            title='Next Page'
            aria-label='Next Page'
            onClick={handleNextPageClick}
            disabled={currentPage === lastPage}
          >
            <ArrowRight />
          </button>
        </div>
      )}
      <p className={styles.resultTotals}>
        {start.toLocaleString()}-{end.toLocaleString()} of{' '}
        {total.toLocaleString()} {total === 1 ? 'Result' : 'Results'}
      </p>
    </div>
  )
}

export default ListingResultsPagination
