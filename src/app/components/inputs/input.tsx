'use client'

import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'

import EmailIcon from '../svgs/EmailIcon'
import EyelashIcon from '../svgs/Eyelash'
import EyeOpen from '../svgs/EyeOpen'
import UserIcon from '../svgs/UserIcon'
import LockIcon from '../svgs/Lock'

interface InputProps {
  id: string
  label?: string
  type?: string
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  id,
  label,
  type,
  disabled,
  required,
  name,
  error,
  value,
  onChange,
  ...props
}) => {
  const isPasswordInput = type === 'password'
  const isEmailInput = type === 'email'
  const isNameInput = type === 'name'

  const [isValid, setIsValid] = useState(true)
  const [isClicked, setIsClicked] = useState(false)
  const [values, setValues] = useState({
    isPasswordVisible: false,
    inputValue: '',
  })

  const inputRef = useRef<HTMLInputElement>(null)

  // Toggle visibility

  const togglePasswordVisibility = () => {
    setValues({
      ...values,
      isPasswordVisible: !values.isPasswordVisible,
    })
  }

  // Handle click outside the input box
  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setIsClicked(false)
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle click function

  const handleClick = () => {
    setIsClicked(true)
  }

  const handleBlur = () => {
    setIsClicked(false)
  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, inputValue: e.target.value })
    if (onChange) {
      onChange(e)
      const { value } = e.target
      // Check if email contains '@'
      setIsValid(value.includes('@'))
    }
  }

  return (
    <div className='w-full mb-[5px] md:mb-[10px]'>
      <label
        className='text-[0.9rem] text text-[#565656] block pb-[0.7rem] font-medium font-Inter'
        htmlFor={id}>
        {label}
      </label>
      <div className='relative'>
        {!isClicked && !values.inputValue && (
          <div
            className='absolute flex items-center gap-x-2 lg:gap-x-2 ml-2 lg:ml-3 top-[12px] lg:top-[8px] left-2 cursor-pointer'
            onClick={handleClick}>
            {' '}
            <span className='w-[24px]'>
              {isPasswordInput ? (
                <LockIcon />
              ) : isNameInput ? (
                <UserIcon />
              ) : (
                <EmailIcon />
              )}
            </span>
            <p className='font-inter font-[500] text-primary lg:pt-1 text-[18px] lg:text-[14px] leading-[27px]'>
              {isPasswordInput && values
                ? 'Password'
                : isNameInput
                ? 'Name'
                : 'Email'}
            </p>
          </div>
        )}
        <input
          ref={inputRef}
          onChange={handleChange}
          onClick={() => setIsClicked(true)}
          onBlur={handleBlur}
          autoComplete='off'
          id={id}
          value={values.inputValue}
          name={name}
          disabled={disabled}
          required={required}
          placeholder=''
          type={values.isPasswordVisible && isPasswordInput ? 'text' : type}
          className='  py-[10px] md:py-[10px] pl-2 md:pl-4 outline-none w-[100%]  border-[1px] border-[#CCC] rounded-lg'
          {...props}
        />
        {!isValid && isEmailInput && values.inputValue && (
          <p className='text-red-500'>Please enter a valid email address</p>
        )}

        {isPasswordInput && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute top-[15px] lg:top-[13px] right-4 cursor-pointer text-[#808080]'>
            {values.isPasswordVisible ? <EyeOpen /> : <EyelashIcon />}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input
