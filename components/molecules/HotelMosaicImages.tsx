import React from 'react'

interface HotelMosaicImages {
  images: string[]
}

export default function HotelMosaicImages({ images }: HotelMosaicImages) {
  const imagesWithoutFirst = images?.slice(1)
  return (
    <section className='overflow-hidden text-gray-700'>
      <div className='flex flex-wrap w-full min-h-[60vh]'>
        <div
          className={`flex flex-wrap ${
            images.length <= 1 ? 'w-full max-h-[90vh]' : 'w-1/2 md:py-2 md:pr-1'
          }`}
        >
          <div className='w-full  rounded-lg overflow-hidden'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt='gallery'
              className='block object-fill object-center w-full h-full'
              src={images[0]}
            />
          </div>
        </div>
        <div
          className={`flex flex-wrap w-1/2 ${images.length <= 1 && 'hidden'}`}
        >
          {imagesWithoutFirst.map((src, index) => (
            <div
              key={index}
              className={`${
                imagesWithoutFirst.length == 1 ? 'w-full' : 'w-1/2'
              } md:py-2 md:px-1`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt='gallery'
                className='block object-cover object-center w-full h-auto min-h-[40vh] rounded-lg'
                src={src}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
