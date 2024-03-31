interface OrderGridProps {
  header: string
}

const OrderGrid: React.FC<OrderGridProps> = ({ header }) => {
  return (
    <div className='flex items-center p-2 justify-start md:rounded-[10px] '>
      <h4 className=' text-center font-open font-[700] text-[12px] text-[#000000] leading-[16.34px] '>
        {header}
      </h4>
    </div>
  )
}

export default OrderGrid
