'use client'

import React, { useEffect, useState } from 'react'
import isAuth from '../components/isAuth'
import SearchBar from './SearchBar'
import Button from '../components/buttons/Button'
import { CollectionsData } from '../components/ordersGrid/OrderContentContainer'
import Pagination from './Pagination'
import { useRouter } from 'next/navigation'

const Collection = () => {
  const [token, setToken] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [collectionData, setCollectionData] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check if window is defined (meaning it's running in the browser)
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('userToken')
      if (storedToken) {
        setToken(storedToken)
      }
    }
  }, [])

  const fetchCollectionData = async (page: number) => {
    try {
      const response = await fetch(
        `https://love.thegoldscarf.com/api/brand/collection?page=${page}`
      )
      const data = await response.json()
      setCollectionData(data.data)
      setTotalPages(data.meta.last_page)
    } catch (error) {
      console.error('Error fetching collection data:', error)
    }
  }

  useEffect(() => {
    fetchCollectionData(currentPage)
  }, [currentPage])

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected + 1)
  }

  // Function to handle navigation to the "Add Collection" page
  const handleAddCollection = () => {
    router.push('/collection/add-collection')
  }

  return (
    <div className='flex-col justify-between items-center space-y-5 w-full mx-auto px-[10px] lg:px-[20px] mt-[50px] lg:mt-[0px]  bg-gray-100 h-screen overflow-hidden '>
      <div className='flex justify-between items-center'>
        <div className='w-full lg:w-[300px]'>
          <SearchBar />
        </div>
        <Button
          type='submit'
          onClick={handleAddCollection}
          className='hidden lg:block text-white bg-secondary py-[10px] lg:rounded-[5.16px] lg:w-[200px] lg:py-[15px]bg-yellow-600 cursor-not-allowed'>
          Add Collection
        </Button>
      </div>
      <div className=''>
        <CollectionsData />
      </div>
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}

export default isAuth(Collection)
