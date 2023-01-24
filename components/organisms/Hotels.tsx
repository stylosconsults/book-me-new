import React, { Fragment } from 'react'

import Heading from 'components/atoms/Heading'
import HotelCard from 'components/molecules/HotelCard'

export default function Hotels() {
  const hotels = [
    {
      name: 'Hotel 1',
      title: 'Hotel 1',
      location: 'Jakarta',
      price: 100000,
      discountPrice: 90000,
      date: '2021-12-12',
      rating: 4,
    },
    {
      name: 'Hotel 2',
      title: 'Hotel 2',
      location: 'Jakarta',
      price: 100000,
      date: '2021-12-12',
      rating: 4,
    },
    {
      name: 'Hotel 3',
      title: 'Hotel 3',
      location: 'Jakarta',
      price: 100000,
      discountPrice: 90000,
      date: '2021-12-12',
      rating: 4,
    },
    {
      name: 'Hotel 1',
      title: 'Hotel 1',
      location: 'Jakarta',
      price: 100000,
      discountPrice: 90000,
      date: '2021-12-12',
      rating: 4,
    },
    {
      name: 'Hotel 2',
      title: 'Hotel 2',
      location: 'Jakarta',
      price: 100000,
      date: '2021-12-12',
      rating: 4,
    },
    {
      name: 'Hotel 3',
      title: 'Hotel 3',
      location: 'Jakarta',
      price: 100000,
      discountPrice: 90000,
      date: '2021-12-12',
      rating: 4,
    },
    {
      name: 'Hotel 1',
      title: 'Hotel 1',
      location: 'Jakarta',
      price: 100000,
      discountPrice: 90000,
      date: '2021-12-12',
      rating: 4,
    },
    {
      name: 'Hotel 2',
      title: 'Hotel 2',
      location: 'Jakarta',
      price: 100000,
      date: '2021-12-12',
      rating: 4,
    },
    {
      name: 'Hotel 3',
      title: 'Hotel 3',
      location: 'Jakarta',
      price: 100000,
      discountPrice: 90000,
      date: '2021-12-12',
      rating: 4,
    },
  ]
  return (
    <div className='bg-[#F4F5F6] w-full h-fit p-10 py-20 rounded-3xl'>
      <Heading subTitle='Let"s go on an adventure'>Go somewhere</Heading>
      <div className='flex flex-wrap gap-5'>
        {hotels.map(
          (
            { date, discountPrice, location, name, price, rating, title },
            index
          ) => (
            <Fragment key={index}>
              <HotelCard
                id={(index + 1).toLocaleString()}
                name={name}
                location={location}
                price={price}
                discountPrice={discountPrice}
                date={date}
                rating={rating}
              />
            </Fragment>
          )
        )}
      </div>
    </div>
  )
}
