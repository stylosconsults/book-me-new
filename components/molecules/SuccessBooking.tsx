import React from 'react'

import Link from 'next/link'
import { HiLink } from 'react-icons/hi2'
import { IoMdCheckmark } from 'react-icons/io'

import Button from 'components/atoms/Button'

export default function SuccessBooking({
  bookings,
  pay,
}: {
  bookings: any
  pay: () => void
}) {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-co-black font-bold text-base'>
        You have booked with this information
      </p>
      <ul className='flex flex-col gap-2'>
        <li className='flex items-center gap-1'>
          <IoMdCheckmark /> Check in date:{' '}
          <span className='text-co-black'>
            {new Date(bookings?.checkIn).toLocaleDateString()}
          </span>
        </li>
        <li className='flex items-center gap-1'>
          <IoMdCheckmark /> Check out date:{' '}
          <span className='text-co-black'>
            {new Date(bookings?.checkOut).toLocaleDateString()}
          </span>
        </li>
        <li className='flex items-center gap-1'>
          <IoMdCheckmark /> Number of rooms:{' '}
          <span className='text-co-black'>{bookings?.numberOfRooms}</span>
        </li>
        <li className='flex items-center gap-1'>
          <IoMdCheckmark /> First name:{' '}
          <span className='text-co-black'>{bookings?.firstName}</span>
        </li>
        <li className='flex items-center gap-1'>
          <IoMdCheckmark /> Last name:{' '}
          <span className='text-co-black'>{bookings?.lastName}</span>
        </li>
        <li className='flex items-center gap-1'>
          <IoMdCheckmark /> Email:{' '}
          <span className='text-co-black'>{bookings?.email}</span>
        </li>
        <li className='flex items-center gap-1'>
          <IoMdCheckmark /> Phone:{' '}
          <span className='text-co-black'>{bookings?.phone}</span>
        </li>
        <li className='flex items-center gap-1'>
          <IoMdCheckmark /> Payment method:{' '}
          <span className='text-co-black'>{bookings?.paymentMethod}</span>
        </li>
        <li className='flex items-center gap-1'>
          <IoMdCheckmark /> Total price:{' '}
          <span className='text-co-black'>${bookings?.amount}</span>
        </li>
        <li className='flex items-center'>
          <IoMdCheckmark /> Status:
          <span
            className={`text-co-black capitalize font-bold ml-1 ${
              bookings?.status === 'unpayed' ? 'text-red-600' : 'text-co-green'
            }`}
          >
            {bookings?.status}
          </span>
        </li>
      </ul>
      {
        // if status is unpayed, show button to pay
        bookings?.status === 'unpayed' && (
          <>
            <p className='flex gap-1 items-center'>
              <HiLink />{' '}
              <p>
                Pay within 24 hours with your booking link:{' '}
                <Link
                  className='text-blue-600'
                  href={`payment/${bookings?.id}`}
                >
                  https://www.booking.rw/payment/{bookings?.id}
                </Link>
              </p>
            </p>

            <div className='flex  items-center gap-2'>
              <p>or</p>
              <Button onClick={pay} className='w-fit'>
                Pay now
              </Button>
            </div>

            <p className='max-w-lg'>
              Please note that if you do not make a payment within the next 24
              hours, your record will be deleted. If you have any issues or
              questions regarding the payment process, please reach out to our
              support team for assistance{' '}
              <a className='text-blue-600' href='mailto:info@bookme.rw'>
                support@bookme.rw
              </a>
              .
            </p>
          </>
        )
      }
    </div>
  )
}
