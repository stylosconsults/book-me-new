import React, { Fragment, useState } from 'react'

import { FaAccusoft } from 'react-icons/fa'

import Heading from 'components/atoms/Heading'
import Container from 'components/Container'
import Breadcrumb from 'components/molecules/Breadcrumb'
import RoomCard from 'components/molecules/RoomCard'
import Tabs from 'components/molecules/Tabs'

export default function HotelDetails() {
  const [activeTab, setactiveTab] = useState(0)
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
          src='https://ui8-fleet-html.herokuapp.com/img/content/photo-1.1.jpg'
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

      <div className='mt-10'>
        <Tabs
          activeTab={activeTab}
          setactiveTab={index => setactiveTab(index)}
          tabs={['Overview', 'Room', 'Amerities', 'Policies']}
        />
      </div>

      <div className='mt-5 w-full'>
        <h3 className='mb-4 font-semibold text-co-black text-2xl'>
          Description
        </h3>
        <p className='text-co-black w-10/12'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptas, quod, quia, voluptates quae voluptatibus quibusdam
          necessitatibus quos voluptatum quas quidem. Quisquam, quae. Quisquam
          voluptas, quod, quia, voluptates quae voluptatibus quibusdam
        </p>

        <h3 className='my-4 font-semibold text-co-black text-2xl'>
          Property overview
        </h3>
        <ul className='flex max-w-[600px] flex-wrap gap-2'>
          <li className='text-co-black flex items-center gap-1'>
            <FaAccusoft /> Lorem ipsum dolor sit amet
          </li>
          <li className='text-co-black flex items-center gap-1'>
            {' '}
            <FaAccusoft />
            Lorem ipsum dolor sit amet
          </li>
          <li className='text-co-black flex items-center gap-1'>
            {' '}
            <FaAccusoft />
            Lorem ipsum dolor sit amet
          </li>
        </ul>

        <h3 className='my-4 font-semibold text-co-black text-2xl'>Rooms</h3>
        <div className='flex flex-wrap gap-3 w-full'>
          {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
            <Fragment key={index}>
              <RoomCard
                id={'1'}
                name={'Double Standard Room'}
                noPeople={2}
                roomSize={10}
                price={300}
                refundable={false}
                bedType={'1 queen bed or 2 separate beds'}
                breakfast={true}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </Container>
  )
}
