import React from 'react'

import Button from 'components/atoms/Button'
import Heading from 'components/atoms/Heading'

import Step from './Step'

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
        </div>
      ),
      more: (
        <div className='text-left'>
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
        </div>
      ),
      more: (
        <div className='text-left'>
          <ol className='text-left list-decimal mt-3 list-inside'>
            <li className='mt-2'>
              <b>Location:</b>{' '}
              <span>
                Consider the hotel&apos;s location in relation to your travel
                plans. Is it conveniently located near attractions, restaurants,
                and transportation hubs? Determine if the neighborhood suits
                your preferences and provides easy access to the places you want
                to explore.
              </span>
            </li>
            <li className='mt-2'>
              <b>Budget:</b>{' '}
              <span>
                Determine your budget range for accommodation. Our website
                allows you to filter hotels based on your desired price range,
                ensuring that you find options that fit your budget without
                compromising on quality and comfort.
              </span>
            </li>
            <li className='mt-2'>
              <b>Amenities and Facilities:</b>{' '}
              <span>
                Make a list of amenities and facilities that are important to
                you. Whether it&apos;s a fitness center, swimming pool, free
                Wi-Fi, or an on-site restaurant, our website provides detailed
                information about the amenities offered by each hotel, making it
                easy for you to find the perfect match.
              </span>
            </li>
            <li className='mt-2'>
              <b>Reviews and Ratings:</b>{' '}
              <span>
                Read reviews from previous guests to get an idea of their
                experiences at the hotel. Our website includes genuine guest
                reviews and ratings, allowing you to make an informed decision
                based on the experiences of others.
              </span>
            </li>
            <li className='mt-2'>
              <b>Booking Policies and Flexibility:</b>{' '}
              <span>
                Pay attention to the hotel&apos;s booking policies, including
                cancellation policies, check-in and check-out times, and any
                additional fees. Our website provides clear information about
                these policies, allowing you to plan accordingly and avoid any
                surprises.
              </span>
            </li>
            <li className='mt-2'>
              <b>Room Types and Sizes:</b>{' '}
              <span>
                Consider the room types and sizes available. Do you prefer a
                standard room, a suite, or a family room? Check the descriptions
                and photos provided on our website to ensure that the room meets
                your specific needs and preferences.
              </span>
            </li>
            <li className='mt-2'>
              <b>Safety and Security:</b>{' '}
              <span>
                Your safety is our priority. Ensure that the hotel has adequate
                security measures in place, such as 24-hour reception,
                surveillance cameras, and secure access to rooms. Our website
                provides important details about the safety features offered by
                each hotel.
              </span>
            </li>
            <li className='mt-2'>
              <b>Accessibility:</b>{' '}
              <span>
                If you have specific accessibility requirements, such as
                wheelchair accessibility or special assistance, verify that the
                hotel can accommodate your needs. Our website allows you to
                search for hotels with specific accessibility features, ensuring
                a comfortable stay for all guests.
              </span>
            </li>
            <li className='mt-2'>
              <b>Special Offers and Discounts:</b>{' '}
              <span>
                Keep an eye out for special offers, discounts, and packages
                available for your travel dates. Our website highlights any
                ongoing promotions, helping you get the best value for your
                money.
              </span>
            </li>
            <li className='mt-2'>
              <b>Booking and Confirmation:</b>{' '}
              <p>
                Once you&apos;ve found the perfect hotel, our website offers a
                seamless booking process. Enter your travel dates, select your
                preferred room type, and securely make your reservation.
                You&apos;ll receive an instant confirmation with all the
                necessary details.
                <span className='mt-2'>
                  we aim to simplify the hotel booking process and provide you
                  with the information you need to make informed decisions. With
                  our smart checklist, finding the ideal hotel for your next
                  adventure has never been easier. Start exploring our extensive
                  range of hotels today and embark on a worry-free journey!
                </span>
              </p>
            </li>
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
        </div>
      ),
      more: (
        <div className='text-left'>
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

        <div className='flex justify-between gap-10 mt-16 bg-transparent'>
          {steps.map((step, index) => (
            <Step
              key={index}
              image={step.image}
              title={step.title}
              description={step.description}
              more={step.more}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
