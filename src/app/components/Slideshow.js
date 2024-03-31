import React, { useEffect } from 'react'
import Image from 'next/image'

const Slideshow = ({ images, currentImageIndex, setCurrentImageIndex }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(intervalId) // Cleanup interval on unmount
  }, [images, setCurrentImageIndex])

  return (
    <div className='relative w-full h-full'>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Slide ${index}`}
          layout='fill'
          objectFit='cover'
          loading='lazy'
          className={`w-fll hidden lg:block transition-opacity duration-500 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  )
}

export default Slideshow

// SVG for active state
const ActiveButtonIcon = () => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <circle
        cx='8'
        cy='8'
        r='7.5'
        fill='white'
        fillOpacity='0.2'
        stroke='white'
      />
      <circle cx='7.9984' cy='7.99999' r='4.36364' fill='white' />
    </svg>
  )
}

// SVG for non-active state
const NonActiveButtonIcon = () => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <circle cx='8' cy='8' r='8' fill='white' fillOpacity='0.6' />
    </svg>
  )
}

export { ActiveButtonIcon, NonActiveButtonIcon }
