

import FormWrap from '@/app/components/inputs/FormWrap';
import React, { Suspense } from 'react'
import ResetForm from './ResetForm';


const ResetPasswordPage = () => {

  return (
    <FormWrap>
      <Suspense>
        <ResetForm />
      </Suspense>
    </FormWrap>
  )
}

export default ResetPasswordPage