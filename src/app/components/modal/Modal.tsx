import React from 'react'
import CheckIcon from '../svgs/CheckIcon'
import WrongCheckIcon from '../svgs/WrongCheckIcon'

interface ModalProps {
  message: string
  onClose: () => void
  isSuccess: boolean
}

const Modal: React.FC<ModalProps> = ({ message, onClose, isSuccess }) => {
  return (
    <div>
      <div className='flex justify-between items-center gap-x-[10px] z-50 bg-white rounded-lg shadow-lg py-[12px] px-[16px] w-[auto] h-[56px] '>
        <span onClick={onClose}>
          {isSuccess ? <WrongCheckIcon /> : <CheckIcon />}
        </span>
        <p className='text-black text-[17px]  font-inter font-[500] leading-[22px] '>
          {message}
        </p>
      </div>
    </div>
  )
}

export default Modal
