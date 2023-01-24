import React from 'react'

import cn from 'lib/classNames'
interface ButtonProps {
  children: React.ReactNode
}
export default function Button({ children }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center',
        'px-4 py-2',
        'text-sm font-bold text-[#23262f] hover:text-white',
        'bg-transparent hover:bg-[#23262f]',
        'border-2 border-[#e7e8ec] hover:border-[#23262f] rounded-full ocus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        'transition duration-200 ease-in-out'
      )}
    >
      {children}
    </button>
  )
}
