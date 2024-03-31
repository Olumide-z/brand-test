import React, { SVGProps } from 'react'

const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <rect
      x='3.65'
      y='2.65'
      width='10.7'
      height='18.7'
      rx='1.35'
      stroke='#999999'
      stroke-width='1.3'
    />
    <rect x='10' y='10' width='7' height='4' rx='2' fill='white' />
    <path
      d='M17.8333 16L22 12M22 12L17.8333 8M22 12H12'
      stroke='#999999'
      stroke-width='1.3'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
export default LogoutIcon
