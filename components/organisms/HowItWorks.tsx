import React from 'react'

import Heading from 'components/atoms/Heading'

export default function HowItWorks() {
  const steps = [
    {
      title: 'Book & relax',
      description:
        'We realize ideas from simple to complex, everything becomes easy to use.',
      image: '/static/images/works/1.png',
    },
    {
      title: 'Smart checklist',
      description:
        'We realize ideas from simple to complex, everything becomes easy to use.',
      image: '/static/images/works/2.png',
    },
    {
      title: 'Save more',
      description:
        'We realize ideas from simple to complex, everything becomes easy to use.',
      image: '/static/images/works/3.png',
    },
  ]
  return (
    <div className='w-full h-fit p-10 py-20 rounded-3xl text-center'>
      <Heading subTitle='Keep calm & travel on'>How it work</Heading>
      <div className='max-w-[1024px] mx-auto relative'>
        <div className='absolute top-[66px] left-1/2 -translate-x-1/2 -z-0  hidden lg:block'>
          <svg
            width='839'
            height='137'
            viewBox='0 0 839 137'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M838 4.83887C823.237 25.0088 713.617 137.14 601.48 135.889C497.352 134.728 454.07 -36.7167 262.536 60.1723C94.2489 145.302 53.9174 52.5844 1.07634 1.99272'
              stroke='#E6E8EC'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeDasharray='4 12'
            ></path>
          </svg>
        </div>

        <div className='flex justify-between mt-16 bg-transparent'>
          {steps.map((step, index) => (
            <div
              key={index}
              className='flex flex-col items-center max-w-[256px] z-40'
            >
              <div className='flex flex-col items-center'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.image}
                  alt={step.title}
                  className='w-full'
                  draggable='false'
                  loading='lazy'
                />

                <h1 className='font-bold text-co-black text-2xl mb-2'>
                  {step.title}
                </h1>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
