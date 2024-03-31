// Card.tsx
import React from 'react'
import { CardDataType } from '../lib/constant'

const Card: React.FC<CardDataType> = ({
  id,
  percentage,
  text,
  digits,
  icon,
}) => {
  const Icon = icon

  return (
    <div
      className='flex flex-col gap-y-[20px] w-[150px] h-auto p-2 rounded-[5%] mt-2 bg-white'
      key={id}>
      <div className='flex justify-between items-center'>
        <Icon />
        <span className='font-lato font-[600] text-[9.91px] text-[#5372E7] leading-[11.89px]'>
          +{percentage}%
        </span>
      </div>
      <div>
        <h2>{digits}</h2>
        <p>Total {text}</p>
      </div>
    </div>
  )
}

export default Card
