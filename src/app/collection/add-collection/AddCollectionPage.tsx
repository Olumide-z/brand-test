import React from 'react'
import AddCollectionPaginate from './AddCollectionPaginate'
import { InputTextBoxIcon } from '@/app/components/svgs/PaginateButtons'
import Button from '@/app/components/buttons/Button'

const AddCollectionPage = () => {
  return (
    <div className='h-full bg-gray-100  overflow-hidden'>
      <div className='h-full flex-col mx-[25px] mt-[50px] lg:mt-0 mb-[50px] lg:p-[50px] lg:mx-[30px] bg-white'>
        <div className='w-full flex-col space-y-5 p-4'>
          <AddCollectionPaginate />
          <div className='w-full flex-col space-y-5 '>
            <div className='flex-col space-y-3 '>
              <h2 className='font-open font-[700] text-[black] text-[14.41px] leading-[19.63px]'>
                Product Image(s)
              </h2>
              <div>
                <InputTextBoxIcon />
              </div>
            </div>
            <div className='w-full lg:flex-row xl:flex-row lg:justify-between space-y-5 lg:gap-x-4  flex flex-col lg:flex-row xl:flex-row lg:items-start'>
              <div className='flex flex-col space-y-[30px] lg:flex  lg:w-1/2'>
                <div className='space-y-4 lg:space-y-2'>
                  <label
                    htmlFor='name'
                    className='block text-gray-700 font-bold mb-2'>
                    Product Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Input your product name'
                    className='w-full bg-[#FAFAFA] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#DB9E04]'
                    required
                  />
                </div>
                <div className='w-full space-y-4 lg:space-y-2'>
                  <label
                    htmlFor='name'
                    className='block text-gray-700 font-bold mb-2'>
                    Product Description
                  </label>
                  <textarea
                    id='description'
                    name='description'
                    placeholder='Input a product description'
                    className='w-full h-[150px] bg-[#FAFAFA] xl:w-[500px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#DB9E04]'
                    required
                  />
                </div>
              </div>
              <div className='flex flex-col w-full space-y-4 lg:space-y-2 lg:w-1/2 '>
                <label
                  htmlFor='name'
                  className='block text-gray-700 font-bold mb-2'>
                  Category
                </label>
                <select
                  id='location'
                  name='location'
                  className='w-full px-4 py-[10px] text-gray-700 bg-[#FAFAFA] border border-gray-300 rounded-md focus:outline-none focus:border-[#DB9E04]'
                  required>
                  <option className='text-gray-700 ' value=''>
                    Select a product category{' '}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className='flex gap-x-3 justify-end lg:mt-[200px]'>
            <Button
              type='submit'
              className='hidden lg:block  text-white bg-[#DFDFDF] px-[20px] lg:rounded-[5.16px]  lg:py-[15px]bg-yellow-600 cursor-not-allowed'>
              <p className='font-open font-[500] text-[#9C9C9C] text-[14.41px] leading-[19.63px]'>
                Cancel
              </p>
            </Button>
            <Button
              type='submit'
              className='hidden lg:block text-white bg-secondary py-[10px] lg:rounded-[5.16px] lg:w-[150px] lg:py-[15px]bg-yellow-600 cursor-not-allowed'>
              Next Step
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCollectionPage
