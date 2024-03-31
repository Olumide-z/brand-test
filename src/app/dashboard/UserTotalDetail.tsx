import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import CurrencyDropdown from '../components/CurrencyDropdown'
import CustomersIcon from '../components/svgs/CustomersIcon'
import WalletIcon from '../components/svgs/WalletIcon'
import OrdersIcon from '../components/svgs/OrdersIcon'

const UserTotalDetail = () => {
  const [dashboardData, setDashboardData] = useState<any>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Ensure this code only runs in the browser environment
        if (typeof window !== 'undefined') {
          const userToken = localStorage.getItem('userToken')

          const config = {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }

          const response = await axios.get(
            'https://love.thegoldscarf.com/api/brand/dashboard/statistics',
            config
          )

          setDashboardData(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className='flex w-full gap-x-5 overflow-x-auto'>
      {dashboardData && (
        <>
          <div className='flex flex-col justify-between gap-y-[20px] min-w-[150px] h-auto p-2 rounded-[5%] mt-2 bg-white'>
            <div className='flex justify-between items-center'>
              <CurrencyDropdown />
              <span className='font-lato font-[600] text-[9.91px] text-[#5372E7]'>
                +
                {(dashboardData.incomePercentageIncrease?.USD / 100).toFixed(2)}
                %
              </span>
            </div>
            <div>
              <h2 className='text-[9.91px] text-[#333333] font-lato font-[700] leading-[11.89px]'>
                {(dashboardData.incomeCurrentMonth?.USD / 100).toFixed(2)}
              </h2>
              <p className='font-lato font-[400] text-[8.49px] text-[#999999] leading-[10.19px]'>
                Total Income
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-between gap-y-[20px] min-w-[150px] h-auto p-2 rounded-[5%] mt-2 bg-white'>
            <div className='flex justify-between items-center'>
              <CustomersIcon />
              <span className='font-lato font-[600] text-[9.91px] text-[#64C882]'>
                +{dashboardData.customersPercentageIncrease}%
              </span>
            </div>
            <div>
              <h2 className='text-[9.91px] text-[#333333] font-lato font-[700] leading-[11.89px]'>
                {dashboardData.customersCountCurrentMonth}
              </h2>
              <p className='font-lato font-[400] text-[8.49px] text-[#999999] leading-[10.19px]'>
                Total Customers
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-between gap-y-[20px] min-w-[150px] h-auto p-2 rounded-[5%] mt-2 bg-white'>
            <div className='flex justify-between items-center'>
              <WalletIcon />
              <span className='font-lato font-[600] text-[9.91px] text-[#21BDCA]'>
                +{dashboardData.transactionsPercentageIncrease}%
              </span>
            </div>
            <div>
              <h2 className='text-[9.91px] text-[#333333] font-lato font-[700] leading-[11.89px]'>
                {dashboardData.transactionsCountCurrentMonth}
              </h2>
              <p className='font-lato font-[400] text-[8.49px] text-[#999999] leading-[10.19px]'>
                Total Transactons
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-between gap-y-[20px] min-w-[150px] h-auto p-2 rounded-[5%] mt-2 bg-white'>
            <div className='flex justify-between items-center'>
              <OrdersIcon />
              <span className='font-lato font-[600] text-[9.91px] text-[#FF9F24]'>
                +{dashboardData.ordersPercentageIncrease}%
              </span>
            </div>
            <div>
              <h2 className='text-[9.91px] text-[#333333] font-lato font-[700] leading-[11.89px]'>
                {dashboardData.ordersCountCurrentMonth}
              </h2>
              <p className='font-lato font-[400] text-[8.49px] text-[#999999] leading-[10.19px]'>
                Total Orders
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default UserTotalDetail
