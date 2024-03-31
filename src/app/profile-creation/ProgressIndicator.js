import React from 'react'

const ProgressIndicator = ({ currentStep }) => {
  return (
    <div className='flex justify-between gap-x-2 w-full mb-4'>
      <hr
        className={`w-1/2 h-1 ${
          currentStep >= 1 ? 'bg-[#DB9E04]' : 'bg-[#98A2B3]'
        }`}
      />
      <hr
        className={`w-1/2 h-1 ${
          currentStep >= 2 ? 'bg-[#DB9E04]' : 'bg-[#98A2B3]'
        }`}
      />
    </div>
  )
}

export default ProgressIndicator
