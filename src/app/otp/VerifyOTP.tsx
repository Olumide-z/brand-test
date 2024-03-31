'use client'

import React, { useState, useRef, useEffect } from 'react'
import Logo from '@/app/components/Logo'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/components/redux/store'
import Button from '@/app/components/buttons/Button'
import Slideshow from '../components/Slideshow'
import Modal from '@/app/components/modal/Modal'
import LoadingSpinner from '@/app/components/loaders/LoadingSpinner'
import {
  ActiveButtonIcon,
  NonActiveButtonIcon,
} from '@/app/components/Slideshow'

function VerifyOTP() {
  const [otpValue, setOTPValue] = useState(['', '', '', '', '', ''])
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [imgLoading, setImgLoading] = React.useState<boolean>(false)
  const [useremail, setUserEmail] = useState('')
  const [userid, setUserId] = useState('')
  const [user, setUser] = useState<any>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [modalMessage, setModalMessage] = useState('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [timer, setTimer] = useState(30)
  const [isTimerRunning, setIsTimerRunning] = useState(true)

  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  // const otpInputs = Array(6)
  //   .fill(null)
  //   .map(() => inputRef)

  const userEmail = useSelector((state: RootState) => state.user.email)

  // useEffect(() => {
  //   if (typeof localStorage !== 'undefined') {
  //     const getUser = localStorage.getItem('userEmail')
  //     setUserEmail(getUser || '')
  //   }
  // }, [])

  // Handle resend email
  const resendEmail = async () => {
    setIsTimerRunning(true) // Start the countdown
    setTimer(30) // Reset the timer to 30 seconds
    axios
      .post('https://love.thegoldscarf.com/api/verification', {
        email: userEmail,
      })
      .then((response) => {
        console.log('OTP sent successfully:', response.data)
        
        toast.success('OTP sent successfully')
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'something went wrong')
        console.error('Error', error)
      })
    
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTimerRunning) {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setIsTimerRunning(false) // Stop the countdown when it reaches 0
            clearInterval(interval)
            return 0
          }
          return prevTimer - 1
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isTimerRunning])

  // Handle input change

  const handleInputChange = (index: number, value: string) => {
    const newOtpValue = [...otpValue]
    newOtpValue[index] = value
    setOTPValue(newOtpValue)
  }

  // Handle submit
  const handleSubmit = () => {
    const otpCode = otpValue.join('') // Combine OTP values into a single string

    if (otpCode.length === 6) {
      axios
        .post('https://love.thegoldscarf.com/api/verification', {
          code: otpCode,
          email: userEmail,
        })
        .then((response) => {
          console.log(response.data)
          setModalMessage('Verification Successful')
          setIsSuccessModalOpen(true)
          router.push('/dashboard')
          // Handle success
        })
        .catch((error) => {
          console.error('Error:', error)
          setModalMessage('Wrong OTP code')
          setIsErrorModalOpen(true)
          // Handle error
        })
    } else {
      console.error('Please enter a 6-digit OTP')
    }
  }

  // mapped slideshow images
  const images = [
    '/images/fashionImg1.png',
    '/images/fashionImg2.png',
    '/images/fashionImg3.png',
    '/images/fashionImg4.png',
  ]

  const handleButtonClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <>
      <div className='relative w-full h-screen mx-auto grid grid-cols-1 lg:grid-cols-6 overflow-hidden shadow-xl shadow-gray-400'>
        <Logo />
        <div className='col-span-3 m-auto px-4 lg:px-6 xl:px-5'>
          <div className='flex flex-col  justify-center items-center w-9/10  mx-auto  lg:mx-0 lg:max-xl:relative  py-[3rem] xl:pb-[2rem]'>
            <div className='absolute top-[50px] md:top-[15px] lg:top-[-70px] xl:top-[30px]'>
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
            <div className='flex flex-col justify-center items-center md:mx-[30px]'>
              <a
                href='/'
                className='text-[#0C141D] block font-inter font-[600] text-[32px] leading-[48px]'>
                Email Verification
              </a>
              <p className=' text-center text-[18px] md:px-0 font-inter font-[700] text-[#667085] leading-[27px]'>
                A 6 digit code has been sent to{' '}
                <span className='text-secondary text-[18px] font-inter font-[500] leading-[27px]'>
                  {userEmail}
                </span>
              </p>
            </div>
          </div>
          <div className='flex  justify-between'>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={otpValue[index]}
                type='text'
                maxLength={1}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className='w-10 h-10 border border-gray-300 rounded-md text-center text-2xl'
              />
            ))}
            {isLoading && (
              <LoadingSpinner color='#D0D5DD' innerColor='#DB9E04' />
            )}
          </div>

          <div className='w-full mt-[50px] md:mt-[150px] flex flex-col gap-y-4'>
            <div>
              <Button
                className={`w-full flex justify-center items-center text-white py-[13px] px-[24px] gap-3 rounded-[4px] ${
                  otpValue.every((value) => value !== '')
                    ? 'bg-secondary cursor-pointer'
                    : 'bg-yellow-600 cursor-not-allowed'
                }`}
                onClick={handleSubmit}
                disabled={isLoading}>
                Continue
              </Button>

              <p className='flex justify-center items-center gap-x-2 font-inter font-[500] text-[16px] text-[#565656] leading-[24px] my-5'>
                Didn’t receive the code?{' '}
                <span
                  className='text-secondary font-inter font-[500] text-[16px] leading-[24px] cursor-pointer'
                  onClick={resendEmail}>
                  {timer === 0 ? 'Resend' : `${timer} Secs`}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='lg:col-span-3 '>
          {imgLoading && (
            <div className='flex w-full min-h-screen justify-center items-center relative scale-150'>
              <LoadingSpinner />
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

export default VerifyOTP
