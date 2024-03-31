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
import {
  ActiveButtonIcon,
  NonActiveButtonIcon,
} from '../components/Slideshow'
import FacebookIcon from '/public/images/Facebook (1).png'

export default function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [imgLoading, setImgLoading] = React.useState(false)
  const router = useRouter()
  const [isChecked, setIsChecked] = React.useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isValid, setIsValid] = useState(false) // State to track overall form validity
  const [isFormValid, setIsFormValid] = useState(false) // State to track form validity
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)

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

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      password: value,
    }))
    const isValid = value.trim() !== '' && isPasswordValid // Check if password input is not empty
    setIsPasswordValid(isValid)
    setIsValid(isEmailValid && isValid)
  }

  // handle submit function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // const form = e.currentTarget as HTMLFormElement
    // if (form.checkValidity() === true && isFormValid) {
     await axios
        .post('https://love.thegoldscarf.com/api/login', {
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          console.log(response.data)
          setModalMessage('Login Successful')
          setIsSuccessModalOpen(true)
          router.push('/auth/profile-creation')
        })
        .catch((error) => {
          console.log(error)
          setModalMessage('Invalid Username or Password')
          setIsErrorModalOpen(true)
        })
        .finally(() => {
          setIsLoading(false)
        })
    // } else {
    //   setIsLoading(false)
    // }
  }

  const handleButtonClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  // array of slideshow images
  const images = [
    '/images/fashionImg1.png',
    '/images/fashionImg2.png',
    '/images/fashionImg3.png',
    '/images/fashionImg4.png',
  ]

  return (
    <div className='relative w-full h-screen mx-auto grid grid-cols-1 lg:grid-cols-6 overflow-hidden'>
      <Logo />
      <div className='col-span-3 m-auto  px-4  lg:px-6 xl:px-16 '>
        <div className=' flex w-9/10 justify-center items-center xl:w-full m-auto  xl:mx-auto flex-col py-[1rem] '>
          <div className='mb-[20px] md:mb-[20px]'>
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
          <div className='flex flex-col mx-0 lg:w-[459px]   md:items-center gap-y-[4px] mb-2 lg:mb-5 '>
            <h4 className='font-inter font-[600] text-[25px] leading-[22px] lg:leading-[38px] text-[#121212]  lg:text-[32px]'>
              Login to your account
            </h4>
            <p className='font-inter text-[14px] font-[500] text-[#667085] items-center leading-[27px] '>
              Let&apos;s create an account and start a wonderful fashion journey
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
            <Input
              id='password'
              name='password'
              required
              type='password'
              value={formData.password}
              onChange={handlePasswordInputChange}
            />

            <Link href='/auth/forgot-password'>
              <div className='flex justify-end mb-3'>
                <p className='font-inter font-[500] text-secondary text-[16px] my-0 leading-[24px]'>
                  Forgot Password?
                </p>{' '}
              </div>
            </Link>
            <div className='flex relative justify-end'>
              {isLoading && (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-1/2 z-30'>
                  <LoadingSpinner color='#D0D5DD' innerColor='#DB9E04' />
                </div>
              )}
              <Button
                type='submit'
                className={`w-full text-white py-[10px] lg:py-[15px] ${
                  !isFormValid
                    ? 'bg-yellow-600 cursor-not-allowed'
                    : 'bg-secondary cursor-pointer'
                }`}
                loading={isLoading}
                // disabled={!isFormValid || isLoading}
                disabled={isLoading}
                >
                Login
              </Button>
            </div>
          </form>
          <h5 className='font-inter text-[#667085] my-[10px] lg:my-[15px] text-[14px] lg:text-[16px] lg:font-[500] lg:leading-[24px] '>
            Or Login with
          </h5>
          <div className='w-full flex justify-between gap-x-3 '>
            <Button
              onClick={handleSubmit}
              className='w-full flex justify-center items-center  md:w-[219.5px] py-[13px] px-[24px] gap-3  bg-white border-[1px] rounded-[4px] border-solid border-[#D0D5DD]
              '
              loading={isLoading}>
              <GoogleIcon />
              <p className='font-inter  font-[500] leading-[27px] text-[18px] text-black'>
                Google
              </p>
            </Button>
            <Button
              onClick={handleSubmit}
              className='w-full flex justify-center items-center  md:w-[219.5px] py-[13px] px-[24px] gap-3 text-black bg-white border-[1px] rounded-[4px] border-solid border-[#D0D5DD]'
              loading={isLoading}>
              <Image src={FacebookIcon} alt='facebook Image' />
              <p className='font-inter  font-[500] leading-[27px] text-[18px] text-black'>
                Facebook
              </p>{' '}
            </Button>
          </div>
          <h5 className='font-inter mt-[1.5rem] font-[500] text-[16px] text-[#667085] leading-[24px] '>
            Don&apos;t have an account?{' '}
            <span className='font-semibold text-[#121212]'>
              {' '}
              <Link
                href='/auth/sign-up'
                className='font-inter font-[500] text-[16px] leading-[24px] text-secondary'>
                Signup
              </Link>
            </span>
          </h5>
        </div>
      </div>
      <div className='lg:col-span-3 '>
        {imgLoading && (
          <div className='flex w-full min-h-screen justify-center items-center relative scale-150'>
            <LoadingSpinner color='#D0D5DD' innerColor='#DB9E04' />
          </div>
        )}
        <div className='w-full h-full relative'>
          <Slideshow
            setCurrentImageIndex={setCurrentImageIndex}
            images={images}
            currentImageIndex={currentImageIndex}
          />
          <div className='absolute w-[100px] h-[16px] bottom-[30px] right-[50px]  flex justify-between '>
            {[0, 1, 2, 3].map((index) => (
              <button key={index} onClick={() => handleButtonClick(index)}>
                {currentImageIndex === index ? (
                  <ActiveButtonIcon />
                ) : (
                  <NonActiveButtonIcon />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
