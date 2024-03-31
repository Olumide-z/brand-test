import React from 'react'
import Image from 'next/image'

interface OrderContentProps {
  data: {
    id: string
    name: string
    product: string
    date: string
    tracking: string
    price: string
  }
}

const OrderContent: React.FC<OrderContentProps> = ({ data }) => {
  return (
    <>
      <p>{data.id}</p>

      <p>{data.name}</p>

      <p>{data.product}</p>

      <p>{data.date}</p>

      <p
        className={`w-[80px] flex justify-center p-2 items-center rounded-[24px] font-open font-[400] text-[8px] leading-[10.89px] mt-[3px] border-solid border-2 border-red-400 ${
          data.tracking.includes('Com')
            ? 'bg-[#E8FFF8] text-[#21BDCA]'
            : 'bg-[#FFEEEE] text-[#FF9F24]'
        }  `}>
        {data.tracking}
      </p>

      <p className='w-[80px] font-open font-[400] text-[12px] leading-[16.34px] border-solid border-2 border-red-400'>
        {data.price}
      </p>
      <div className='flex justify-start items-center mb-[20px] rounded-[10px] p-4 gap-x-[40px] bg-white  md:hidden '>
        <div className='flex flex-col gap-y-2'>
          <div>
            <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
              ID Order
            </p>
            <p className='w-[80px] font-open font-[400] text-[12px] leading-[16.34px] '>
              {data.id}
            </p>
          </div>
          <div>
            <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
              Product
            </p>
            <p className='w-[80px] font-open font-[400] text-[12px] leading-[16.34px] '>
              {data.product}
            </p>
          </div>
          <div>
            <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
              Price
            </p>
            <p className='w-[80px] font-open font-[400] text-[12px] leading-[16.34px] '>
              {data.price}
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-y-2'>
          <div>
            <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
              Name
            </p>
            <p className='w-[80px] font-open font-[400] text-[12px] leading-[16.34px] '>
              {data.name}
            </p>
          </div>
          <div>
            <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
              Date
            </p>
            <p className='w-[80px] font-open font-[400] text-[12px] leading-[16.34px] '>
              {data.date}
            </p>
          </div>
          <div>
            <p
              className={`w-[80px] flex justify-center p-2 items-center rounded-[24px] font-open font-[400] text-[8px] leading-[10.89px] mt-[3px] ${
                data.tracking.includes('Com')
                  ? 'bg-[#E8FFF8] text-[#21BDCA]'
                  : 'bg-[#FFEEEE] text-[#FF9F24]'
              }  `}>
              {data.tracking}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

interface OrderCustomerProps {
  customerData: {
    id: number
    name: string
    email: string
    avatar: string
    total_orders: number
  }
}
const OrderCustomer: React.FC<OrderCustomerProps> = ({ customerData }) => {
  const renderAvatar = customerData.avatar ? (
    <Image src={customerData.avatar} alt='customer' width={32} height={32} />
  ) : (
    <div className='flex items-center'>
      <div className='w-8 h-8 border-2 border-secondary rounded-full flex items-center justify-center text-sm font-semibold text-gray-700'>
        {customerData.name.slice(0, 2)}
      </div>
    </div>
  )

  return (
    <div className='flex justify-between'>
      <div className=' flex justify-between gap-4'>
        {renderAvatar}

        <div className='flex flex-col'>
          <p className='font-open font-[600] text-[12px] text-[#333333] leading-[16.34px]'>
            {customerData.name}
          </p>
          <p className='font-open font-[400] text-[10px] text-[#999999] leading-[13.62px]'>
            {customerData.email}
          </p>
        </div>
      </div>
      <h2 className='font-open font-[700] text-[12px] text-[#000000] leading-[16.34px] py-2 '>
        {customerData.total_orders} Orders
      </h2>
    </div>
  )
}

export { OrderContent, OrderCustomer }
