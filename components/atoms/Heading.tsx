import React, { ComponentProps } from 'react'

interface HeadingProps extends ComponentProps<'h1'> {
  children: React.ReactNode
  subTitle?: string
}
export default function Heading({
  children,
  subTitle,
  className,
}: HeadingProps) {
  return (
    <>
      <h1
        className={`text-5xl md:text-6xl tracking-tight leading-4 font-bold text-co-black ${className}`}
      >
        {children}
      </h1>
      <p className='text-[#777E90] mt-6 text-2xl leading-4 tracking-tight'>
        {subTitle}
      </p>
    </>
  )
}
