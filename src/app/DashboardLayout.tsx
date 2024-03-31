// DashboardLayout.tsx
'use client'

import React from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Topbar from './components/topbar/Topbar'
import { Inter } from 'next/font/google'
import './globals.css'
import { Provider } from 'react-redux'
import store from '@/app/components/redux/store'

const inter = Inter({ subsets: ['latin'] })

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <html lang='en'>
        <body className={inter.className}>
          <div className='flex w-full'>
            <div>
              <Sidebar />
            </div>
            <div className='w-full lg:ml-[240px]'>
              <Topbar />
              <div className='w-full'>{children}</div>
            </div>
          </div>
        </body>
      </html>
    </Provider>
  )
}

export default DashboardLayout
