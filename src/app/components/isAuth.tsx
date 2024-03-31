import { isAuthenticated } from '../../../utils/Auth'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    useEffect(() => {
      // Check if running in the client-side context before accessing localStorage
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('userToken')
        const brandProfileCreated = localStorage.getItem(
          'brand_profile_created'
        )

        // Redirect to login page if not authenticated or brand_profile_created is not true
        if (!isAuthenticated() || brandProfileCreated !== 'true') {
          redirect('/sign-in')
        }
      }
    }, [])

    // Render the component only if authenticated and brand_profile_created is true, otherwise return null
    return typeof window !== 'undefined' &&
      isAuthenticated() &&
      localStorage.getItem('brand_profile_created') === 'true' ? (
      <Component {...props} />
    ) : null
  }
}
