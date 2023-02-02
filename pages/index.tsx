import Image from 'next/image'
import { Zoom } from 'react-slideshow-image'

import Container from 'components/Container'
import Hotels from 'components/organisms/Hotels'
import HowItWorks from 'components/organisms/HowItWorks'
import SearchHotel from 'components/organisms/SearchHotel'
import 'react-slideshow-image/dist/styles.css'

export default function Home() {
  const images = [
    '/static/images/slide/1.png',
    '/static/images/slide/2.png',
    '/static/images/slide/3.png',
  ]

  return (
    <Container>
      <div className='relative flex flex-col justify-center mb-28 w-full h-fit'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Zoom scale={1.4} indicators={true} arrows={false}>
          {images.map((source: string, index: number) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index}
              src={source}
              alt='Bookme'
              className='top-0 left-0 w-full object-cover rounded-md h-96 border'
              draggable='false'
              loading='lazy'
              placeholder='blur'
            />
          ))}
        </Zoom>
        <div className='-bottom-20 absolute w-full z-20'>
          <SearchHotel />
        </div>
      </div>
      <Hotels />
      <HowItWorks />
    </Container>
  )
}
