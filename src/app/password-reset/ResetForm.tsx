'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import Logo from '../components/Logo'
import Input from '@/app/components/inputs/input'
import Slideshow from '../components/Slideshow'
import LoadingSpinner from '@/app/components/loaders/LoadingSpinner'
import Modal from '@/app/components/modal/Modal'
import Button from '@/app/components/buttons/Button'

import EyeOpen from '@/app/components/svgs/EyeOpen'
import EyelashIcon from '@/app/components/svgs/Eyelash'
import LockIcon from '@/app/components/svgs/Lock'

export default function ResetForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [imgLoading, setImgLoading] = React.useState(false)
  const router = useRouter()
  const [isChecked, setIsChecked] = React.useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isValid, setIsValid] = useState(false) // State to track overall form validity
  const [isFormValid, setIsFormValid] = useState(false) // State to track form validity

  const [resetSucessful, setResetSucessful] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [tokenErrorMessage, setTokenErrorMessage] = useState<String | any>('')

  useEffect(() => {
    setIsFormValid(isValid) // Update isFormValid whenever isValid changes
  }, [isValid])

  const [formData, setFormData] = React.useState({
    password: '',
    confirmPassword: '',
    email: '',
  })

  // Function to close the modal when focusing on an input field
  const closeModal = () => {
    setIsErrorModalOpen(false)
  }

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }

  // onChange handler for the password input
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      password: e.target.value,
    })
  }

  // onChange handler for the confirmPassword input
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      confirmPassword: e.target.value,
    })
  }

  // onChange handler for the confirmPassword input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      email: e.target.value,
    })
  }

  //   Getting the token from url
  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  //   console.log(email, token)

  //   VERIFY PASSWORD RESET TOKEN

  useEffect(() => {
    const verifyToken = async () => {
      setLoading(true)

      try {
        const response = await axios.post(
          'https://love.thegoldscarf.com/api/verify/password/token',
          {
            token: token,
            // email: email
          }
        )
        console.log(response.data.message)

        setIsTokenValid(true)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        console.log('Error', error.response.data.message)
        setTokenErrorMessage(error.response.data)
        // router.push('/password-reset/not-found')
        setIsTokenValid(false)
        setError(true)
      }
    }

    verifyToken()
  }, [token])
  // handle submit function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // compare password
    if (formData.password === formData.confirmPassword) {
      try {
        const response: any = await axios.post(
          'https://love.thegoldscarf.com/api/reset/password',
          {
            token: token,
            // email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
          }
        )

        // console.log(response);
        setIsLoading(false)
        setResetSucessful(true)
        setModalMessage('Password Reset Successfully')
        setIsSuccessModalOpen(true)
        router.push('/login')
      } catch (error) {
        console.error('Error', error)
      }
    } else {
      setErrorMessage(true)
      setIsLoading(false)
    }
  }

  // useEffect to remove  the email sent after a short period of time
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  return (
    <div className='flex items-center justify-center relative w-full h-screen mx-auto overflow-hidden shadow-xl shadow-gray-400'>
      <Logo />
      <div className='col-span-3 m-auto  px-4  lg:px-6 xl:px-16 '>
        <div className=' flex w-9/10 justify-center items-center xl:w-full m-auto mt-[70px]  md:mt-[100px] lg:mt-[auto] xl:mx-auto flex-col py-[1rem] '>
          {loading && (
            <div className='flex w-full min-h-screen justify-center items-center relative scale-150'>
              <LoadingSpinner />
            </div>
          )}
          {/* PASSWORD RESET SUCCESSFULLY */}
          {resetSucessful && (
            <Modal
              message={modalMessage}
              onClose={() => setIsSuccessModalOpen(false)}
              isSuccess={true}
            />
          )}
          {/* RENDER THIS IF TOKEN IS INVALID */}
          {!isTokenValid && error && !loading && (
            <div className='flex items-left justify-center flex-col'>
              <h1 className='text-[3.5rem] text-[#DB9E04]'>Error</h1>
              <h1 className='text-lg mb-4'>{tokenErrorMessage.message}</h1>
              <Link href='/forgot-password' className='text-blue-500'>
                Go back to forgot password
              </Link>
            </div>
          )}

          {isTokenValid && !loading && (
            <>
              <div className='flex flex-col mx-0 lg:w-[459px]   md:items-center gap-y-[4px] mb-5 '>
                <h4 className='font-inter font-[600] leading-[38px]  text-[#DB9E04] text-[20px] md:text-[32px]'>
                  Reset Your Password
                </h4>
                <p className='font-inter text-[18px] font-[500] text-[#667085] items-center leading-[27px] '>
                  {/* Let&apos;s create an account and start a wonderful fashion journey */}
                </p>
              </div>

              <form
                className='w-full flex flex-col gap-y-1'
                onSubmit={handleSubmit}>
                <Input
                  id='password'
                  name='password'
                  required
                  type='password'
                  value={formData.password}
                  onChange={handlePasswordChange}
                />

                <div className='relative mb-4'>
                  <div className='flex items-center'>
                    <div className='absolute left-3 h-6 w-6 text-gray-400'>
                      <LockIcon />
                    </div>
                    <input
                      className='placeholder:text-[0.9rem] py-[1rem] md:py-[10px] pl-12 pr-12 md:pl-10 outline-none w-full border-[1px] border-[#CCC] rounded-lg'
                      placeholder='Confirm Password'
                      type={`${showPassword ? 'text' : 'password'}`}
                      value={formData.confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    <button
                      className='absolute right-3'
                      onClick={handleShowPassword}>
                      {showPassword ? (
                        <EyeOpen />
                      ) : (
                        <EyelashIcon className='text-gray-400' />
                      )}
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <p className='text-red-500  text-sm'>
                    Password does not match
                  </p>
                )}
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
