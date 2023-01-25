import React from 'react'

import Link from 'next/link'

import Button from 'components/atoms/Button'

interface RoomCardProps {
  id: string
  name: string
  noPeople: number
  price: number
  refundable: boolean
  bedType: string
  breakfast: boolean
  roomSize: number
  hideBtn?: boolean
}
export default function RoomCard({
  id,
  bedType,
  breakfast,
  name,
  noPeople,
  price,
  refundable,
  roomSize,
  hideBtn,
}: RoomCardProps) {
  return (
    <div
      className='bg-white rounded-2xl group mt-5 border p-2 shadow'
      style={{
        width: 'calc(25% - 10px)',
      }}
    >
      <div className='relative overflow-hidden rounded-2xl'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='https://ui8-fleet-html.herokuapp.com/img/content/catalog-pic-1.jpg'
          alt=''
          className='w-full h-32 overflow-clip duration-1000 object-cover group-hover:scale-110'
          draggable='false'
        />
      </div>
      <p className='hover:text-co-blue text-sm py-2 font-medium duration-200 text-co-black'>
        {name}
      </p>
      {roomSize > 0 && <p className='text-xs'>{roomSize} sqm</p>}
      {noPeople > 0 && <p className='text-xs'>{noPeople} people</p>}
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
