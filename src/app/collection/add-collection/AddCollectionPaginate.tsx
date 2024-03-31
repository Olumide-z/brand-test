import React from 'react'
import {
  OneIconPaginate,
  TwoIconPaginate,
  ActiveIconPaginate,
  InactiveIconPaginate,
} from '@/app/components/svgs/PaginateButtons'

const AddCollectionPaginate = () => {
  return (
    <div className='flex justify-center items-center mx-auto gap-x-4 lg:w-[300px]'>
      <OneIconPaginate />
      <ActiveIconPaginate />
      <InactiveIconPaginate />
      <TwoIconPaginate />
    </div>
  )
}

export default AddCollectionPaginate
