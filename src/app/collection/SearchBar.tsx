import React from 'react'
import SearchbarIcon from '../components/svgs/SearchbarIcon'

const SearchBar = () => {
  const handleSearch = () => {
    console.log('Search triggered')
  }
  return (
    <div className='w-full relative flex items-center '>
      <button
        onClick={handleSearch}
        className='absolute left-3 top-1/2 transform -translate-y-1/2 focus:outline-none'>
        <SearchbarIcon />
      </button>
      <input
        type='text'
        placeholder='Search for a collection'
        className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
      />
    </div>
  )
}

export default SearchBar
