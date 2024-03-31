import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '../Logo'
import NotiIcon from '../svgs/NotiIcon'
import Image from 'next/image'
import CurrencyDropdown from '../CurrencyDropdown'
import Avatar from '../../../../public/images/userAvatar.png'
import Button from '../buttons/Button'
import ArrowbackIcon from '../svgs/ArrowbackIcon'
import Link from 'next/link'

const Topbar = () => {
  // Get current day

  const [formattedDate, setFormattedDate] = useState('')
  const [showButton, setShowButton] = useState(false)
  const [showAddCollection, setAddCollection] = useState(false)
  const router = useRouter()

  const pathname = usePathname()

  const goBack = () => {
    router.back()
  }

  // Function to update the formatted date

  const updateDate = () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone // Get user's timezone
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: userTimezone, // Set user's timezone
    }
    const currentDate = new Date()
    const formatted = currentDate.toLocaleDateString('en-US', options)
    setFormattedDate(formatted)
  }
  // Update the date initially and set up interval to keep it updated
  useEffect(() => {
    updateDate()
    const interval = setInterval(updateDate, 1000) // Update every second
    return () => clearInterval(interval) // Cleanup
  }, [])

  useEffect(() => {
    // Show button only on the collections page
    setShowButton(pathname === '/collection')
    setAddCollection(pathname === '/collection/add-collection')
  }, [pathname])

  // Function to get the title based on the URL path
  const formattedPathname =
    pathname.charAt(1).toUpperCase() + pathname.substring(2)
  return (
    <section className='relative  h-[90px] bg-gray-100 w-full top-[50px] lg:top-[0px]  flex justify-between items-center '>
      {showAddCollection ? (
        <Button
          onClick={goBack}
          className='flex justify-between items-center gap-x-2 ml-[30px]'>
          <ArrowbackIcon />{' '}
          <h3 className='font-open font-[700] text-[black] text-[16px] leading-[21.79px]'>
            Add Product
          </h3>
        </Button>
      ) : (
        <div className='absolute flex flex-col gap-y-2 w-auto left-[10px] lg:left-[20px]  lg:right-[40px]'>
          <h2 className='font-open font-[700] text-[16px] text-[#333333] leading-[21.79px]'>
            {formattedPathname}
          </h2>{' '}
          <p className='font-open font-[400] text-[12px] text-[#999999] leading-[16.34px]'>
            {formattedDate}{' '}
          </p>
        </div>
      )}
      {showButton && (
        <div className='absolute lg:hidden flex right-[10px] '>
          <Button
            type='submit'
            className='w-full flex gap-[6.45px] rounded-[5.16px] px-5 lg:block text-white bg-secondary py-[10px] lg:w-[200px] lg:py-[15px]bg-yellow-600 cursor-not-allowed'>
            <p className='font-poppins font-[400] text-[8.24px] leading-[12.36px]'>
              Add Collection
            </p>
          </Button>
        </div>
      )}
      <div className='absolute flex-row justify-between items-center w-[300px]  right-[5px] mx-auto h-auto top-[-40px] lg:top-[10px]  lg:right-[10px] gap-x-4 lg:mt-[10px]'>
        <div className='flex items-center absolute right-[5px]'>
          <CurrencyDropdown />
          <NotiIcon />
          <Image
            src={Avatar}
            alt='avatar'
            className='rounded-[50%]'
            width={30}
            height={30}
          />
        </div>
      </div>
    </section>
  )
}

export default Topbar
