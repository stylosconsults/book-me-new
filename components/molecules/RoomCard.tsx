import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import Button from 'components/atoms/Button'
import { BlurredDataImage, ImagePlaceholderOnError } from 'utils/blurredImage'

interface RoomCardProps {
  id: string
  name: string
  noAdults: number
  noChildren: number
  price: number
  refundable: boolean
  bedType: string
  breakfast: boolean
  roomSize: number
  hideBtn?: boolean
  image: string
  discountedPrice?: number
}
export default function RoomCard({
  id,
  bedType,
  breakfast,
  name,
  noAdults,
  noChildren,
  price,
  refundable,
  roomSize,
  hideBtn,
  image,
  discountedPrice,
}: RoomCardProps) {
  return (
    <div
      className='bg-white rounded-2xl group mt-5 border p-2 shadow'
      style={{
        width: 'calc(25% - 10px)',
        minWidth: '200px',
      }}
    >
      <div className='relative overflow-hidden rounded-2xl w-full h-40'>
        <Image
          src={image}
          alt=''
          className='w-full h-32 overflow-clip duration-1000 object-cover group-hover:scale-110'
          draggable='false'
          fill
          loading='lazy'
          placeholder='blur'
          blurDataURL={BlurredDataImage}
          onError={ImagePlaceholderOnError}
        />
      </div>
      <div className='flex justify-between my-2 group'>
        <p className='group-hover:text-co-blue text-sm py-2 font-medium duration-200 text-co-black'>
          {name}
        </p>
        <div className='py-1 px-2 h-fit border-2 rounded border-co-green'>
          {discountedPrice && (
            <p className='line-through text-[#B1B5C]  text-xs text-center font-bold uppercase'>
              ${discountedPrice}
            </p>
          )}
          <p className='text-co-green text-xs text-center font-bold uppercase'>
            ${price}
          </p>
        </div>
      </div>
      {roomSize > 0 && <p className='text-xs'>{roomSize} sqm</p>}
      <p>
        {noAdults > 0 && <span className='text-xs'>{noAdults} Adults</span>}
        {noChildren > 0 && (
          <span className='text-xs'>, {noChildren} Children </span>
        )}
      </p>
      {bedType && <p className='text-xs'>{bedType}</p>}
      <p className='text-gray-400 text-xs'>
        {refundable ? <span>Refundable, </span> : <span>Non-refundable, </span>}
        {breakfast ? (
          <span>Breackfast included</span>
        ) : (
          <span>Breackfast not included</span>
        )}
      </p>
      {!hideBtn && (
        <Link href={`/booking/${id}`}>
          <Button
            disabled={price === 0}
            className='py-1 font-medium bg-co-blue text-white border-0 w-full mt-2'
          >
            Book now for ${price}
          </Button>
        </Link>
      )}
    </div>
  )
}
