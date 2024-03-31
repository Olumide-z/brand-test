'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Logo from '../components/Logo'
import Input from '@/app/components/inputs/input'
import Slideshow from '../components/Slideshow'
import LoadingSpinner from '@/app/components/loaders/LoadingSpinner'
import Modal from '@/app/components/modal/Modal'
import Button from '@/app/components/buttons/Button'
import Checkbox from '../components/checkbox/Checkbox'
import GoogleIcon from '../components/svgs/GoogleIcon'
import { ActiveButtonIcon, NonActiveButtonIcon } from '../components/Slideshow'
import FacebookIcon from '/public/images/Facebook (1).png'

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [imgLoading, setImgLoading] = React.useState(false)
  const router = useRouter()
  const [isChecked, setIsChecked] = React.useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isValid, setIsValid] = useState(false) // State to track overall form validity
  const [isFormValid, setIsFormValid] = useState(false) // State to track form validity
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [emailSentMessage, setEmailSentMessage] = useState(false)
  const [resetLink, setResetLink] = useState<any>(null)

  useEffect(() => {
    setIsFormValid(isValid) // Update isFormValid whenever isValid changes
  }, [isValid])

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      email: value,
    }))
    const isValid = value.trim() !== '' && value.includes('@') // Check if email input is not empty and contains "@"
    setIsEmailValid(isValid)
    setIsValid(isValid && isPasswordValid) // Update isValid based on current input validity
  }

  // handle submit function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response: any = await axios.post(
        'https://love.thegoldscarf.com/api/forgot/password',
        {
          email: formData.email,
        }
      )

      // console.log('Link sent to:', response.data.reset_link);

      setResetLink(response.data)
      setIsLoading(false)
      setEmailSentMessage(true)
    } catch (error) {
      console.error('Error', error)
    }
  }

  const handleButtonClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  console.log({ resetLink })

  // useEffect to remove  the email sent after a short period of time
  useEffect(() => {
    if (emailSentMessage) {
      const timer = setTimeout(() => {
        setEmailSentMessage(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [emailSentMessage])

  return (
    <div className='flex items-center justify-center relative w-full h-screen mx-auto overflow-hidden shadow-xl shadow-gray-400'>
      <Logo />
      <div className='col-span-3 m-auto  px-4  lg:px-6 xl:px-16 '>
        <div className=' flex w-9/10 justify-center items-center xl:w-full m-auto mt-[70px]  md:mt-[100px] lg:mt-[auto] xl:mx-auto flex-col py-[1rem] '>
          <div className='flex flex-col mx-0 lg:w-[459px] text-center  md:items-center gap-y-[4px] mb-5 '>
            {/* EMAIL SENT MESSAGE */}
            {emailSentMessage && (
              <p className='text-center leading-[28px] text-[.8rem] md:text-[1rem]'>
                {resetLink.message}
              </p>
            )}
            <h4 className='font-inter font-[600] leading-[38px] text-[#DB9E04] text-[20px] md:text-[32px] '>
              Password Recovery
            </h4>
            <p className='font-inter text-[14px] font-[500] text-[#667085] items-center leading-[27px] '>
              Enter Email Address Below To Get A Password Recovery Link
            </p>
          </div>

          <form
            className='w-full flex flex-col gap-y-1'
            onSubmit={handleSubmit}>
            <Input
              id='email'
              required
              type='email'
              value={formData.email}
              onChange={handleEmailInputChange}
            />

            <div className='flex relative justify-end'>
              {isLoading && (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-1/2 z-30'>
                  <LoadingSpinner />
                </div>
              )}
              <Button
                type='submit'
                className='w-full text-white py-[1.1rem] bg-secondary'>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
