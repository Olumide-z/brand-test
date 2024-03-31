import React, { useState } from 'react'
import ProgressIndicator from './ProgressIndicator'
import { Cities } from '@/app/components/lib/constant'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Image from 'next/image'

const Step1Form: React.FC<{ onSubmit: (formData: any) => void }> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<{
    name: string
    email: string
    phone_number: string
    location: string
    logo: File | null
  }>({
    name: '',
    email: '',
    phone_number: '',
    location: '',
    logo: null,
  })

  // State variable to track form validity
  const [formValid, setFormValid] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'logo' && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0]
      // Check if file is defined
      if (file) {
        setFormData({ ...formData, logo: file })
      }
    } else {
      // Check if value is a string before calling trim()
      const trimmedValue = typeof value === 'string' ? value.trim() : ''
      setFormData({ ...formData, [name]: trimmedValue })
    }

    // Check if all fields are filled to enable Continue button
    const isValid = Object.values(formData).every(
      (value) => typeof value === 'string' && value.trim() !== ''
    )
    setFormValid(isValid)
  }

  const handlePhoneChange = (
    value: string,
    data: any,
    event: any,
    formattedValue: string
  ) => {
    setFormData({ ...formData, phone_number: formattedValue })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-md mx-auto'>
      <div className='mb-2 gap-y-4 lg:mb-4'>
        <h2 className='text-[22px] font-inter font-[700] leading-[22.4px] lg:leading-[28.4px] lg:text-[30px] mb-4'>
          Setup your profile in a few steps and let&apos;s get started
        </h2>
        <div>
          <ProgressIndicator currentStep={1} />
        </div>
      </div>

      <div>
        <label htmlFor='logo' className='flex items-center gap-x-2 mb-4 '>
          <div className='relative w-20 h-20 rounded-full bg-gray-200 overflow-hidden cursor-pointer'>
            {formData.logo ? (
              <Image
                src={URL.createObjectURL(formData.logo)}
                alt='logo'
                width={30}
                height={30}
                className='w-full h-full object-cover'
              />
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='0.5'
                stroke='currentColor'
                className='w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
            )}

            <input
              type='file'
              id='logo'
              name='logo'
              accept='image/*'
              onChange={handleChange}
              className='w-full h-full opacity-0 cursor-pointer absolute top-0 left-0'
            />
          </div>
          <div className='flex-col items-start lg:gap-y-4 m-2'>
            <p className='text-[16px] text-secondary font-open font-[500] lg:text-[16px] lg:leading-[22.4px]'>
              Choose brand logo{' '}
            </p>
            <p className='font-open font-[400] text-[14px] leading-[20.3px] text-primary'>
              Make sure the file is below 2mb
            </p>
          </div>
        </label>
      </div>

      <div className='mb-2'>
        <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
          Brand Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Enter your brand name'
          value={formData.name}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#DB9E04]'
          required
        />
      </div>

      <div className='mb-2'>
        <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
          Business Email Address
        </label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter your brand email address'
          value={formData.email}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#DB9E04]'
          required
        />
      </div>

      <div className='mb-2'>
        <label
          htmlFor='phone_number'
          className='block text-gray-700 font-bold mb-2'>
          Business Phone Number
        </label>
        <PhoneInput
          country={'us'}
          value={formData.phone_number}
          onChange={handlePhoneChange}
          inputClass='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          containerClass='w-full'
          inputStyle={{ width: '100%' }}
          placeholder='Enter your phone number'
        />
      </div>

      <div className='mb-2'>
        <label
          htmlFor='location'
          className='block text-gray-700 font-bold mb-2'>
          Store Location
        </label>
        <select
          id='location'
          name='location'
          value={formData.location}
          onChange={handleChange}
          className='w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-[#DB9E04]'
          required>
          <option className='text-gray-700' value=''>
            Select a city
          </option>
          {Cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <button
        type='submit'
        className={`w-full bg-[#DB9E04] text-white font-bold py-2 px-4 mt-4 lg:mt-4 lg:p-4 rounded focus:outline-none  `}>
        Continue
      </button>
    </form>
  )
}

export default Step1Form
