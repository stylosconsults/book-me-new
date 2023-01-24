import Container from 'components/Container'
import Hotels from 'components/organisms/Hotels'
import HowItWorks from 'components/organisms/HowItWorks'
import SearchHotel from 'components/organisms/SearchHotel'

export default function Home() {
  return (
    <Container>
      <div className='relative flex flex-col items-center justify-between mb-40'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='https://cdn.discordapp.com/attachments/797485737272541250/893912493255176192/UnicornVectorGradient_7.png'
          alt='Bookme'
          className='top-0 left-0 w-full object-cover rounded-md max-h-96'
          draggable='false'
          loading='lazy'
        />
        <div className='-bottom-20 absolute w-full'>
          <SearchHotel />
        </div>
      </div>
      <Hotels />
      <HowItWorks />
    </Container>
  )
}
