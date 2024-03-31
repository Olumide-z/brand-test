// @ts-nocheck

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { sidebarLinks } from '@/app/components/lib/constant/index'
import Logo from '../Logo'
import MenuIcon from '../svgs/MenuIcon'
import CancelIcon from '../svgs/CancelIcon'
import LogoutIcon from '../svgs/LogoutIcon'
import { redirect } from 'next/navigation'
import LoadingSpinner from '../loaders/LoadingSpinner'
import { useAuthCtx } from '@/context/AuthContext'
import AuthProfileCard from '../cards/auth-profile-card/AuthProfileCard'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const pathname = usePathname()
  // const searchParams = useSearchParams()

  // const formatPath = () => {
  //   const params = searchParams.toString().slice(4)
  //   const path = pathname.toString()
  //   console.log(`${path}?path${params}`)

  //   return !params ? path : `${path}?path${params}`
  // }

  const formatPath = () => {
    const path = pathname.toString()
    // console.log(`${path}?path${params}`)

    return path
  }

  useEffect(() => {
    return () => {
      setIsLoading(false)
    }
  }, [])

  // Logout functionality
  const handleLogout = () => {
    setIsLoading(true)

    localStorage.removeItem('userToken')

    setTimeout(() => {
      redirect('/sign-in')
    }, 300)

    // Reset loading state after redirecting
    setIsLoading(false)
  }

  return (
    <section
      className={` ${
        isOpen
          ? 'h-screen bg-white rounded-tr-[20px] rounded-br-[20px] pt-[30px] left-[0px]'
          : 'top-[15px] left-3'
      } md:block lg:bg-white md:h-screen md:w-[240px] lg:flex lg:flex-col items-center lg:w-[240px] fixed md:left-0 lg:top-0 z-10`}>
      {/* sidebar icon for small screens */}
      <div className='lg:hidden'>
        {isOpen ? (
          <button
            className='block ml-[150px] md:ml-[185px] px-4 py-2 '
            onClick={() => setIsOpen(!isOpen)}>
            <CancelIcon />
          </button>
        ) : (
          <button
            className='block  py-2 md:ml-2 '
            onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon />
          </button>
        )}
      </div>

      {/* Sidebar content */}
      <div
        className={`lg:flex lg:flex-col lg:h-full ${isOpen ? '' : 'hidden'} `}>
        <div className='flex flex-col justify-between text-black'>
          <div>
            <div
              className={`flex items-center pl-3 top-[40px] md:top-[30px] ${
                isOpen ? 'hidden' : ''
              }`}>
              <Logo />
            </div>
            <div className='mt-10'>
              <ul className='px-4 py-2 md:pt-[100px] gap-[2px] cursor-pointer'>
                {sidebarLinks.map((link) => (
                  <Link key={link.id} href={link.path} passHref>
                    <li
                      className={`flex gap-3 hover:bg-Neutra50 transition-all duration-300 mb-3 ${
                        formatPath() === link.path
                          ? 'bg-secondary text-white'
                          : 'bg-white text-primary'
                      } rounded-[5px] p-2 items-center`}>
                      {formatPath() === link.path ? (
                        <span>{link.iconLight}</span>
                      ) : (
                        <span>{link.iconDark}</span>
                      )}
                      <span
                        className={`font-Inter text-[1.25rem] font-[500] ${
                          formatPath() === link.path
                            ? 'text-white'
                            : 'text-primary'
                        }`}>
                        {link.label}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          <div className=' border-t-2 border-Neutra40 flex flex-col gap-2'>
            <Link
              href='/sign-in'
              className='flex items-center w-full h-[50px] justify-start gap-4 pl-2 hover:brightness-150 transition-all duration-300 py-4'>
              <LogoutIcon />
              <span
                onClick={handleLogout}
                className='font-sans text-[14px] font-[500] text-primary'>
                LogOut
              </span>
            </Link>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
          <LoadingSpinner />
        </div>
      )}
    </section>
  )
}
