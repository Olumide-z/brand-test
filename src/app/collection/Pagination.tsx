import React from 'react'
import ReactPaginate from 'react-paginate'
import RightIcon from '../components/svgs/RightIcon'
import LeftIcon from '../components/svgs/LeftIcon'

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const renderPaginationNumbers = () => {
    const pages = []
    const pageRange = 3 // Number of pages to show before and after the current page

    // Add ellipsis if necessary
    if (totalPages > 5 && currentPage > 3) {
      pages.push(
        <li
          key={1}
          className='page-number px-2 py-1 bg-white rounded-md border border-gray-300 cursor-pointer'>
          1
        </li>
      )
      if (currentPage > 4) {
        pages.push(
          <li
            key='ellipsisBefore'
            className='px-2 py-1 border border-gray-300 rounded-md'>
            ...
          </li>
        )
      }
    }

    // Generate the range of page numbers to display
    for (
      let i = Math.max(1, currentPage - pageRange);
      i <= Math.min(currentPage + pageRange, totalPages);
      i++
    ) {
      pages.push(
        <li
          key={i}
          className={`page-number px-2 py-1 bg-white rounded-md border border-gray-300 cursor-pointer ${
            currentPage === i
              ? 'pt-4 text-yellow-500 border-yellow-500'
              : 'text-black'
          }`}
          onClick={() => onPageChange({ selected: i - 1 })}>
          {i}
        </li>
      )
    }

    // Add ellipsis if necessary
    if (totalPages > 5 && currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push(
          <li
            key='ellipsisAfter'
            className='px-2 py-1 border border-gray-300 rounded-md text-gray-800'>
            ...
          </li>
        )
      }
      pages.push(
        <li
          key={totalPages}
          className='page-number px-2 py-1 bg-white rounded-md border border-gray-300 cursor-pointer'
          onClick={() => onPageChange({ selected: totalPages - 1 })}>
          {totalPages}
        </li>
      )
    }

    return pages
  }

  return (
    <div className='fixed bottom-4 right-4 z-10 flex space-x-2 justify-end'>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={onPageChange}
        containerClassName={'flex space-x-2'}
        activeClassName={
          'p-2 text-yellow-500 border-yellow-500 border-gray-200 border-solid border-2'
        }
        breakClassName={'px-2 py-1 bg-gray-300 text-gray-800 rounded-md'}
        previousLabel={<LeftIcon />}
        nextLabel={<RightIcon />}
        previousClassName={'px-2 py-1  text-gray-800 rounded-md cursor-pointer'}
        nextClassName={'px-2 py-1  text-gray-800 rounded-md cursor-pointer'}
        disabledClassName={' rounded-md cursor-not-allowed'}
      />
      <ul className='flex space-x-2'>{renderPaginationNumbers()}</ul>
    </div>
  )
}

export default Pagination
