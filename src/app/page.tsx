'use client'

import LoginForm from './sign-in/LoginForm'
import Dashboard from './dashboard/Dashboard'
import DashboardLayout from './DashboardLayout'
import { Provider } from 'react-redux'
import store from '@/app/components/redux/store'

export default function Home() {
  return (
    <Provider store={store}>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </Provider>
  )
}
