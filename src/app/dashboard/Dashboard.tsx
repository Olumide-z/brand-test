// @ts-nocheck

'use client'

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Logo from '../components/Logo'
import isAuth from '../components/isAuth'
import CurrencyDropdown from '../components/CurrencyDropdown'
import SalesChart from '@/app/components/charts/SalesChart'
import EarningsChart from '@/app/components/charts/EarningsChart'
import NotiIcon from '../components/svgs/NotiIcon'
import Avatar from '../../../public/images/userAvatar.png'
import UserTotalDetail from './UserTotalDetail'
import Image from 'next/image'
import { cardData } from '../components/lib/constant'
import ActiveScrollIcon from '../components/svgs/ActiveScrollIcon'
import NonactiveScrollIcon from '../components/svgs/NonactiveScrollIcon'
import {
  OrderContentContainer,
  OrderCustomerContainer,
} from '../components/ordersGrid/OrderContentContainer'

function Dashboard() {
  const [scrollPosition, setScrollPosition] = useState(0) // State to track scroll position
  const [isLeftActive, setIsLeftActive] = useState(true) // State to track if left scroll is active
  const [isRightActive, setIsRightActive] = useState(false) // State to track if right scroll is active
  const containerRef = useRef(null)

  const handleScrollLeft = () => {
    const container = containerRef.current
    if (container) {
      container.scrollLeft -= 300
      setScrollPosition(container.scrollLeft)
      setIsLeftActive(true)
      setIsRightActive(false)
    }
  }

  const handleScrollRight = () => {
    const container = containerRef.current
    if (container) {
      container.scrollLeft += 300
      setScrollPosition(container.scrollLeft)
      setIsLeftActive(false)
      setIsRightActive(true)
    }
  }

  return (
    <div className=' w-full mx-auto px-3 lg:pl-[20px] overflow-hidden h-auto bg-gray-100'>
      <div className='flex-col w-full md:flex lg:flex-row  xl:flex-row justify-between gap-x-[20px]  mb-5'>
        <div className='w-full   xl:w-[70%] mt-[70px] lg:mt-[30px] lg:w-[60%]   flex flex-col gap-y-[20px] '>
          <div className='flex w-full  overflow-x-auto' ref={containerRef}>
            <UserTotalDetail />
          </div>
          {/* Buttons to scroll left and right */}
          <div className='flex justify-center items-center md:hidden'>
            <button
              onClick={handleScrollLeft}
              className='p-2 focus:outline-none inline-flex'>
              {isLeftActive ? <ActiveScrollIcon /> : <NonactiveScrollIcon />}
            </button>
            <button
              onClick={handleScrollRight}
              className='p-2 focus:outline-none inline-flex'>
              {isRightActive ? <ActiveScrollIcon /> : <NonactiveScrollIcon />}
            </button>
          </div>
          <div>
            <SalesChart />
          </div>
          <div className=' w-full mx-auto md:h-[250px] lg:h-[283px]  md:rounded-[10px] md:p-4  md:bg-white overflow-hidden '>
            <div className='flex justify-between  mb-2 bg-gray-100 md:bg-white'>
              <h1 className='font-open font-[700] text-[14px] leading-[19.07px] text-[#333333]'>
                Recent Orders
              </h1>
              <span className='font-open font-[700] text-[12px] text-[#DB9E04] leading-[16.34px]'>
                View all
              </span>
            </div>
            <div className='my-2 overflow-hidden overflow-y-auto max-h-[300px] lg:max-h-[300px] md:max-h-[200px] '>
              <OrderContentContainer />
            </div>
          </div>
        </div>
        <div className='flex flex-col my-4 gap-4 md:flex-row md:w-full  lg:w-[30%] xl:w-[30%] lg:mt-[40px]  lg:flex-col xl:flex-col'>
          <div className='w-full p-4 lg:h-[350px] rounded-[10px] bg-white'>
            <div className='flex justify-between'>
              <h1 className='font-open font-[700] text-[14px] leading-[19.07px] text-[#333333]'>
                Top Customers
              </h1>
              <span className='font-open font-[700] text-[12px] text-[#DB9E04] leading-[16.34px]'>
                View all
              </span>
            </div>
            <div className='my-2 overflow-hidden overflow-y-auto max-h-[300px] md:max-h-[400px] xl:max-h-[300px]'>
              <OrderCustomerContainer />
            </div>
          </div>
          <div className='w-full p-4 rounded-[10px] lg:h-auto xl:h-auto bg-white relative'>
            <EarningsChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default isAuth(Dashboard)
