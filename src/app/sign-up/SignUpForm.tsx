'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setEmail } from '@/app/components/redux/userSlice'
import Logo from '@/app/components/Logo'
import Input from '@/app/components/inputs/input'
import Slideshow from '@/app/components/Slideshow'
import Modal from '@/app/components/modal/Modal'
import LoadingSpinner from '@/app/components/loaders/LoadingSpinner'
import Button from '@/app/components/buttons/Button'
import Checkbox from '@/app/components/checkbox/Checkbox'
import GoogleIcon from '@/app/components/svgs/GoogleIcon'
import {
  ActiveButtonIcon,
  NonActiveButtonIcon,
} from '@/app/components/Slideshow'
import FacebookIcon from '/public/images/Facebook (1).png'

export default function SignUpForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [imgLoading, setImgLoading] = React.useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = React.useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isValid, setIsValid] = useState(false) // State to track overall form validity
  const [isFormValid, setIsFormValid] = useState(false) // State to track form validity
  const [isNameValid, setIsNameValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)

  useEffect(() => {
    setIsFormValid(isValid) // Update isFormValid whenever isValid changes
  }, [isValid])

  const [hrBackground, setHrBackground] = useState([
    'bg-gray-500',
    'bg-gray-500',
    'bg-gray-500',
    'bg-gray-500',
    'bg-gray-500',
  ])

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  })
  // Function to handle name input change

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      name: value,
    }))
    const isValid = value.trim() !== '' // Check if name input is not empty
    setIsNameValid(isValid)
    setIsValid(isValid && isEmailValid && isPasswordValid) // Update isValid based on current input validity
    closeModal()
  }

  // Function to handle email input change

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      email: value,
    }))
    const isValid = value.trim() !== '' && value.includes('@') // Check if email input is not empty and contains "@"
    setIsEmailValid(isValid)
    setIsValid(isValid && isNameValid && isPasswordValid) // Update isValid based on current input validity
    closeModal()
  }

  // Function to handle password input change

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
    setIsValid(isEmailValid && isNameValid && isValid)
    closeModal()
    // Check if password length is at least 8 characters
    const hasValidLength = value.length >= 8

    // Check if password contains at least 2 special characters and one capital letter
    const hasCapitalLetter = value.match(/[A-Z]/) !== null
    const hasNumber = value.match(/[0-9]/) !== null

    // Update hr background colors based on password conditions
    if (hasValidLength && hasCapitalLetter && hasNumber) {
      setHrBackground([
        'bg-green-500',
        'bg-green-500',
        'bg-green-500',
        'bg-green-500',
        'bg-green-500',
      ])
      setIsPasswordValid(true)
    } else if (hasNumber && hasCapitalLetter) {
      // Check if password has special characters & capital letters
      setHrBackground([
        'bg-yellow-500',
        'bg-yellow-500',
        'bg-gray-500',
        'bg-gray-500',
        'bg-gray-500',
      ])
      setIsValid(false) // Set isValid to false if password is not valid
    } else if (value.length >= 8) {
      // Check if password is exactly 8 characters in length
      setHrBackground([
        'bg-yellow-500',
        'bg-yellow-500',
        'bg-yellow-500',
        'bg-gray-500',
        'bg-gray-500',
      ])
      setIsValid(false) // Set isValid to false if password is not valid
    } else {
      setHrBackground([
        'bg-gray-500',
        'bg-gray-500',
        'bg-gray-500',
        'bg-gray-500',
        'bg-gray-500',
      ])
      setIsValid(false) // Set isValid to false if password is not valid
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked)
  }

  // Function to close the modal when focusing on an input field
  const closeModal = () => {
    setIsErrorModalOpen(false)
  }

  // handle submit function

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true)
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    if (form.checkValidity() === true && isFormValid) {
      // Check both form validity and isFormValid function
      axios
        .post('https://love.thegoldscarf.com/api/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role_id: 4,
        })
        .then((response) => {
          console.log(response.data)
          console.log(formData.name)
          setModalMessage('Signup Successful')
          setIsSuccessModalOpen(true)
          // Store the email in local storage
          localStorage.setItem('userEmail', formData.email)
          // Store the email in Redux store
          dispatch(setEmail(formData.email))
          router.push('/otp')
        })
        .catch((error) => {
          console.log(error)
          setModalMessage('Something went wrong')
          setIsErrorModalOpen(true)
          toast.error(
            error?.response?.data?.message || 'something appears to be wrong'
          )
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }

  // close modal check

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isSuccessModalOpen || isErrorModalOpen) {
      timer = setTimeout(() => {
        setIsSuccessModalOpen(false)
        setIsErrorModalOpen(false)
      }, 2000) // 2 seconds
    }

    return () => clearTimeout(timer)
  }, [isSuccessModalOpen, isErrorModalOpen])

  const handleButtonClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Define an array of paths/URLs for slideshow images
  const images = [
    '/images/fashionImg1.png',
    '/images/fashionImg2.png',
    '/images/fashionImg3.png',
    '/images/fashionImg4.png',
  ]

  const hrElements = Array.from({ length: 5 }, (_, index) => (
    <hr
      key={index}
      className={`w-10 h-3 border-t-0 rounded-md ${hrBackground[index]}`}
    />
  ))

  return (
    <>
      {isLoading && (
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white opacity-75 z-50'>
          <LoadingSpinner color='#D0D5DD' innerColor='#DB9E04' />
        </div>
      )}
      <div className='relative w-full h-screen mx-auto grid grid-cols-1 lg:grid-cols-6 overflow-hidden '>
        <Logo />
        <div className='col-span-3 m-auto  px-4 lg:px-6 xl:px-16'>
          <div className=' flex  w-9/10 justify-center items-center xl:w-full m-auto mt-[30px]  md:mt-[50px] lg:mt-[50px] xl:mt-[20px] xl:mx-auto flex-col py-[1rem] '>
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
            <div className='flex flex-col mx-0 lg:w-[459px]   md:items-center gap-y-[4px] mb-2 '>
              <h4 className='font-inter font-[600] text-[25px] leading-[22px] lg:leading-[25px] xl:leading-[38px] text-[#121212] lg:text-[22px] xl:text-[32px]'>
                Create your account
              </h4>
              <p className='font-inter text-[14px] font-[500] text-[#667085] items-center leading-[27px] '>
                Let&apos;s create an account and start a wonderful fashion
                journey
              </p>
            </div>

            <form
              className='w-full flex flex-col gap-y-1'
              onSubmit={handleSubmit}>
              <Input
                id='name'
                required
                type='name'
                value={formData.name}
                onChange={handleNameInputChange}
                onFocus={closeModal}
              />
              <Input
                id='email'
                required
                type='email'
                value={formData.email}
                onChange={handleEmailInputChange}
                onFocus={closeModal}
              />
              <Input
                id='password'
                name='password'
                required
                type='password'
                value={formData.password}
                onChange={handlePasswordInputChange}
                onFocus={closeModal}
              />
              <div className='flex flex-row justify-between items-center gap-x-3'>
                {formData.password && (
                  <div className='flex flex-row items-center gap-x-3'>
                    {hrElements.map((hr, index) => (
                      <div key={index}>{hr}</div>
                    ))}
                  </div>
                )}
                {formData.password && (
                  <div>
                    {/[A-Z]/.test(formData.password) &&
                    /\d/.test(formData.password) ? (
                      <span className='text-green-500'>Good</span>
                    ) : (
                      <span className='text-red-500'>Weak</span>
                    )}
                  </div>
                )}
              </div>
              <div className='flex my-1 lg:my-3'>
                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />{' '}
                <p className='font-inter text-[#565656] text-sm my-0 leading-6'>
                  {' '}
                  I agree to the{' '}
                  <span className='text-secondary '>
                    Terms & Conditions{' '}
                  </span>{' '}
                  and
                  <span className='text-secondary '> Privacy Policy </span>
                </p>{' '}
              </div>
              <div className='flex relative justify-end'>
                {isLoading && (
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-1/2 z-30'>
                    <LoadingSpinner color='#D0D5DD' innerColor='#DB9E04' />
                  </div>
                )}
                <Button
                  type='submit'
                  className={`w-full text-white py-[10px] lg:py-[1.1rem] ${
                    !isFormValid
                      ? 'bg-yellow-600 cursor-not-allowed'
                      : 'bg-secondary cursor-pointer'
                  }`}
                  loading={isLoading}
                  disabled={!isFormValid || isLoading}>
                  Sign Up
                </Button>
              </div>
            </form>
            <h5 className='font-inter  my-[10px] md:my-[1rem] text-[16px] leading-[24px] text-[#667085]'>
              Or signup with
            </h5>
            <div className='w-full flex justify-between gap-x-3 '>
              <Button
                onClick={handleSubmit}
                className='w-full flex justify-center items-center py-[10px] lg:w-[219.5px]  px-[24px] gap-3  bg-white border-[1px] rounded-[4px] border-solid border-[#D0D5DD]
              '
                loading={isLoading}>
                <GoogleIcon />
                <p className='font-inter  font-[500] leading-[27px] text-[18px] text-black'>
                  Google
                </p>
              </Button>
              <Button
                onClick={handleSubmit}
                className='w-full flex justify-center items-center  md:w-[219.5px] py-[10px] px-[24px] gap-3 text-black bg-white border-[1px] rounded-[4px] border-solid border-[#D0D5DD]'
                loading={isLoading}>
                <Image src={FacebookIcon} alt='facebook Image' />
                <p className='font-inter  font-[500] leading-[27px] text-[18px] text-black'>
                  Facebook
                </p>{' '}
              </Button>
            </div>
            <h5 className='font-inter font-[500] mt-[10px] lg:mt-[15px] text-[16px] text-[#667085]'>
              Already have an account?{' '}
              <span className='font-semibold text-[#121212]'>
                {' '}
                <Link
                  href='/sign-in'
                  className=' font-inter font-[500] text-[16px] leading-[24px] text-secondary'>
                  Log In
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
    </>
  )
}
