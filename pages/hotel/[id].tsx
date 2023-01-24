import React from 'react'

import Heading from 'components/atoms/Heading'
import Container from 'components/Container'
import Breadcrumb from 'components/molecules/Breadcrumb'

export default function HotelDetails() {
  return (
    <Container>
      <Breadcrumb
        fullLocation={[
          { name: 'Hotel', link: '/hotel' },
          { name: 'Hotel Name', link: '/hotel/[id]' },
        ]}
      />

      <div className='mt-5'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='https://ui8-fleet-html.herokuapp.com/img/content/catalog-pic-1.jpg'
          alt='Bookme'
          className='top-0 left-0 w-full rounded-md max-h-[80vh] object-cover'
          draggable='false'
          loading='lazy'
        />
      </div>

      <div>
        <p className='mb-4 font-semibold text-co-green mt-4'>
          Spectacular views of
        </p>
        <Heading>Queenstown</Heading>
      </div>
    </Container>
  )
}
