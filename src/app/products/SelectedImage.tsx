import Image from 'next/image';
import React from 'react'

interface SelectedImageProps{
    selectedImage: any;
    removeSelectedImage: () => void;
}

const SelectedImage = ({ selectedImage, removeSelectedImage}: SelectedImageProps) => {
  return (
    <div className='relative md:w-[177px] md:h-[122px] w-[160px] h-[122px]'>
        <Image 
        src={selectedImage?.url}
        className='absolute object-cover rounded-lg'
        fill
        alt='selected image'
        />
        <p 
        className='absolute flex justify-center items-center top-0 right-0 m-2 z-10 cursor-pointer bg-[#fff] h-5 w-5 text-[0.9rem] rounded-[50%] text-[#DB9E04]'
        onClick={removeSelectedImage}
         >x</p>
    </div>
  )
}

export default SelectedImage