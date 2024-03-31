import Link from 'next/link';
import React from 'react'

interface ButtonProps{
    text: string;
    link?: boolean
}
// button
const Button = ({ text, link }: ButtonProps) => {
  return (
    <div className='flex gap-4 mt-24 mb-6'>
        <button className='w-[95.49px] h-[47px] bg-[#DFDFDF] rounded-lg font-open text-[14.41px] font-[500] text-[#9C9C9C]'>
            Cancel
        </button>
        {link && <Link href='/products/product-option'>
            <button className='w-[150px] h-[47px] bg-[#DB9E04] rounded-lg font-open text-[14.41px] font-[600] text-[#ffff]'>
                {text}
            </button>
        </Link>}
        {!link && <button className='w-[150px] h-[47px] bg-[#DB9E04] rounded-lg font-open text-[14.41px] font-[600] text-[#ffff]'>
            {text}
        </button>}
    </div>
  )
}

export default Button