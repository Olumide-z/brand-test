import OrderGrid from './OrderGrid'

const data = [
  { header: 'ID Order' },
  { header: 'Name' },
  { header: 'Product' },
  { header: 'Date' },
  { header: 'Tracking' },
  { header: 'Price' },
]

const OrderContainer: React.FC = () => {
  return (
    <div className='hidden md:w-full md:flex md:justify-between xl:gap-x-[60px] md:items-start  rounded-[10px] overflow-hidden bg-[#FAFAFA] '>
      {data.map((item, index) => (
        <OrderGrid key={index} header={item.header} />
      ))}
    </div>
  )
}

export default OrderContainer
