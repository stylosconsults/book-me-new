import React, { useState } from 'react'

import Container from 'components/Container'
import Breadcrumb from 'components/molecules/Breadcrumb'
import Steps from 'components/molecules/Steps'

export default function Booking() {
  const [current, setCurrent] = useState<number>(0)
  return (
    <Container>
      <Breadcrumb
        fullLocation={[
          { name: 'Hotel', link: '/hotel' },
          { name: 'Hotel Name', link: '/hotel/[id]' },
        ]}
      />
      <div className='mt-10 w-full'>
        <Steps
          steps={[
            'Hotel room info',
            'Personal Information',
            'Payment Details',
            'Final',
          ]}
          setCurrent={setCurrent}
          current={current}
        />
      </div>

      <div className='mt-10 bg-co-search shadow-co-search bg-white border rounded p-10'>
        {current === 0 && (
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Room Type</p>
              <p className='text-co-black font-bold text-lg'>Deluxe Room</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Check In</p>
              <p className='text-co-black font-bold text-lg'>12/12/2021</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Check Out</p>
              <p className='text-co-black font-bold text-lg'>12/12/2021</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Guests</p>
              <p className='text-co-black font-bold text-lg'>2 Adults</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Price</p>
              <p className='text-co-black font-bold text-lg'>$100</p>
            </div>
          </div>
        )}
        {current === 1 && (
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>First Name</p>
              <p className='text-co-black font-bold text-lg'>John</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Last Name</p>
              <p className='text-co-black font-bold text-lg'>Doe</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Email</p>
              <p className='text-co-black font-bold text-lg'>Phone</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Phone</p>
              <p className='text-co-black font-bold text-lg'>Phone</p>
            </div>
          </div>
        )}
        {current === 2 && (
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Card Number</p>
              <p className='text-co-black font-bold text-lg'>
                1234 1234 1234 1234
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Card Holder</p>
              <p className='text-co-black font-bold text-lg'>John Doe</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Expiration Date</p>
              <p className='text-co-black font-bold text-lg'>12/12/2021</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>CVV</p>
              <p className='text-co-black font-bold text-lg'>123</p>
            </div>
          </div>
        )}
        {current === 3 && (
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Booking ID</p>
              <p className='text-co-black font-bold text-lg'>123456789</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Hotel Name</p>
              <p className='text-co-black font-bold text-lg'>Hotel Name</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Room Type</p>
              <p className='text-co-black font-bold text-lg'>Deluxe Room</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Check In</p>
              <p className='text-co-black font-bold text-lg'>12/12/2021</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Check Out</p>
              <p className='text-co-black font-bold text-lg'>12/12/2021</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Guests</p>
              <p className='text-co-black font-bold text-lg'>2 Adults</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-co-gray font-bold text-sm'>Price</p>
              <p className='text-co-black font-bold text-lg'>$100</p>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
