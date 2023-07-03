import React, { ComponentProps } from 'react'

import cn from 'lib/classNames'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'danger' | 'primary-light'
  outline?: boolean
}
export default function Button({
  variant = 'primary',
  outline,
  children,
  ...rest
}: ButtonProps) {
  const variantStyles =
    variant === 'primary'
      ? `bg-primary-500 border-primary-500 text-white ${
          outline ? 'text-primary-500' : 'text-white'
        }`
      : variant === 'primary-light'
      ? `bg-primary-300 border-primary-300 text-white ${
          outline ? 'text-primary-300' : 'text-white'
        }`
      : variant === 'danger'
      ? `bg-red-500  border-red-500 text-white ${
          outline ? 'text-red-500' : 'text-white'
        }`
      : ''
  return (
    <button
      {...rest}
      className={cn(
        rest.className ?? '',
        'w-full md:w-fit',
        'px-2 md:px-4 py-2 text-xs md;text-sm font-semibold rounded-md capitalize',
        variantStyles,
        outline ? 'border-2 bg-transparent' : ''
      )}
    >
      {children}
    </button>
  )
}
