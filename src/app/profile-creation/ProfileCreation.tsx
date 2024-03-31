'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import profilecreationimg from '/public/images/profilecreationimg.png'
import { useRouter } from 'next/navigation'
import Logo from '@/app/components/Logo'
import LoadingSpinner from '@/app/components/loaders/LoadingSpinner'
import Modal from '@/app/components/modal/Modal'
import Step1Form from './Step1Form'
import Step2Form from './Step2Form'

const ProfileCreationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formData, setFormData] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [imgLoading, setImgLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if brandProfileSet is true in localStorage
    const brandProfileSet = localStorage.getItem('brandProfileSet') === 'true'
    if (brandProfileSet) {
      router.push('/dashboard') // Redirect to dashboard if brand profile is set
    }
  }, []) // Run only once on component mount

  const handleFormSubmit = (data: any) => {
    if (currentStep === 1) {
      setFormData({ ...formData, ...data })
      nextStep()
    } else if (currentStep === 2) {
      const combinedFormData = { ...formData, ...data }
      submitFormDataToBackend(combinedFormData)
    }
  }

  const submitFormDataToBackend = (formData: any) => {
    setIsLoading(true)
    fetch('https://love.thegoldscarf.com/api/brand/update/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        console.log('Success:', data)
        // Set brandProfileSet to true and save to localStorage
        localStorage.setItem('brandProfileSet', 'true')
        setModalMessage('Verification Successful')
        setIsSuccessModalOpen(true)
        router.push('/dashboard')
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setModalMessage('Something went wrong')
        setIsErrorModalOpen(true)
        setIsLoading(false)
      })
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  return (
    <div className='flex flex-col w-full lg:flex-row h-screen mx-auto px-4 lg:px-0'>
      <Logo />
      <div className='absolute top-[40px] left-[50px] lg:top-[10px] lg:left-[250px]'>
        {isSuccessModalOpen && (
          <Modal
            message={modalMessage}
            onClose={() => setIsSuccessModalOpen(false)}
            isSuccess={true}
          />
        )}
        {isErrorModalOpen && (
          <Modal
            message={modalMessage}
            onClose={() => setIsErrorModalOpen(false)}
            isSuccess={false}
          />
        )}
      </div>
      <div className='w-full lg:w-1/2 flex items-center my-auto justify-center'>
        {currentStep === 1 && <Step1Form onSubmit={handleFormSubmit} />}
        {currentStep === 2 && <Step2Form onSubmit={handleFormSubmit} />}
      </div>
      <div className='hidden  w-full lg:block lg:w-1/2 bg-gray-200 overflow-hidden'>
        {imgLoading && (
          <div className='flex w-full min-h-screen justify-center items-center relative scale-150'>
            <LoadingSpinner color='#D0D5DD' innerColor='#DB9E04' />
          </div>
        )}
        <Image
          src={profilecreationimg}
          alt='profilecreation image'
          className='w-full h-full'
        />
      </div>
    </div>
  )
}

export default ProfileCreationPage
