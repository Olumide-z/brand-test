"use client"

import SidebarWrapper from '@/app/components/sidebar/SidebarWrapper'
import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image';
import AddProductForm  from './Form';
import DashboardLayout from '@/app/DashboardLayout';

const AddProductPage = () => {

  return (
    <DashboardLayout>
    <div className='bg-[#fafafa] w-[100%] h-full'>
    
        <div className='py-6 pr-[20px] pl-[30px] text-center'>
            {/* ADD PRODUCT FORM */}
            <AddProductForm />
        </div>
    </div>
    </DashboardLayout>
  )
}

export default AddProductPage