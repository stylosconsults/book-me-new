import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { AiFillStar } from 'react-icons/ai'

interface HotelCardProps {
  id: string
  name: string
  location: string
  price: number
  discountPrice?: number
  date: string
  rating: number
}
import { BlurredDataImage, ImagePlaceholderOnError } from 'utils/blurredImage'

export default function HotelCard({
  id,
  date,
  discountPrice,
  name,
  price,
  rating,
  location,
}: HotelCardProps) {
  return (
    <div
      className='bg-white rounded-2xl group mt-5'
      style={{
        width: 'calc(25% - 20px)',
      }}
    >
      <Link href={`/hotel/${id}`}>
        <div className='relative overflow-hidden rounded-t-2xl w-full h-52'>
          <Image
            src='https://ui8-fleet-html.herokuapp.com/img/content/catalog-pic-1.jpg'
            alt=''
            className='w-full overflow-clip duration-1000 object-cover group-hover:scale-110'
            draggable='false'
            fill
            loading='lazy'
            placeholder='blur'
            blurDataURL={BlurredDataImage}
            onError={ImagePlaceholderOnError}
          />
        </div>
        <div className='px-5 pb-5'>
          <div className='flex justify-between py-3'>
            <div className=''>
              <p className='hover:text-[#3B71FE] text-base font-medium duration-200 text-co-black'>
                {name}
              </p>
              <p className='text-xs'>{location}</p>
            </div>

            <div className='py-1 px-2 h-fit border-2 rounded border-co-green'>
              {discountPrice && (
                <p className='line-through text-[#B1B5C]  text-xs text-center font-bold uppercase'>
                  ${discountPrice}
                </p>
              )}
              <p className='text-co-green text-xs text-center font-bold uppercase'>
                ${price}
              </p>
            </div>
          </div>
          <div className='w-full h-[1px] bg-co-gray'></div>
          <div className='flex justify-between py-3'>
            <p className='text-[#777E90] text-xs'>{date}</p>
            <div className='flex items-center text-xs font-semibold'>
              <AiFillStar size='14' color='#FFD166' />
              <p>{rating}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
