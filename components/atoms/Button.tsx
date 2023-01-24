import React from 'react'

import cn from 'lib/classNames'
interface ButtonProps {
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}
export default function Button({ children, icon, className }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-1 justify-center',
        'px-4 py-2',
        'text-sm font-bold text-co-black hover:text-white',
        'bg-transparent hover:bg-co-black',
        'border-2 border-co-gray hover:border-co-black rounded-full ocus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        'transition duration-200 ease-in-out',
        className ? className : ''
      )}
    >
      {icon}
      {children}
    </button>
  )
}
