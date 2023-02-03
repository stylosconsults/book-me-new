import React from 'react'

interface HeadingProps {
  children: React.ReactNode
  subTitle?: string
}
export default function Heading({ children, subTitle }: HeadingProps) {
  return (
    <>
      <h1 className='sm:text-5xl md:text-6xl tracking-tight leading-4 font-bold text-co-black'>
        {children}
      </h1>
      <p className='text-[#777E90] mt-6 text-2xl leading-4 tracking-tight'>
        {subTitle}
      </p>
    </>
  )
}
