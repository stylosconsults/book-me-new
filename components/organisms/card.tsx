import React, { ComponentProps, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import Button from 'components/atoms/button'
import Icon from 'components/atoms/icons'

interface CardProps extends ComponentProps<'div'> {
  id: string
}

export default function Card({ id, className }: CardProps) {
  const [carLiked, setCarLiked] = useState(false)
  return (
    <div
      className={`bg-white flex flex-col gap-12 p-4 w-full min-w-[200px] max-w-[300px] h-fit overflow-hidden rounded-md ${className}`}
    >
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-secondary-500 font-semibold text-base'>CR - V</h1>
          <p className='text-secondary-300 font-medium text-xs'>SUV</p>
        </div>
        <div onClick={() => setCarLiked(!carLiked)}>
          <Icon
            name={carLiked ? 'heart-filled' : 'heart-outline'}
            color={carLiked ? '#F87171' : '#292D32'}
          />
        </div>
      </div>
      <div className='flex justify-between flex-wrap gap-5'>
        <div className='relative max-w-[160px] h-fit'>
          <Image
            src={'/static/img/car.png'}
            className='w-full h-full object-contain'
            alt='car'
            width={160}
            height={64}
          />
        </div>
        <div className='flex flex-row md:flex-col flex-wrap gap-4'>
          <div className='flex gap-1'>
            <Icon name='gasoline' />
            <p className='text-secondary-300 text-xs font-medium'>80L</p>
          </div>
          <div className='flex gap-1'>
            <Icon name='car-drive' />
            <p className='text-secondary-300 text-xs font-medium'>Manual</p>
          </div>
          <div className='flex gap-1'>
            <Icon name='people' />
            <p className='text-secondary-300 text-xs font-medium'>6 People</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 justify-between flex-wrap'>
        <div className='flex items-center '>
          <h1 className='text-secondary-500 font-semibold text-base'>
            $80.00/
          </h1>
          <p className='text-secondary-300 text-xs font-medium'>day</p>
        </div>
        <Link href={`rent/${id}`}>
          <Button>Rental Now</Button>
        </Link>
      </div>
    </div>
  )
}
