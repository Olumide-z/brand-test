import React, { useRef } from 'react'

const OTPInput = ({}) => {
  const inputRef = useRef(null)

  const otpInputs = Array(6)
    .fill(null)
    .map(() => inputRef)

  return (
    <div className='flex gap-4'>
      <div className='flex space-x-5'>
        {otpInputs.map((inputRef, index) => (
          <input
            key={index}
            ref={inputRef}
            type='text'
            maxLength={1}
            onChange={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // handleInputChange(e, index);
            }}
            className='w-10 h-10 border border-gray-300 rounded-md text-center text-2xl'
          />
        ))}
      </div>
    </div>
  )
}

export default OTPInput
