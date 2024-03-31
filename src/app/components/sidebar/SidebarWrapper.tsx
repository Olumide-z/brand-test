import React, { Suspense } from 'react'
import Sidebar from './Sidebar' // Update the import path
import LoadingSpinner from '@/app/components/loaders/LoadingSpinner'

export default function SidebarWrapper() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Sidebar />
    </Suspense>
  )
}
