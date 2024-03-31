"use client"

import React, { useEffect, useState } from 'react'
import NotiIcon from '../svgs/NotiIcon'
import Image from 'next/image'
import Avatar from '../../../../public/images/userAvatar.png'
import TheGoldScarfIcon from '../svgs/TheGoldScarfIcon'
import { FaSearch } from "react-icons/fa";
import Link from 'next/link'

interface HeadingProps {
    title: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchInput: string;
    buttonText: string;
    link: string;
    category: string;
}

const Heading = ({ title, placeholder, onChange, searchInput, buttonText, link, category }: HeadingProps) => {
    const [formattedDate, setFormattedDate] = useState('');
    console.log(searchInput)
    useEffect(() => {
        formatDate();
    }, []);

    const formatDate = () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const today = new Date();
        const formattedDate = `${days[today.getDay()]} ${today.getDate()}, ${months[today.getMonth()]} ${today.getFullYear()}`;
        setFormattedDate(formattedDate);
    };
  return (
    <div>
        <div className='flex items-center justify-between'>
            <div className='min-[650px]:block hidden'>
                <h1 className='font-open text-[1rem] text-[#333333] font-[700] leading-[21.79px]'>{title}</h1>
                <p className='font-open text-[12px] text-[#999999] font-[400] leading-[16.34px] mt-2'>{formattedDate}</p>
               
            </div>
            
            <div className='gap-3 min-[650px]:flex hidden'>
                <NotiIcon />
                <Image
                src={Avatar}
                alt='avatar'
                className='rounded-[50%] object-cover'
                width={40}
                height={40}
                />
                
            </div>
        </div>

        <div className='items-center justify-between gap-4 flex-wrap min-[650px]:flex hidden'>
            <div className='searchInputStyles mt-4'>
                <span className='w-[10%]'>
                    <FaSearch className='text-[#92929D]'/>
                </span>
                <input 
                    placeholder={placeholder}
                    value={searchInput}
                    onChange={onChange}
                    type="text"
                    className=' text-[#999999] w-[90%] bg-transparent outline-none placeholder:text-[14px] text-[14px] font-open font-[400]'
                />
            </div>
            <Link href={`/${category}/${link}`}><button className='btnStyles'>{buttonText}</button></Link>
        </div>

        {/* mobile */}
        <div>
            <div className='flex items-center justify-between'>
                <div className='min-[650px]:hidden block'>
                    <TheGoldScarfIcon />
                </div>
                <div className='gap-3 min-[650px]:hidden flex'>
                    <NotiIcon />
                    <Image
                    src={Avatar}
                    alt='avatar'
                    className='rounded-[50%] object-cover'
                    width={40}
                    height={40}
                    />
                    
                </div>
            
            </div>
            <div className='flex justify-between items-end gap-4'>
                <div className='min-[650px]:hidden block'>
                    <h1 className='font-open text-[1rem] text-[#333333] font-[700] leading-[21.79px]'>{title}</h1>
                    <p className='font-open text-[12px] text-[#999999] font-[400] leading-[16.34px] mt-2'>{formattedDate}</p>
                </div>
                <Link href={`/${category}/${link}`}><button className='btnStyles min-[650px]:hidden block'>{buttonText}</button></Link>
            </div>
            <div className='items-center justify-between gap-4 flex-wrap min-[650px]:hidden flex'>
            <div className='searchInputStyles mt-4 min-[450px]:w-[60%] w-[100%]'>
                <span className='w-[10%]'>
                    <FaSearch className='text-[#92929D]'/>
                </span>
                <input 
                    placeholder={placeholder}
                    value={searchInput}
                    onChange={onChange}
                    type="text"
                    className=' text-[#999999] w-[90%] bg-transparent outline-none placeholder:text-[14px] text-[14px] font-open font-[400]'
                />
            </div>
            
        </div>
        </div>
    </div>
  )
}

export default Heading