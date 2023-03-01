import React, { Fragment, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { HiOutlineXMark } from 'react-icons/hi2'
import { IoMdCheckmark } from 'react-icons/io'
import { usePromiseTracker } from 'react-promise-tracker'
import { connect } from 'react-redux'

import Heading from 'components/atoms/Heading'
import Spinner from 'components/atoms/Spinner'
import Container from 'components/Container'
import Breadcrumb from 'components/molecules/Breadcrumb'
import HotelMosaicImages from 'components/molecules/HotelMosaicImages'
import RoomCard from 'components/molecules/RoomCard'
import Tabs from 'components/molecules/Tabs'
import LocationGoogleMap from 'components/organisms/LocationGoogleMap'
import { getRoomsAction } from 'redux/actions/roomAction'
import getErrorsSelector from 'redux/selectors/errorSelector'
import { getRoomsSelector } from 'redux/selectors/roomSelector'

function HotelDetails({ rooms, getRoomsAction }: any) {
  const [activeTab, setactiveTab] = useState(0)
  const { promiseInProgress } = usePromiseTracker()
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      getRoomsAction(router.query.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  return (
    <Container>
      <NextSeo
        title={`${rooms?.hotel?.name || ''} | BookMe`}
        description={rooms?.hotel?.description}
        openGraph={{
          title: rooms?.hotel?.name,
          description: rooms?.hotel?.description,
          images: [
            {
              url: rooms?.hotel?.images[0],
              width: 800,
              height: 600,
              alt: rooms?.hotel?.name,
            },
          ],
        }}
      />
      <Breadcrumb
        fullLocation={[
          {
            name: rooms?.hotel.name + ' Hotel',
            link: '/hotel/' + rooms?.hotel.id,
          },
          { name: 'Hotel Name', link: '/hotel/[id]' },
        ]}
      />
      {promiseInProgress ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <div className='mt-3'>
            <HotelMosaicImages
              images={
                rooms?.hotel.images.length > 0
                  ? rooms.hotel.images
                  : ['/static/images/other/hotel-placeholder.jpg']
              }
            />
          </div>
          <div>
            <p className='mb-4 font-semibold text-co-green mt-4'>
              Spectacular views of
            </p>
            <Heading>{rooms?.hotel.name}</Heading>
          </div>

          <div className='mt-10'>
            <Tabs
              activeTab={activeTab}
              setactiveTab={index => setactiveTab(index)}
              tabs={['Overview', 'Room', 'Amenities', 'Policies']}
            />
          </div>

          <div className='mt-5 w-full'>
            {activeTab === 0 && (
              <>
                <h3 className='mb-4 font-semibold text-co-black text-2xl'>
                  Description
                </h3>
                <p
                  className='text-co-black w-10/12'
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {rooms?.hotel.description}
                  {rooms?.hotel.description.length === 0 && (
                    <span>
                      {rooms?.hotel.name} is a hotel in {rooms?.hotel.state}
                    </span>
                  )}
                </p>
              </>
            )}
            {(activeTab === 0 || activeTab === 2) && (
              <>
                <h3 className='my-4 font-semibold text-co-black text-2xl'>
                  Amerities overview
                </h3>
                <ul className='flex flex-col max-w-[600px] flex-wrap gap-2'>
                  {rooms?.hotel.amenities.map((amenity: any, index: number) => (
                    <li
                      key={index}
                      className='text-co-black flex items-center gap-1'
                    >
                      <IoMdCheckmark /> {amenity}
                    </li>
                  ))}
                  {rooms?.hotel.amenities.length === 0 && (
                    <li className='flex items-center gap-1 text-red-600'>
                      <HiOutlineXMark /> No Amerities listed
                    </li>
                  )}
                </ul>
              </>
            )}
            {(activeTab === 0 || activeTab === 1) && (
              <>
                <h3 className='my-4 font-semibold text-co-black text-2xl'>
                  Rooms
                </h3>
                <div className='flex flex-wrap gap-3 w-full'>
                  {rooms?.results.map((room: any, index: number) => (
                    <Fragment key={index}>
                      <RoomCard
                        id={room.id}
                        image={room.image}
                        name={room?.name}
                        noAdults={room.adults}
                        noChildren={room.children}
                        roomSize={room?.size}
                        price={room?.price}
                        refundable={false}
                        bedType={room?.bedType}
                        breakfast={true}
                      />
                    </Fragment>
                  ))}
                  {rooms?.results.length === 0 && (
                    <li className='flex items-center gap-1 text-red-600'>
                      <HiOutlineXMark /> No Rooms listed
                    </li>
                  )}
                </div>
              </>
            )}
            {activeTab === 3 && (
              <p className='flex items-center gap-1 text-red-600'>
                <HiOutlineXMark /> No Policies defined
              </p>
            )}
            {(activeTab === 0 || activeTab === 4) && (
              <div className='rounded-md overflow-hidden hidden'>
                <h3 className='my-4 font-semibold text-co-black text-2xl'>
                  Hotel Location
                </h3>
                <LocationGoogleMap />
              </div>
            )}
          </div>
        </>
      )}
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  rooms: getRoomsSelector(state),
  errors: getErrorsSelector(state),
})

export default connect(mapStateToProps, { getRoomsAction })(HotelDetails)
