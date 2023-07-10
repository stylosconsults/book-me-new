import React from 'react'

import Heading from 'components/atoms/Heading'

export default function HowItWorks() {
  const steps = [
    {
      title: 'Book & relax',
      description: (
        <div className='text-left'>
          <p>
            Discover a world of comfort, luxury, and tranquility at our hotel.
            Whether you&apos;re traveling for business or leisure, our goal is
            to provide you with a memorable and relaxing stay. With our
            convenient online booking system, you can easily reserve your room
            and begin your journey towards rejuvenation.
          </p>
          <p className='mt-3'>
            Once you&apos;ve selected your room, our attentive staff will ensure
            a seamless check-in process. You&apos;ll be greeted with warm
            hospitality and guided to your well-appointed room, where comfort
            and relaxation await you. Sink into plush bedding, indulge in modern
            amenities, and take advantage of our exceptional services.
          </p>
          <p className='mt-3'>
            During your stay, we offer a range of facilities to help you unwind
            and recharge. Dive into our sparkling swimming pool, where you can
            take a refreshing swim or lounge poolside with a tropical drink in
            hand. If you&apos;re seeking ultimate relaxation, our spa and
            wellness center is the perfect oasis. Treat yourself to a soothing
            massage or indulge in a rejuvenating facial, leaving you feeling
            revitalized and renewed.
          </p>
        </div>
      ),
      image: '/static/images/works/1.png',
    },
    {
      title: 'Smart checklist',
      description: (
        <div className='text-left'>
          <p>
            Planning your next trip and searching for the perfect hotel? Look no
            further! Our smart checklist is here to help you make informed
            decisions and ensure a hassle-free hotel booking experience. We
            understand that finding the right accommodation is essential for a
            memorable stay, and our checklist will guide you through the process
            step by step.
          </p>
          <ol className='text-left list-decimal mt-3'>
            <li className='font-bold'>Location</li>
            <li className='font-bold'>Budget</li>
            <li className='font-bold'>Amenities and Facilities</li>
            <li className='font-bold'>Reviews and Ratings</li>
            <li className='font-bold'>Booking Policies and Flexibility</li>
            <li className='font-bold'>Safety and Security</li>
            <li className='font-bold'>Accessibility</li>
            <li className='font-bold'>Special Offers and Discounts</li>
          </ol>
        </div>
      ),
      image: '/static/images/works/2.png',
    },
    {
      title: 'Save more',
      description: (
        <div className='text-left'>
          <p>
            Looking to maximize your savings on hotel bookings? You&apos;ve come
            to the right place! Our platform not only offers a wide selection of
            hotels worldwide but also provides opportunities for you to save
            even after you&apos;ve booked. With our exclusive features and
            benefits, you can make the most of your travel budget and enjoy
            extra savings along the way.
          </p>
          <p className='mt-3'>
            At our platform, we believe that saving shouldn&apos;t stop after
            you&apos;ve booked your hotel. With our commitment to offering the
            best prices, exclusive deals, loyalty rewards, and flexible options,
            we empower you to save more and make the most of your travel budget.
            Start exploring our platform today, book your ideal hotel, and
            unlock a world of savings! Your journey to more affordable and
            enjoyable travel experiences begins here.
          </p>
        </div>
      ),
      image: '/static/images/works/3.png',
    },
  ]
  return (
    <div className='w-full h-fit p-10 py-20 rounded-3xl text-center'>
      <Heading subTitle='Keep calm & travel on'>How it work</Heading>
      <div className='max-w-full mx-auto relative'>
        <div className='absolute top-[66px] left-1/2 -translate-x-1/2 -z-0  hidden lg:block'>
          <svg
            width='1025'
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
            <div key={index} className='flex flex-col items-center  z-40'>
              <div className='flex flex-col items-center max-w-[430px]'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.image}
                  alt={step.title}
                  className='w-full  max-w-[256px]'
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
