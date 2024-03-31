import React, { useState } from 'react'
import ProgressIndicator from './ProgressIndicator'
import { useRouter } from 'next/navigation'

const Step2Form: React.FC<{ onSubmit: (formData: any) => void }> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<{
    website: string
    description: string
    business_doc: File | null
  }>({
    website: '',
    description: '',
    business_doc: null,
  })
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, business_doc: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }
  // Function to handle navigation back to Step1Form
  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className='relative'>
      {/* Back Button */}
      <div className='absolute top-[-70px] left-[-10px] rounded-full  p-2'>
        <button
          className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 focus:outline-none'
          onClick={handleGoBack}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-[#DB9E04]'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className='w-full max-w-md mx-auto'>
        <h2 className='text-[22px] font-inter font-[700] leading-[22.4px] lg:leading-[30.4px] lg:text-[30px] mb-4'>
          One last step to get onboarded!
        </h2>
        <div>
          {' '}
          <ProgressIndicator currentStep={2} />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='website'
            className='block text-gray-700 font-bold mb-2'>
            Business Website
          </label>
          <input
            type='text'
            id='website'
            name='website'
            placeholder='Enter your website'
            value={formData.website}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#DB9E04]'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-gray-700 font-bold mb-2'>
            Brand Description
          </label>
          <textarea
            id='description'
            name='description'
            placeholder='Enter your description'
            value={formData.description}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#DB9E04]'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='business_doc'
            className='block text-gray-700 font-bold mb-2'>
            Business Registered Document
          </label>
          <input
            type='file'
            id='business_doc'
            name='business_doc'
            onChange={handleFileChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#DB9E04]'
            required
          />
        </div>
        <button
          type='submit'
          className={`w-full bg-[#DB9E04] text-white font-bold py-2 px-4 mt-4 lg:mt-4 lg:p-4 rounded focus:outline-none  `}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Step2Form
