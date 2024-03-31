import React, { useState } from 'react'
import NGNIcon from './svgs/NGNIcon'
import USDIcon from './svgs/USDIcon'
import GBPIcon from './svgs/GBPIcon'

const CurrencyDropdown = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('NGN')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency)
    setDropdownOpen(false)
  }

  return (
    <div className='relative'>
      <div
        className='selected-currency flex items-center cursor-pointer'
        onClick={toggleDropdown}>
        {selectedCurrency === 'NGN' && <NGNIcon />}
        {selectedCurrency === 'GBP' && <USDIcon />}
        {selectedCurrency === 'EUR' && <GBPIcon />}
      </div>
      {dropdownOpen && (
        <div className='absolute w-32 p-2 bg-white shadow-lg mt-2 rounded-md overflow-hidden z-10 transition-all duration-300'>
          <div
            onClick={() => handleCurrencyChange('NGN')}
            className='cursor-pointer px-4 py-2 flex gap-x-3 hover:bg-gray-100'>
            <NGNIcon /> <h3>NGN</h3>
          </div>
          <hr className='my-1 w-[92px] border-[1px] border-[rgb(228,228,228)] mx-auto' />
          <div
            onClick={() => handleCurrencyChange('GBP')}
            className='cursor-pointer px-4 py-2 flex gap-x-3 hover:bg-gray-100'>
            <USDIcon /> <h3>GBP</h3>
          </div>
          <hr className='my-1 w-[92px] border-[1px] border-[rgb(228,228,228)] mx-auto' />
          <div
            onClick={() => handleCurrencyChange('EUR')}
            className='cursor-pointer px-4 py-2 flex gap-x-3 hover:bg-gray-100'>
            <GBPIcon /> <h3>EUR</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrencyDropdown
