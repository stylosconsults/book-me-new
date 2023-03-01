import React, { Fragment, useEffect } from 'react'

import { usePromiseTracker } from 'react-promise-tracker'
import { connect } from 'react-redux'

import Heading from 'components/atoms/Heading'
import Spinner from 'components/atoms/Spinner'
import HotelCard from 'components/molecules/HotelCard'
import { getHotelsAction } from 'redux/actions/hotelActions'
import getHotelsSelector from 'redux/selectors/hotelSelector'

function Hotels({ hotels, getHotelsAction }: any) {
  const { promiseInProgress } = usePromiseTracker()
  useEffect(() => {
    getHotelsAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='bg-[#F4F5F6] w-full h-fit p-10 py-20 rounded-3xl'>
      <Heading subTitle="Let's go on an adventure">Go somewhere</Heading>
      <div className='flex flex-wrap gap-5'>
        {!promiseInProgress ? (
          <>
            {hotels?.results?.map(
              (
                { images, id, name, city, amenities, state, address }: any,
                index: number
              ) => (
                <Fragment key={index}>
                  <HotelCard
                    id={id}
                    image={images[0]}
                    name={name}
                    state={state}
                    address={address}
                    city={city}
                    RoomNumbers={amenities.length || 0}
                  />
                </Fragment>
              )
            )}
            {hotels?.results?.length === 0 || hotels?.results === undefined ? (
              <p className='text-center text-md mt-3 font-bold text-gray-500'>
                Hotels will be loaded soon (come back later)
              </p>
            ) : null}
          </>
        ) : (
          <div className='mt-3'>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  hotels: getHotelsSelector(state),
})

export default connect(mapStateToProps, { getHotelsAction })(Hotels)
