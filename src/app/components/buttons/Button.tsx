import React from 'react'

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: React.ReactNode
  loading?: boolean
  OnClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
}

const Button = ({
  onClick,
  children,
  className,
  disabled,
  loading,
  ...props
}: IButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={className}
      {...props}
      disabled={disabled || loading}>
      {children}
    </button>
  )
}

export default Button
