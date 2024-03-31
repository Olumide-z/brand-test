import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { OrderCustomer } from './OrderContent'

const data = [
  {
    id: '#474775',
    name: 'John Doe',
    product: 'Hand Scarf',
    date: '2022-03-20',
    tracking: 'Complete',
    price: 'N 11,320.00',
  },
  {
    id: '#25354',
    name: 'Alice Wonder',
    product: 'Pocket Bag',
    date: '2022-03-21',
    tracking: 'Pending',
    price: 'N10,000.00',
  },
  {
    id: '#28959',
    name: 'Bobby lashy',
    product: 'Jeans',
    date: '2022-03-22',
    tracking: 'Complete',
    price: 'N10,000.00',
  },
  {
    id: '#28959',
    name: 'Bobby lashy',
    product: 'Jeans',
    date: '2022-03-22',
    tracking: 'Complete',
    price: 'N10,000.00',
  },
  {
    id: '#28959',
    name: 'Bobby lashy',
    product: 'Jeans',
    date: '2022-03-22',
    tracking: 'Complete',
    price: 'N10,000.00',
  },
  {
    id: '#28959',
    name: 'Bobby lashy',
    product: 'Jeans',
    date: '2022-03-22',
    tracking: 'Complete',
    price: 'N10,000.00',
  },
  {
    id: '#28959',
    name: 'Bobby lashy',
    product: 'Jeans',
    date: '2022-03-22',
    tracking: 'Complete',
    price: 'N10,000.00',
  },
]
interface Order {
  id: number
  payment_status: string
  delivery_status: string
  created_at: string
  currency: string
  total: number
}

const OrderContentContainer: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        // Ensure this code only runs in the browser environment
        if (typeof window !== 'undefined') {
          const userToken = localStorage.getItem('userToken')
          if (!userToken) {
            console.error('User token not found')
            return
          }

          const headers = {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          }

          const response = await axios.get(
            'https://love.thegoldscarf.com/api/brand/dashboard/statistics',
            { headers }
          )

          if (
            response.data &&
            response.data.data &&
            response.data.data.recentOrders
          ) {
            // Convert total values from unit values to actual amounts
            const convertedOrders = response.data.data.recentOrders.map(
              (order: Order) => ({
                ...order,
                total: order.total / 100,
              })
            )
            setOrders(convertedOrders)
          }
        }
      } catch (error) {
        console.error('Error fetching recent orders:', error)
      }
    }

    fetchRecentOrders()
  }, [])

  return (
    <>
      <div className=' hidden md:block '>
        <table className=' border-collapse border border-gray-200 md:w-full'>
          <thead className='p-2 md:sticky md:top-0  md:rounded-[20px] md:my-4 md:mx-2 mx-auto md:h-auto '>
            <tr className='font-open  font-[700] md:px-2 text-[12px] text-[#000000] leading-[16.34px]  md:rounded-[20px] overflow-hidden  bg-[#F1F1F5]'>
              <th className=' py-3 text-left'>ID Order</th>
              <th className=' py-3 text-left'>Payment Status</th>
              <th className=' py-3 text-left'>Date</th>
              <th className=' py-3 text-left'>Delivery Status</th>
              <th className=' py-3 text-left'>Price</th>
            </tr>
          </thead>
          <tbody className='w-full p-2 rounded-lg  bg-white'>
            {orders.map((order, index) => (
              <tr key={index} className=''>
                <td className='p-3 md:py-4'>{order.id}</td>
                <td
                  className={`w-[80px] flex justify-center items-center rounded-[24px] font-open font-[400] text-[8px] leading-[10.89px] md:py-2 md:my-4  ${
                    order.payment_status.includes('COM')
                      ? 'bg-[#E8FFF8] text-[#21BDCA]'
                      : order.payment_status.includes('FAI')
                      ? 'bg-[#b98b8b] text-[#ff4c24]'
                      : 'bg-[#FFEEEE] text-[#FF9F24]'
                  }  `}>
                  {order.payment_status}
                </td>{' '}
                <td className='md:py-4'>
                  {new Date(order.created_at).toISOString().split('T')[0]}
                </td>
                <td
                  className={`w-[80px] flex justify-center items-center rounded-[24px] font-open font-[400] text-[8px] leading-[10.89px] md:py-2 md:my-4  ${
                    order.delivery_status.includes('SHI')
                      ? 'bg-[#E8FFF8] text-[#21BDCA]'
                      : order.delivery_status.includes('DEL')
                      ? 'bg-[#99cbbc] text-[#60aeb5]'
                      : 'bg-[#FFEEEE] text-[#FF9F24]'
                  }  `}>
                  {order.delivery_status}
                </td>
                <td className=' md:py-4 font-open font-[400] text-[12px] leading-[16.34px] '>
                  {order.currency} {order.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.map((order, index) => (
        <div
          className='flex justify-start items-start mb-[20px] rounded-[10px] p-4 gap-x-[40px] bg-white  md:hidden '
          key={index}>
          <div className='flex flex-col gap-y-2'>
            <div>
              <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
                ID Order
              </p>
              <p className='w-[80px] font-open font-[400] text-[12px] leading-[16.34px] '>
                {order.id}
              </p>
            </div>
            <div>
              <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
                Payment Status
              </p>
              <p
                className={`w-[80px] flex justify-center p-2 items-center rounded-[24px] font-open font-[400] text-[8px] leading-[10.89px] mt-[3px] ${
                  order.payment_status.includes('COM')
                    ? 'bg-[#E8FFF8] text-[#21BDCA]'
                    : order.payment_status.includes('FAI')
                    ? 'bg-[#b98b8b] text-[#ff4c24]'
                    : 'bg-[#FFEEEE] text-[#FF9F24]'
                }  `}>
                {order.payment_status}
              </p>
            </div>
            <div>
              <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
                Price
              </p>
              <p className='w-[80px] font-open font-[400] text-[12px] leading-[16.34px] '>
                {order.currency} {order.total.toLocaleString()}{' '}
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
            <div>
              <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
                Date
              </p>
              <p className='w-[80px] font-open font-[400] text-[12px] leading-[16.34px] '>
                {new Date(order.created_at).toISOString().split('T')[0]}
              </p>
            </div>
            <div>
              <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
                Delivery Status
              </p>
              <p
                className={`w-[80px] flex justify-center p-2 items-center rounded-[24px] font-open font-[400] text-[8px] leading-[10.89px] mt-[3px] ${
                  order.delivery_status.includes('SHI')
                    ? 'bg-[#E8FFF8] text-[#21BDCA]'
                    : order.delivery_status.includes('DEL')
                    ? 'bg-[#99cbbc] text-[#60aeb5]'
                    : 'bg-[#FFEEEE] text-[#FF9F24]'
                }  `}>
                {order.delivery_status}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

interface Collection {
  id: number
  payment_status: string
  delivery_status: string
  created_at: string
  currency: string
  total: number
}

const CollectionsData: React.FC = () => {
  const [collection, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    const fetchCollectionOrders = async () => {
      try {
        // Ensure this code only runs in the browser environment
        if (typeof window !== 'undefined') {
          const userToken = localStorage.getItem('userToken')
          if (!userToken) {
            console.error('User token not found')
            return
          }

          const headers = {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          }

          const response = await axios.get(
            'https://love.thegoldscarf.com/api/brand/collection',
            { headers }
          )

          if (
            response.data &&
            response.data.data &&
            response.data.data.collection
          ) {
            console.log('collection data:', response.data)

            setCollections(response.data)
          }
        }
      } catch (error) {
        console.error('Error fetching recent orders:', error)
      }
    }

    fetchCollectionOrders()
  }, [])

  return (
    <>
      <div className=' hidden md:block '>
        <table className=' border-collapse border border-gray-200 md:w-full'>
          <thead className='p-2 md:sticky md:top-0  md:rounded-[20px] md:my-4 md:mx-2 mx-auto md:h-auto '>
            <tr className='font-open  font-[700] md:px-2 text-[12px] text-[#000000] leading-[16.34px]  md:rounded-[20px] overflow-hidden  bg-[#F1F1F5]'>
              <th className=' py-3 text-left'>Collection Name</th>
              <th className=' py-3 text-left'>Number of Products</th>
              <th className=' py-3 text-left'>Product List</th>
              <th className=' py-3 text-left'>Date Created</th>
              <th className=' py-3 text-left'>Status</th>
              <th className=' py-3 text-left'>Action</th>
            </tr>
          </thead>
          <tbody className='w-full p-2 rounded-lg  bg-white'>
            {collection.map((collection, index) => (
              <tr key={index} className=''>
                <td className='p-3 md:py-4'>{collection.id}</td>
                <td
                  className={`w-[80px] flex justify-center items-center rounded-[24px] font-open font-[400] text-[8px] leading-[10.89px] md:py-2 md:my-4  ${
                    collection.payment_status.includes('COM')
                      ? 'bg-[#E8FFF8] text-[#21BDCA]'
                      : collection.payment_status.includes('FAI')
                      ? 'bg-[#b98b8b] text-[#ff4c24]'
                      : 'bg-[#FFEEEE] text-[#FF9F24]'
                  }  `}>
                  {collection.payment_status}
                </td>{' '}
                <td className='md:py-4'>
                  {new Date(collection.created_at).toISOString().split('T')[0]}
                </td>
                <td
                  className={`w-[80px] flex justify-center items-center rounded-[24px] font-open font-[400] text-[8px] leading-[10.89px] md:py-2 md:my-4  ${
                    collection.delivery_status.includes('SHI')
                      ? 'bg-[#E8FFF8] text-[#21BDCA]'
                      : collection.delivery_status.includes('DEL')
                      ? 'bg-[#99cbbc] text-[#60aeb5]'
                      : 'bg-[#FFEEEE] text-[#FF9F24]'
                  }  `}>
                  {collection.delivery_status}
                </td>
                <td className=' md:py-4 font-open font-[400] text-[12px] leading-[16.34px] '>
                  {collection.currency} {collection.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {orders.map((order, index) => (
        <div
          className='flex justify-start items-start mb-[20px] rounded-[10px] p-4 gap-x-[40px] bg-white  md:hidden '
          key={index}>
          <div className='flex flex-col gap-y-2'>
            <div>
              <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
                ID Order
              </p>
              <p className='w-[80px] font-open font-[400] text-[12px] leading-[16.34px] '>
                {order.id}
              </p>
            </div>
            <div>
              <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
                Payment Status
              </p>
              <p
                className={`w-[80px] flex justify-center p-2 items-center rounded-[24px] font-open font-[400] text-[8px] leading-[10.89px] mt-[3px] ${
                  order.payment_status.includes('COM')
                    ? 'bg-[#E8FFF8] text-[#21BDCA]'
                    : order.payment_status.includes('FAI')
                    ? 'bg-[#b98b8b] text-[#ff4c24]'
                    : 'bg-[#FFEEEE] text-[#FF9F24]'
                }  `}>
                {order.payment_status}
              </p>
            </div>
            <div>
              <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
                Price
              </p>
              <p className='w-[80px] font-open font-[400] text-[12px] leading-[16.34px] '>
                {order.currency} {order.total.toLocaleString()}{' '}
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
            <div>
              <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
                Date
              </p>
              <p className='w-[80px] font-open font-[400] text-[12px] leading-[16.34px] '>
                {new Date(order.created_at).toISOString().split('T')[0]}
              </p>
            </div>
            <div>
              <p className='font-open font-[700] text-[12px] leading-[16.34px] text-[#000000]'>
                Delivery Status
              </p>
              <p
                className={`w-[80px] flex justify-center p-2 items-center rounded-[24px] font-open font-[400] text-[8px] leading-[10.89px] mt-[3px] ${
                  order.delivery_status.includes('SHI')
                    ? 'bg-[#E8FFF8] text-[#21BDCA]'
                    : order.delivery_status.includes('DEL')
                    ? 'bg-[#99cbbc] text-[#60aeb5]'
                    : 'bg-[#FFEEEE] text-[#FF9F24]'
                }  `}>
                {order.delivery_status}
              </p>
            </div>
          </div>
        </div>
      ))} */}
    </>
  )
}

const customerData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
    avatar: '/images/customer1.png',
    orders: 20,
  },
  {
    id: 2,
    name: 'Alice Wonder',
    email: 'alice@gmail.com',
    avatar: '/images/customer2.png',
    orders: 18,
  },
  {
    id: 3,
    name: 'Bobby lashy',
    email: 'lashy@gmail.com',
    avatar: '/images/customer3.png',
    orders: 15,
  },
  {
    id: 4,
    name: 'Tinashe Paj',
    email: 'tinash@gmail.com',
    avatar: '/images/customer4.png',
    orders: 55,
  },
  {
    id: 5,
    name: 'Lord zuki',
    email: 'zuki@gmail.com',
    avatar: '/images/customer5.png',
    orders: 38,
  },
  {
    id: 6,
    name: 'kiki bright',
    email: 'ki@gmail.com',
    avatar: '/images/customer2.png',
    orders: 68,
  },
  {
    id: 7,
    name: 'Karem Dreams',
    email: 'karem@gmail.com',
    avatar: '/images/customer3.png',
    orders: 138,
  },
]

const OrderCustomerContainer: React.FC = () => {
  const [topCustomers, setTopCustomers] = useState([])

  useEffect(() => {
    const fetchTopCustomers = async () => {
      try {
        const userToken = localStorage.getItem('userToken')

        if (!userToken) {
          console.error('User token not found')
          return
        }

        const headers = {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        }

        const response = await axios.get(
          'https://love.thegoldscarf.com/api/brand/dashboard/statistics',
          { headers }
        )

        // Extract top customers data from the response and update state
        if (
          response.data &&
          response.data.data &&
          response.data.data.topCustomers
        ) {
          setTopCustomers(response.data.data.topCustomers)
          console.log('customrs:', response.data.data.topCustomers)
        }
      } catch (error) {
        console.error('Error fetching top customers:', error)
      }
    }

    fetchTopCustomers()
  }, [])

  return (
    <div className='flex flex-col gap-x-[auto] gap-y-4 overflow-hidden'>
      {topCustomers.map((customer, index) => (
        <OrderCustomer key={index} customerData={customer} />
      ))}
    </div>
  )
}

export { OrderContentContainer, OrderCustomerContainer, CollectionsData }
